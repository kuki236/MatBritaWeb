-- =================================================================
-- DATA INSERTION SCRIPT - MAT BRITANICO
-- =================================================================

SET DEFINE OFF;
ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD';
ALTER SESSION SET NLS_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH24:MI:SS';

-- =================================================================
-- 1. TYPE DOC
-- =================================================================
INSERT INTO Document_Type (name, abbreviation) VALUES ('Documento Nacional de Identidad', 'DNI');
INSERT INTO Document_Type (name, abbreviation) VALUES ('Carné de Extranjería', 'CE');

-- =================================================================
-- 2. STUDENT
-- =================================================================
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100001', 1, '71234501', 'Mateo', 'García López', 'M', 'mateo.garcia@gmail.com', '987654321', '2005-03-15');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100002', 1, '71234502', 'Valentina', 'Pérez Silva', 'F', 'valentina.ps@hotmail.com', '987654322', '2004-06-22');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100003', 1, '71234503', 'Santiago', 'Mendoza Quispe', 'M', 'santiago.mq@gmail.com', '987654323', '2006-01-10');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100004', 1, '71234504', 'Camila', 'Rojas Torres', 'F', 'camila.rtorres@yahoo.com', '987654324', '2005-11-05');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100005', 1, '71234505', 'Sebastián', 'Flores Castro', 'M', 'sebas.flores@gmail.com', '987654325', '2003-08-19');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100006', 1, '71234506', 'Lucía', 'Ramírez Vargas', 'F', 'lucia.ramirez@gmail.com', '987654326', '2006-04-30');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100007', 1, '71234507', 'Diego', 'Gonzales Chávez', 'M', 'diego.gonzales@hotmail.com', '987654327', '2004-12-12');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100008', 1, '71234508', 'Martina', 'Fernández Ruiz', 'F', 'martina.fr@gmail.com', '987654328', '2005-07-25');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100009', 1, '71234509', 'Joaquín', 'Díaz Castillo', 'M', 'joaquin.diaz@yahoo.com', '987654329', '2003-09-08');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100010', 1, '71234510', 'Sofía', 'Vega Romero', 'F', 'sofia.vega@gmail.com', '987654330', '2006-02-14');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100011', 1, '71234511', 'Nicolás', 'Espinoza Ramos', 'M', 'nicolas.esp@hotmail.com', '987654331', '2005-10-03');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100012', 1, '71234512', 'Mariana', 'Cruz Gutiérrez', 'F', 'mariana.cruz@gmail.com', '987654332', '2004-05-18');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100013', 1, '71234513', 'Leonardo', 'Herrera Medina', 'M', 'leonardo.hm@gmail.com', '987654333', '2006-08-27');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100014', 1, '71234514', 'Valeria', 'Aguilar Pinto', 'F', 'valeria.aguilar@yahoo.com', '987654334', '2005-01-09');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100015', 1, '71234515', 'Rodrigo', 'Morales Soto', 'M', 'rodrigo.morales@gmail.com', '987654335', '2003-11-21');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100016', 1, '71234516', 'Daniela', 'Ríos Salazar', 'F', 'daniela.rios@hotmail.com', '987654336', '2006-06-04');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100017', 1, '71234517', 'Alonso', 'Navarro Cárdenas', 'M', 'alonso.navarro@gmail.com', '987654337', '2004-03-12');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100018', 1, '71234518', 'Isabella', 'Gómez Vidal', 'F', 'isabella.gv@gmail.com', '987654338', '2005-09-30');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100019', 1, '71234519', 'Mathías', 'Ponce de León', 'M', 'mathias.ponce@yahoo.com', '987654339', '2003-07-16');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100020', 1, '71234520', 'Antonia', 'Delgado Campos', 'F', 'antonia.dc@gmail.com', '987654340', '2006-12-08');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100021', 1, '71234521', 'Emilio', 'Suárez Peralta', 'M', 'emilio.suarez@hotmail.com', '987654341', '2004-02-25');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100022', 1, '71234522', 'Paula', 'Ortiz Valdivia', 'F', 'paula.ortiz@gmail.com', '987654342', '2005-05-11');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100023', 1, '71234523', 'Renato', 'Villar Córdoba', 'M', 'renato.villar@gmail.com', '987654343', '2006-10-20');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100024', 1, '71234524', 'Fernanda', 'Peña Lazo', 'F', 'fernanda.pena@yahoo.com', '987654344', '2004-08-07');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100025', 1, '71234525', 'Andrés', 'Carrillo Muñoz', 'M', 'andres.cm@gmail.com', '987654345', '2005-04-14');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100026', 1, '71234526', 'Ximena', 'Cabrera Fuentes', 'F', 'ximena.cabrera@hotmail.com', '987654346', '2003-12-01');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100027', 1, '71234527', 'Facundo', 'Ramos Pineda', 'M', 'facundo.rp@gmail.com', '987654347', '2006-07-28');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100028', 1, '71234528', 'Micaela', 'Salinas Arce', 'F', 'micaela.salinas@gmail.com', '987654348', '2004-09-17');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100029', 1, '71234529', 'Tomás', 'López Miranda', 'M', 'tomas.lopez@yahoo.com', '987654349', '2005-02-05');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100030', 1, '71234530', 'Almendra', 'Cortez Villanueva', 'F', 'almendra.cv@gmail.com', '987654350', '2006-11-23');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100031', 1, '71234531', 'Gael', 'Pacheco Bustamante', 'M', 'gael.pacheco@hotmail.com', '987654351', '2004-06-10');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100032', 1, '71234532', 'Romina', 'Sánchez Ávila', 'F', 'romina.sa@gmail.com', '987654352', '2005-12-19');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100033', 1, '71234533', 'Ian', 'Maldonado Ríos', 'M', 'ian.maldonado@gmail.com', '987654353', '2003-10-26');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100034', 1, '71234534', 'Alessia', 'Castillo Tello', 'F', 'alessia.castillo@yahoo.com', '987654354', '2006-03-02');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100035', 1, '71234535', 'Lucas', 'Osorio Vílchez', 'M', 'lucas.osorio@gmail.com', '987654355', '2004-01-14');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100036', 1, '71234536', 'Antonella', 'Rojas León', 'F', 'antonella.rl@hotmail.com', '987654356', '2005-08-31');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100037', 1, '71234537', 'César', 'Mejía Paredes', 'M', 'cesar.mejia@gmail.com', '987654357', '2006-05-22');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100038', 1, '71234538', 'Macarena', 'Pérez Soria', 'F', 'macarena.ps@gmail.com', '987654358', '2004-11-09');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100039', 1, '71234539', 'Gabriel', 'Escobar Guerra', 'M', 'gabriel.eg@yahoo.com', '987654359', '2005-02-18');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100040', 1, '71234540', 'Fátima', 'Cárdenas Tovar', 'F', 'fatima.cardenas@gmail.com', '987654360', '2003-09-04');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100041', 2, 'C8900123', 'John', 'Smith', 'M', 'john.smith@gmail.com', '987654361', '1999-07-12');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100042', 2, 'C8900124', 'Marie', 'Dupont', 'F', 'marie.dupont@hotmail.com', '987654362', '2001-04-25');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100043', 1, '71234543', 'Víctor', 'Lázaro Núñez', 'M', 'victor.lazaro@yahoo.com', '987654363', '2004-12-03');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100044', 1, '71234544', 'Adriana', 'Castañeda Ríos', 'F', 'adriana.cr@gmail.com', '987654364', '2006-01-28');
INSERT INTO Student (student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date) VALUES ('100045', 1, '71234545', 'Hugo', 'Paredes Vaca', 'M', 'hugo.paredes@gmail.com', '987654365', '2005-10-15');

