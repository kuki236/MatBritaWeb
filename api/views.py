from django.shortcuts import render
from django.contrib.auth.hashers import check_password # <-- IMPORTANTE
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import connection

import datetime

# Clase temporal para engañar a SimpleJWT y que genere el token 
# con el ID de tu tabla System_User en lugar de la tabla de Django
class DummyUser:
    def __init__(self, user_id):
        self.id = user_id

@api_view(['POST'])
def login_endpoint(request):
    username = request.data.get('username')
    password = request.data.get('password') 

    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT user_id, user_role, password 
                FROM System_User 
                WHERE username = %s AND is_active = 1
            """, [username])
            
            row = cursor.fetchone()

        if row:
            user_id = row[0]
            user_role = row[1]
            db_hash = row[2] 

            if check_password(password, db_hash):
                refresh = RefreshToken.for_user(DummyUser(user_id))
                refresh['username'] = username
                refresh['role'] = user_role

                return Response({
                    'status': 'success',
                    'user': {'id': user_id, 'username': username, 'role': user_role},
                    'access': str(refresh.access_token),
                }, status=200)
            else:
                return Response({'error': 'Contraseña incorrecta'}, status=401)
        else:
            return Response({'error': 'Usuario no encontrado'}, status=401)

    except Exception as e:
        return Response({'error': f'Error: {str(e)}'}, status=500)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection
import datetime

# --- HELPER FUNCTION ---
def dictfetchall(cursor):
    """Returns all rows from a cursor as a dictionary."""
    columns = [col[0].lower() for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

# ==========================================
# 1. DOCUMENT TYPES (For the Filter Dropdown)
# ==========================================
@api_view(['GET'])
def get_document_types(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT doc_type_id, name, abbreviation FROM Document_Type ORDER BY doc_type_id")
            doc_types = dictfetchall(cursor)
        return Response(doc_types, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# ==========================================
# 2. STUDENTS MAIN ENDPOINT (GET, POST)
# ==========================================
@api_view(['GET', 'POST'])
def manage_students(request):
    
    # --- GET: Fetch list of students for the Table ---
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                # Raw SQL to fetch the data for the main table
                query = """
                    SELECT s.student_id, s.student_code, s.document_number, 
                           s.first_name, s.last_name, s.gender, s.email, s.phone,
                           d.abbreviation as doc_type
                    FROM Student s
                    JOIN Document_Type d ON s.doc_type_id = d.doc_type_id
                    ORDER BY s.student_id DESC
                """
                cursor.execute(query)
                students = dictfetchall(cursor)
            return Response(students, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    # --- POST: Create a new student (RF01) ---
    elif request.method == 'POST':
        data = request.data
        try:
            with connection.cursor() as cursor:
                # Call PKG_ADMIN_BASE.create_student
                # Note: We pass '0' at the end to catch the OUT parameter (p_new_id)
                result = cursor.callproc('PKG_ADMIN_BASE.create_student', [
                    data.get('doc_type_id'),
                    data.get('document_number'), 
                    data.get('first_name'),
                    data.get('last_name'), 
                    data.get('gender'),
                    data.get('email'), 
                    data.get('phone'),
                    data.get('birth_date'), 
                    0 # p_new_id (OUT)
                ])
                new_id = result[-1]
                
            return Response({'status': 'success', 'student_id': new_id}, status=201)
            
        except Exception as e:
            error_msg = str(e)
            # Handling the specific Oracle Error you defined (-20101)
            if '20101' in error_msg:
                return Response({
                    'error': 'El dato ya se encuentra registrado', 
                    'code': 'DUP_VAL_ON_INDEX'
                }, status=409) # 409 Conflict
            return Response({'error': f'Server Error: {error_msg}'}, status=500)

# ==========================================
# 3. STUDENT DETAIL ENDPOINT (PUT, DELETE)
# ==========================================
@api_view(['PUT', 'DELETE'])
def student_detail(request, pk):
    
    # --- PUT: Update a student (RF01) ---
    if request.method == 'PUT':
        data = request.data
        try:
            with connection.cursor() as cursor:
                cursor.callproc('PKG_ADMIN_BASE.update_student', [
                    pk, # p_id
                    data.get('first_name'),
                    data.get('last_name'),
                    data.get('email'),
                    data.get('phone')
                ])
            return Response({'status': 'success', 'message': 'Student updated correctly'}, status=200)
        except Exception as e:
            error_msg = str(e)
            if '20102' in error_msg:
                return Response({'error': 'Student not found'}, status=404)
            return Response({'error': str(e)}, status=500)

    # --- DELETE: Hard delete using Raw SQL ---
    elif request.method == 'DELETE':
        try:
            with connection.cursor() as cursor:
                # Execute raw SQL delete
                cursor.execute("DELETE FROM Student WHERE student_id = %s", [pk])
                
                if cursor.rowcount == 0:
                    return Response({'error': 'Student not found'}, status=404)
                    
            return Response({'status': 'success', 'message': 'Student deleted correctly'}, status=200)
        except Exception as e:
            error_msg = str(e)
            # If the student has enrollments, Oracle will throw a Foreign Key constraint error (ORA-02292)
            if 'ORA-02292' in error_msg:
                return Response({'error': 'Cannot delete student because they have active enrollments.'}, status=400)
            return Response({'error': str(e)}, status=500)
# ==========================================
# 4. ACADEMIC LEVELS ENDPOINT (GET, POST)
# ==========================================
@api_view(['GET', 'POST'])
def manage_academic_levels(request):
    
    # --- GET: Fetch list of academic levels ---
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                # Raw SQL to fetch the data
                cursor.execute("SELECT level_id, name FROM Academic_Level ORDER BY level_id")
                levels = dictfetchall(cursor)
            return Response(levels, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    # --- POST: Create a new academic level (RF03) ---
    elif request.method == 'POST':
        data = request.data
        try:
            with connection.cursor() as cursor:
                # Call PKG_ADMIN_BASE.create_academic_level
                # Parameters: p_name (IN), p_new_id (OUT)
                result = cursor.callproc('PKG_ADMIN_BASE.create_academic_level', [
                    data.get('name'), 
                    0 # p_new_id (OUT) is the last parameter
                ])
                
                # Safely grab the last item from the result array (the new ID)
                new_id = result[-1] 
                
            return Response({'status': 'success', 'level_id': new_id}, status=201)
            
        except Exception as e:
            error_msg = str(e)
            # Catching duplicate names if your DB has a UNIQUE constraint on 'name'
            if 'DUP_VAL_ON_INDEX' in error_msg or 'ORA-00001' in error_msg:
                return Response({
                    'error': 'This academic level name already exists.', 
                    'code': 'DUP_VAL_ON_INDEX'
                }, status=409)
            return Response({'error': f'Server Error: {error_msg}'}, status=500)
# ==========================================
# 5. ACADEMIC LEVEL DETAIL ENDPOINT (PUT, DELETE)
# ==========================================
@api_view(['PUT', 'DELETE'])
def academic_level_detail(request, pk):
    
    # --- PUT: Update an academic level ---
    if request.method == 'PUT':
        data = request.data
        try:
            with connection.cursor() as cursor:
                cursor.callproc('PKG_ADMIN_BASE.update_academic_level', [
                    pk, # p_id
                    data.get('name') # p_name
                ])
            return Response({'status': 'success', 'message': 'Academic level updated correctly'}, status=200)
        except Exception as e:
            error_msg = str(e)
            if '20103' in error_msg:
                return Response({'error': 'Academic Level not found'}, status=404)
            # Just in case they try to rename it to a name that already exists
            if 'DUP_VAL_ON_INDEX' in error_msg or 'ORA-00001' in error_msg:
                return Response({'error': 'This academic level name already exists.'}, status=409)
            return Response({'error': str(e)}, status=500)

    # --- DELETE: Delete an academic level ---
    elif request.method == 'DELETE':
        try:
            with connection.cursor() as cursor:
                cursor.callproc('PKG_ADMIN_BASE.delete_academic_level', [pk])
            return Response({'status': 'success', 'message': 'Academic level deleted correctly'}, status=200)
        except Exception as e:
            error_msg = str(e)
            if '20103' in error_msg:
                return Response({'error': 'Academic Level not found'}, status=404)
            # Oracle Foreign Key constraint error (blocks deletion if courses are linked)
            if 'ORA-02292' in error_msg:
                return Response({
                    'error': 'Cannot delete this level because it has active courses linked to it.'
                }, status=400)
            return Response({'error': str(e)}, status=500)
# ==========================================
# 6. COURSES ENDPOINT (GET, POST)
# ==========================================
@api_view(['GET', 'POST'])
def manage_courses(request):
    
    # --- GET: Fetch list of courses with their prerequisites ---
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                # We use a LEFT JOIN for the prerequisite because "Basic 1" won't have one
                query = """
                    SELECT 
                        c1.course_id, 
                        c1.name as course_name, 
                        l.level_id,
                        l.name as level_name, 
                        c1.prerequisite_id, 
                        c2.name as prereq_name 
                    FROM Course c1
                    JOIN Academic_Level l ON c1.level_id = l.level_id
                    LEFT JOIN Course c2 ON c1.prerequisite_id = c2.course_id
                    ORDER BY l.level_id, c1.course_id
                """
                cursor.execute(query)
                courses = dictfetchall(cursor)
            return Response(courses, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    # --- POST: Create a new course (RF03) ---
    elif request.method == 'POST':
        data = request.data
        try:
            with connection.cursor() as cursor:
                # Call PKG_ADMIN_BASE.create_course
                # Parameters: p_level, p_name, p_prereq, p_new_id (OUT)
                
                # Handle empty prerequisites (e.g., for Basic 1)
                prereq = data.get('prerequisite_id')
                if prereq == '':
                    prereq = None

                result = cursor.callproc('PKG_ADMIN_BASE.create_course', [
                    data.get('level_id'), 
                    data.get('name'),
                    prereq,
                    0 # p_new_id (OUT)
                ])
                
                new_id = result[-1] 
                
            return Response({'status': 'success', 'course_id': new_id}, status=201)
            
        except Exception as e:
            error_msg = str(e)
            if 'DUP_VAL_ON_INDEX' in error_msg or 'ORA-00001' in error_msg:
                return Response({'error': 'This course name already exists.'}, status=409)
            return Response({'error': f'Server Error: {error_msg}'}, status=500)
# ==========================================
# 7. SECTION MANAGEMENT ENDPOINTS (RF04)
# ==========================================

@api_view(['GET'])
def get_section_form_data(request):
    """Fetches all catalogs needed to populate the React dropdowns in one call."""
    try:
        with connection.cursor() as cursor:
            # Fetch Courses
            cursor.execute("SELECT course_id, name FROM Course ORDER BY level_id, course_id")
            courses = dictfetchall(cursor)
            
            # Fetch Terms (e.g., '2026-I', 'Summer 2026')
            cursor.execute("SELECT term_id, name FROM Academic_Term WHERE is_active = 1 ORDER BY start_date DESC")
            terms = dictfetchall(cursor)
            
            # Fetch Teachers
            cursor.execute("SELECT teacher_id, first_name, last_name FROM Teacher WHERE is_active = 1")
            teachers = dictfetchall(cursor)
            
            # Fetch Schedules (e.g., 'Mon-Wed-Fri 08:00-10:00')
            cursor.execute("SELECT schedule_id, description FROM Schedule")
            schedules = dictfetchall(cursor)
            
            # Fetch Classrooms (e.g., 'Room 101')
            cursor.execute("SELECT classroom_id, name, capacity FROM Classroom")
            classrooms = dictfetchall(cursor)

        return Response({
            'courses': courses,
            'terms': terms,
            'teachers': teachers,
            'schedules': schedules,
            'classrooms': classrooms
        }, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET', 'POST'])
def manage_sections(request):
    
    # --- GET: Fetch list of all open sections for the main table ---
    if request.method == 'GET':
        try:
            with connection.cursor() as cursor:
                # Joining tables to get readable names instead of just IDs
                query = """
                    SELECT 
                        s.section_id, 
                        c.name as course_name, 
                        t.name as term_name, 
                        tch.first_name || ' ' || tch.last_name as teacher_name, 
                        sch.description as schedule_desc, 
                        cr.name as classroom_name, 
                        s.total_capacity, 
                        s.available_seats 
                    FROM Section s
                    JOIN Course c ON s.course_id = c.course_id
                    JOIN Academic_Term t ON s.term_id = t.term_id
                    JOIN Teacher tch ON s.teacher_id = tch.teacher_id
                    JOIN Schedule sch ON s.schedule_id = sch.schedule_id
                    JOIN Classroom cr ON s.classroom_id = cr.classroom_id
                    ORDER BY s.section_id DESC
                """
                cursor.execute(query)
                sections = dictfetchall(cursor)
            return Response(sections, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    # --- POST: Call Oracle to open a new section (RF04) ---
    elif request.method == 'POST':
        data = request.data
        try:
            with connection.cursor() as cursor:
                # Call PKG_ADMIN_BASE.open_section
                result = cursor.callproc('PKG_ADMIN_BASE.open_section', [
                    data.get('course_id'),
                    data.get('term_id'),
                    data.get('teacher_id'),
                    data.get('schedule_id'),
                    data.get('classroom_id'),
                    data.get('total_capacity'),
                    0 # p_new_id (OUT) is always the last parameter
                ])
                
                new_id = result[-1] 
                
            return Response({'status': 'success', 'section_id': new_id}, status=201)
            
        except Exception as e:
            error_msg = str(e)
            return Response({'error': f'Server Error: {error_msg}'}, status=500)