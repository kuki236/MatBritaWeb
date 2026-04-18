# MatBritaWeb

# # MatBritaWeb
A comprehensive Academic Management System designed for MatBritánico, facilitating student administration, academic catalog management, and enrollment processing with a modern web interface. README.md:1

# # Overview
MatBritaWeb is a two-tier architecture application that leverages a "thick database" pattern, where critical business logic and data integrity are maintained within an Oracle database via PL/SQL, while the application layer provides a responsive interface and RESTful API. App.jsx:1-74

# # Architecture
The system consists of three primary layers:

Frontend: React Single Page Application (SPA) built with Vite and Material UI
Backend: Django REST Framework (DRF) API with JWT authentication
Database: Oracle XE instance with PL/SQL stored procedures for core business logic
# # Key Features
Academic Administration
Student profile and document management
Curriculum definition with prerequisite logic
Section scheduling and classroom assignment
Transactional Enrollment
Prerequisite validation via PKG_ENROLLMENT_TRANS.check_prerequisites
Enrollment processing with capacity management
Academic record tracking
Security & Access Control
Role-Based Access Control (RBAC) with ADMIN and RECEPTIONIST roles
JWT-based authentication
Protected routes with role-based navigation
# # Technology Stack
Frontend: React, Vite, Material UI, React Router
Backend: Django, Django REST Framework, Simple JWT
Database: Oracle XE with PL/SQL packages
API Communication: Axios with JWT token handling
# # Getting Started
# # # Prerequisites
Python 3.8+
Node.js 16+
Oracle XE Database
Oracle client libraries
# # # Installation
Clone the repository
Set up the Oracle database with the provided SQL scripts
Configure database connection in backend/settings.py
Install Python dependencies and run Django migrations
Install Node.js dependencies and start the development server
Database Configuration
Configure your Oracle XE connection at localhost:1521/XEPDB1 in the Django settings file. settings.py:80-87

# # Project Structure
MatBritaWeb/  
├── backend/                 # Django REST API  
│   ├── settings.py         # Django configuration  
│   └── api/                # API endpoints  
├── frontend/               # React SPA  
│   ├── src/  
│   │   ├── pages/         # Page components  
│   │   ├── components/    # Reusable components  
│   │   └── api/           # API configuration  
└── scripts/               # Database scripts  
# # Usage
After installation, access the application at http://localhost:5173. Login with your credentials to access role-specific functionality:

Admin users are redirected to student management
Receptionist users are redirected to enrollment modules