-- =================================================================
-- 3. EMPLOYEE
-- =================================================================
INSERT INTO Employee (doc_type_id, document_number, first_name, last_name, position) VALUES (1, '40111222', 'Laura', 'Sifuentes', 'Recepcionista Turno Mañana');
INSERT INTO Employee (doc_type_id, document_number, first_name, last_name, position) VALUES (1, '40111333', 'Carlos', 'Valverde', 'Recepcionista Turno Tarde');
INSERT INTO Employee (doc_type_id, document_number, first_name, last_name, position) VALUES (1, '40111444', 'Rosa', 'Meléndez', 'Recepcionista Fines de Semana');
INSERT INTO Employee (doc_type_id, document_number, first_name, last_name, position) VALUES (1, '40111555', 'Alberto', 'Quiñones', 'Coordinador Académico');
INSERT INTO Employee (doc_type_id, document_number, first_name, last_name, position) VALUES (1, '40111666', 'Mónica', 'Salas', 'Administradora de Sede');

-- =================================================================
-- 4. SYSTEM'S USER
-- =================================================================
INSERT INTO System_User (username, password, user_role, employee_id) VALUES ('lsifuentes', 'pbkdf2_sha256$1000000$1wwK3DU7DhkUbZHql7MFaV$MdNZva9DxIaQAO0oFVg7B8Lwkserri9JIzlX7S/e1Vk=', 'RECEPTIONIST', 1);
INSERT INTO System_User (username, password, user_role, employee_id) VALUES ('cvalverde', 'pbkdf2_sha256$1000000$1wwK3DU7DhkUbZHql7MFaV$MdNZva9DxIaQAO0oFVg7B8Lwkserri9JIzlX7S/e1Vk=', 'RECEPTIONIST', 2);
INSERT INTO System_User (username, password, user_role, employee_id) VALUES ('rmelendez', 'pbkdf2_sha256$1000000$1wwK3DU7DhkUbZHql7MFaV$MdNZva9DxIaQAO0oFVg7B8Lwkserri9JIzlX7S/e1Vk=', 'RECEPTIONIST', 3);
INSERT INTO System_User (username, password, user_role, employee_id) VALUES ('aquinones', 'pbkdf2_sha256$1000000$1wwK3DU7DhkUbZHql7MFaV$MdNZva9DxIaQAO0oFVg7B8Lwkserri9JIzlX7S/e1Vk=', 'ADMIN', 4);
INSERT INTO System_User (username, password, user_role, employee_id) VALUES ('msalas', 'pbkdf2_sha256$1000000$1wwK3DU7DhkUbZHql7MFaV$MdNZva9DxIaQAO0oFVg7B8Lwkserri9JIzlX7S/e1Vk=', 'ADMIN', 5);
select * from System_User;

