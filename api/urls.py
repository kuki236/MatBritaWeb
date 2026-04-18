from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('login/', views.login_endpoint, name='login'),
    
    # Catalog / Filters
    path('document-types/', views.get_document_types, name='document-types'),
    
    # Students
    path('students/', views.manage_students, name='manage-students'),
    path('students/<int:pk>/', views.student_detail, name='student-detail'),
    
    # Academic Levels
    path('academic-levels/', views.manage_academic_levels, name='manage-academic-levels'),
    path('academic-levels/<int:pk>/', views.academic_level_detail, name='academic-level-detail'),
    
    # Courses
    path('courses/', views.manage_courses, name='manage-courses'),
    path('courses/<int:pk>/', views.course_detail, name='course-detail'), # <-- NUEVA LÍNEA
    # Sections 
    path('section-form-data/', views.get_section_form_data, name='section-form-data'),
    path('sections/', views.manage_sections, name='manage-sections'),
]