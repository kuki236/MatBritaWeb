from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('login/', views.login_endpoint, name='login'),
    
    # Catalog / Filters
    path('document-types/', views.get_document_types, name='document-types'),
    
    # Students CRUD
    path('students/', views.manage_students, name='manage-students'),
    path('students/<int:pk>/', views.student_detail, name='student-detail'),
    
    # Academic Levels (NEW)
    path('academic-levels/', views.manage_academic_levels, name='manage-academic-levels'),
]