-- =====================================================================
-- ACADEMIC LEVELS
-- =====================================================================
INSERT INTO Academic_Level (name) VALUES ('Basic');        -- ID 1
INSERT INTO Academic_Level (name) VALUES ('Intermediate'); -- ID 2
INSERT INTO Academic_Level (name) VALUES ('Advanced');     -- ID 3

-- =================================================================
-- 6. CURSOS 
-- =================================================================

-- =====================================================================
-- LEVEL 1: BASIC 
-- =====================================================================
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 1', NULL);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 2', 1);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 3', 2);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 4', 3);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 5', 4);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 6', 5);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 7', 6);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 8', 7);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 9', 8);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 10', 9);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 11', 10);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (1, 'Basic 12', 11);

-- =====================================================================
-- LEVEL 2: INTERMEDIATE 
-- =====================================================================
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 1', 12);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 2', 13);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 3', 14);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 4', 15);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 5', 16);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 6', 17);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 7', 18);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 8', 19);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 9', 20);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 10', 21);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 11', 22);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (2, 'Intermediate 12', 23);

-- =====================================================================
-- LEVEL 3: ADVANCED 
-- =====================================================================
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (3, 'Advanced 1', 24);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (3, 'Advanced 2', 25);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (3, 'Advanced 3', 26);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (3, 'Advanced 4', 27);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (3, 'Advanced 5', 28);
INSERT INTO Course (level_id, name, prerequisite_id) VALUES (3, 'Advanced 6', 29);

COMMIT;

