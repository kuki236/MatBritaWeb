from django.shortcuts import render
from django.contrib.auth.hashers import check_password # <-- IMPORTANTE
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import connection

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