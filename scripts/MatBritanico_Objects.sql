-- 1. Document Type (Tipo de Documento)
CREATE TABLE Document_Type (
    doc_type_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR2(50) NOT NULL,
    abbreviation VARCHAR2(10) NOT NULL
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 2. Student (Alumno)
CREATE TABLE Student (
    student_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_code VARCHAR2(6) UNIQUE, 
    doc_type_id NUMBER NOT NULL,
    document_number VARCHAR2(20) NOT NULL UNIQUE,
    first_name VARCHAR2(100) NOT NULL,
    last_name VARCHAR2(100) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')),
    email VARCHAR2(150) UNIQUE,
    phone VARCHAR2(20),
    birth_date DATE,
    CONSTRAINT fk_student_doctype FOREIGN KEY (doc_type_id) REFERENCES Document_Type(doc_type_id)
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 3. Employee 
CREATE TABLE Employee (
    employee_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    doc_type_id NUMBER NOT NULL,
    document_number VARCHAR2(20) NOT NULL UNIQUE,
    first_name VARCHAR2(100) NOT NULL,
    last_name VARCHAR2(100) NOT NULL,
    position VARCHAR2(50) NOT NULL,
    CONSTRAINT fk_employee_doctype FOREIGN KEY (doc_type_id) REFERENCES Document_Type(doc_type_id)
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 4. System User 
CREATE TABLE System_User (
    user_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR2(150) NOT NULL UNIQUE, 
    password VARCHAR2(255) NOT NULL,
    last_login TIMESTAMP,                    
    is_active NUMBER(1) DEFAULT 1 NOT NULL, 
    is_staff NUMBER(1) DEFAULT 0 NOT NULL,  
    is_superuser NUMBER(1) DEFAULT 0 NOT NULL, 
    user_role VARCHAR2(20) NOT NULL,
    employee_id NUMBER NOT NULL,
    CONSTRAINT chk_user_role CHECK (user_role IN ('ADMIN', 'RECEPTIONIST')),
    CONSTRAINT fk_user_employee FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 5. Academic Level
CREATE TABLE Academic_Level (
    level_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR2(50) NOT NULL UNIQUE -- Ej: Basic, Intermediate, Advanced
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 6. Course 
CREATE TABLE Course (
    course_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    level_id NUMBER NOT NULL,
    name VARCHAR2(100) NOT NULL,
    prerequisite_id NUMBER NULL,
    CONSTRAINT fk_course_level FOREIGN KEY (level_id) REFERENCES Academic_Level(level_id),
    CONSTRAINT fk_course_prereq FOREIGN KEY (prerequisite_id) REFERENCES Course(course_id)
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 7. Teacher 
CREATE TABLE Teacher (
    teacher_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    doc_type_id NUMBER NOT NULL,
    document_number VARCHAR2(20) NOT NULL UNIQUE,
    first_name VARCHAR2(100) NOT NULL,
    last_name VARCHAR2(100) NOT NULL,
    email VARCHAR2(150) UNIQUE,
    phone VARCHAR2(20),
    CONSTRAINT fk_teacher_doctype FOREIGN KEY (doc_type_id) REFERENCES Document_Type(doc_type_id)
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 8. Schedule 
CREATE TABLE Schedule (
    schedule_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description VARCHAR2(100) NOT NULL, -- Ej: 'Mon-Wed-Fri Morning'
    start_time VARCHAR2(10) NOT NULL,   -- Ej: '08:00 AM'
    end_time VARCHAR2(10) NOT NULL
) TABLESPACE DATA_TABLES_MATBRITANICO;
ALTER TABLE Schedule ADD days_of_week VARCHAR2(20);

-- 9. Classroom 
CREATE TABLE Classroom (
    classroom_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code VARCHAR2(20) NOT NULL UNIQUE,  -- Ej: 'A-101'
    capacity NUMBER NOT NULL
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 10. Academic Term 
CREATE TABLE Academic_Term (
    term_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR2(50) NOT NULL UNIQUE,  -- Ej: '2026-I'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL -- 1: Activo, 0: Histórico
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 11. Section (Sección)
CREATE TABLE Section (
    section_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course_id NUMBER NOT NULL,
    term_id NUMBER NOT NULL,
    teacher_id NUMBER NOT NULL,
    schedule_id NUMBER NOT NULL,
    classroom_id NUMBER NOT NULL,
    total_capacity NUMBER NOT NULL,
    available_seats NUMBER NOT NULL,
    CONSTRAINT fk_section_course FOREIGN KEY (course_id) REFERENCES Course(course_id),
    CONSTRAINT fk_section_term FOREIGN KEY (term_id) REFERENCES Academic_Term(term_id),
    CONSTRAINT fk_section_teacher FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id),
    CONSTRAINT fk_section_schedule FOREIGN KEY (schedule_id) REFERENCES Schedule(schedule_id),
    CONSTRAINT fk_section_classroom FOREIGN KEY (classroom_id) REFERENCES Classroom(classroom_id)
) TABLESPACE DATA_TABLES_MATBRITANICO;

-- 12. Enrollment (Matrícula)
CREATE TABLE Enrollment (
    enrollment_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id NUMBER NOT NULL,
    section_id NUMBER NOT NULL,
    user_id NUMBER NOT NULL, 
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    final_grade NUMBER(4,2),
    is_approved NUMBER(1) DEFAULT 0, 
    CONSTRAINT fk_enroll_student FOREIGN KEY (student_id) REFERENCES Student(student_id),
    CONSTRAINT fk_enroll_section FOREIGN KEY (section_id) REFERENCES Section(section_id),
    CONSTRAINT fk_enroll_user FOREIGN KEY (user_id) REFERENCES System_User(user_id)
) TABLESPACE DATA_TABLES_MATBRITANICO;
    
-- =======================================================
-- Indexes on People / Users Tables
-- =======================================================
CREATE INDEX idx_student_doctype ON Student(doc_type_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_student_lastname ON Student(last_name) TABLESPACE INDEXES_MATBRITANICO; -- Para búsquedas rápidas por apellido

CREATE INDEX idx_employee_doctype ON Employee(doc_type_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_sysuser_employee ON System_User(employee_id) TABLESPACE INDEXES_MATBRITANICO;

CREATE INDEX idx_teacher_doctype ON Teacher(doc_type_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_teacher_lastname ON Teacher(last_name) TABLESPACE INDEXES_MATBRITANICO;

-- =======================================================
-- Indexes on Academic Catalog Tables
-- =======================================================
CREATE INDEX idx_course_level ON Course(level_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_course_prereq ON Course(prerequisite_id) TABLESPACE INDEXES_MATBRITANICO;

CREATE INDEX idx_term_dates ON Academic_Term(start_date, end_date) TABLESPACE INDEXES_MATBRITANICO;

-- =======================================================
-- Indexes on Section (Heavy relational table)
-- =======================================================
CREATE INDEX idx_section_course ON Section(course_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_section_term ON Section(term_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_section_teacher ON Section(teacher_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_section_schedule ON Section(schedule_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_section_classroom ON Section(classroom_id) TABLESPACE INDEXES_MATBRITANICO;

CREATE INDEX idx_section_term_course ON Section(term_id, course_id) TABLESPACE INDEXES_MATBRITANICO;

-- =======================================================
-- Indexes on Transactional Tables (Enrollment)
-- =======================================================
CREATE INDEX idx_enrollment_student ON Enrollment(student_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_enrollment_section ON Enrollment(section_id) TABLESPACE INDEXES_MATBRITANICO;
CREATE INDEX idx_enrollment_user ON Enrollment(user_id) TABLESPACE INDEXES_MATBRITANICO;

CREATE INDEX idx_enrollment_date ON Enrollment(enrollment_date) TABLESPACE INDEXES_MATBRITANICO;

CREATE INDEX idx_enrollment_status ON Enrollment(section_id, is_approved) TABLESPACE INDEXES_MATBRITANICO;