-- =================================================================
-- 7. DOCENTES 
-- =================================================================
INSERT INTO Teacher (doc_type_id, document_number, first_name, last_name, email, phone) VALUES (1, '10203040', 'Patricia', 'Bustamante', 'pbustamante@instituto.edu.pe', '999888771');
INSERT INTO Teacher (doc_type_id, document_number, first_name, last_name, email, phone) VALUES (1, '10203041', 'Kevin', 'Smith', 'ksmith@instituto.edu.pe', '999888772');
INSERT INTO Teacher (doc_type_id, document_number, first_name, last_name, email, phone) VALUES (1, '10203042', 'Erika', 'Ponce', 'eponce@instituto.edu.pe', '999888773');
INSERT INTO Teacher (doc_type_id, document_number, first_name, last_name, email, phone) VALUES (1, '10203043', 'Carlos', 'Valdez', 'cvaldez@instituto.edu.pe', '999888774');
INSERT INTO Teacher (doc_type_id, document_number, first_name, last_name, email, phone) VALUES (1, '10203044', 'Jessica', 'Alba', 'jalba@instituto.edu.pe', '999888775');
INSERT INTO Teacher (doc_type_id, document_number, first_name, last_name, email, phone) VALUES (1, '10203045', 'Robert', 'Pattinson', 'rpattinson@instituto.edu.pe', '999888776');
-- =====================================================================
-- 8. SCHEDULES (English Descriptions)
-- =====================================================================
-- Morning Shifts
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Mon-Wed-Fri Morning 1', '07:00 AM', '09:22 AM', '1,3,5');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Tue-Thu Morning 1', '07:00 AM', '10:15 AM', '2,4');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Daily (Mon-Fri) Morning', '08:45 AM', '10:15 AM', '1,2,3,4,5');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Tue-Thu Morning 2', '09:00 AM', '12:15 PM', '2,4');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Mon-Wed-Fri Morning 2', '10:30 AM', '12:52 PM', '1,3,5');

-- Afternoon/Evening Shifts
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Mon-Wed-Fri Afternoon 1', '01:00 PM', '03:22 PM', '1,3,5');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Tue-Thu Afternoon', '02:30 PM', '05:45 PM', '2,4');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Mon-Wed-Fri Afternoon 2', '04:00 PM', '06:22 PM', '1,3,5');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Tue-Thu Evening', '06:15 PM', '09:30 PM', '2,4');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Mon-Wed-Fri Evening', '07:00 PM', '09:22 PM', '1,3,5');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Daily (Mon-Fri) Evening', '07:45 PM', '09:15 PM', '1,2,3,4,5');

-- Weekend Shifts
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Saturday Afternoon', '12:00 PM', '03:45 PM', '6');
INSERT INTO Schedule (description, start_time, end_time, days_of_week) VALUES ('Saturday Evening', '04:00 PM', '07:45 PM', '6');

-- =====================================================================
-- 9. CLASSROOMS 
-- =====================================================================
-- First Floor
INSERT INTO Classroom (code, capacity) VALUES ('A-101', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-102', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-103', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-104', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-105', 22);

-- Second Floor
INSERT INTO Classroom (code, capacity) VALUES ('A-201', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-202', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-203', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-204', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-205', 22);

-- Third Floor
INSERT INTO Classroom (code, capacity) VALUES ('A-301', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-302', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-303', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-304', 22);
INSERT INTO Classroom (code, capacity) VALUES ('A-305', 22);
-- =================================================================
-- 10. ACADEMIC TERMS
-- =================================================================
INSERT INTO Academic_Term (name, start_date, end_date, is_active) VALUES ('2026-03', '2026-03-02', '2026-03-27', 0); -- Marzo 
INSERT INTO Academic_Term (name, start_date, end_date, is_active) VALUES ('2026-04', '2026-04-06', '2026-04-30', 1); -- Abril
INSERT INTO Academic_Term (name, start_date, end_date, is_active) VALUES ('2026-05', '2026-05-04', '2026-05-29', 0); -- Mayo 

-- =================================================================
-- 11. SECCIONES (3 Registros)
-- =================================================================
-- Sección 1: Básico 1, dictado en Marzo (Term 1). Lleno (20/20)
INSERT INTO Section (course_id, term_id, teacher_id, schedule_id, classroom_id, total_capacity, available_seats) VALUES (1, 1, 1, 1, 1, 20, 0);

-- Sección 2: Básico 2, dictado en Abril (Term 2). Lleno (20/20)
INSERT INTO Section (course_id, term_id, teacher_id, schedule_id, classroom_id, total_capacity, available_seats) VALUES (2, 2, 2, 2, 2, 20, 0);

-- Sección 3: Básico 1, dictado en Abril (Term 2). Lleno (20/20)
INSERT INTO Section (course_id, term_id, teacher_id, schedule_id, classroom_id, total_capacity, available_seats) VALUES (1, 2, 3, 3, 3, 20, 0);

-- =================================================================
-- 12. MATRÍCULAS 
-- =================================================================

-- BLOQUE 1: MARZO
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (1, 1, 1, '2026-02-25 10:00:00', 85.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (2, 1, 1, '2026-02-25 10:05:00', 92.50, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (3, 1, 1, '2026-02-25 10:15:00', 78.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (4, 1, 2, '2026-02-26 14:00:00', 88.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (5, 1, 2, '2026-02-26 14:10:00', 75.50, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (6, 1, 2, '2026-02-26 14:20:00', 90.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (7, 1, 1, '2026-02-27 09:30:00', 82.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (8, 1, 1, '2026-02-27 09:40:00', 95.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (9, 1, 1, '2026-02-27 09:50:00', 71.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (10, 1, 3, '2026-02-28 11:00:00', 84.50, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (11, 1, 3, '2026-02-28 11:15:00', 79.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (12, 1, 3, '2026-02-28 11:30:00', 89.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (13, 1, 1, '2026-03-01 08:00:00', 91.50, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (14, 1, 1, '2026-03-01 08:10:00', 76.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (15, 1, 1, '2026-03-01 08:20:00', 83.00, 1);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (16, 1, 2, '2026-03-01 15:00:00', 98.00, 1); -- Desertor
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (17, 1, 2, '2026-03-01 15:10:00', 74.50, 1); -- Desertor
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (18, 1, 2, '2026-03-01 15:20:00', 87.00, 1); -- Desertor
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (19, 1, 1, '2026-03-01 16:00:00', 93.00, 1); -- Desertor
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (20, 1, 1, '2026-03-01 16:10:00', 81.00, 1); -- Desertor

-- BLOQUE 2: ABRIL 
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (1, 2, 1, '2026-03-28 09:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (2, 2, 1, '2026-03-28 09:05:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (3, 2, 1, '2026-03-28 09:15:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (4, 2, 2, '2026-03-28 14:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (5, 2, 2, '2026-03-28 14:10:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (6, 2, 2, '2026-03-28 14:20:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (7, 2, 1, '2026-03-29 09:30:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (8, 2, 1, '2026-03-29 09:40:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (9, 2, 1, '2026-03-29 09:50:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (10, 2, 3, '2026-03-29 11:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (11, 2, 3, '2026-03-29 11:15:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (12, 2, 3, '2026-03-29 11:30:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (13, 2, 1, '2026-03-30 08:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (14, 2, 1, '2026-03-30 08:10:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (15, 2, 1, '2026-03-30 08:20:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (41, 2, 3, '2026-03-31 10:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (42, 2, 3, '2026-03-31 10:15:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (43, 2, 3, '2026-03-31 10:30:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (44, 2, 3, '2026-03-31 10:45:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (45, 2, 3, '2026-03-31 11:00:00', NULL, 0);

-- BLOQUE 3: ABRIL
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (21, 3, 1, '2026-04-01 09:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (22, 3, 1, '2026-04-01 09:10:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (23, 3, 1, '2026-04-01 09:20:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (24, 3, 2, '2026-04-01 10:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (25, 3, 2, '2026-04-01 10:10:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (26, 3, 2, '2026-04-01 10:20:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (27, 3, 1, '2026-04-02 11:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (28, 3, 1, '2026-04-02 11:10:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (29, 3, 1, '2026-04-02 11:20:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (30, 3, 3, '2026-04-02 12:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (31, 3, 3, '2026-04-02 12:10:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (32, 3, 3, '2026-04-02 12:20:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (33, 3, 1, '2026-04-03 08:30:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (34, 3, 1, '2026-04-03 08:40:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (35, 3, 1, '2026-04-03 08:50:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (36, 3, 2, '2026-04-03 16:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (37, 3, 2, '2026-04-03 16:10:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (38, 3, 2, '2026-04-03 16:20:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (39, 3, 1, '2026-04-04 10:00:00', NULL, 0);
INSERT INTO Enrollment (student_id, section_id, user_id, enrollment_date, final_grade, is_approved) VALUES (40, 3, 1, '2026-04-04 10:15:00', NULL, 0);

COMMIT;