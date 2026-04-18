-- 1. Create the sequence starting at 100001
CREATE SEQUENCE student_code_seq START WITH 100045 INCREMENT BY 1 NOCACHE;
/

CREATE OR REPLACE PACKAGE PKG_ADMIN_BASE AS
    -- RF01: Student CRUD
    PROCEDURE create_student(
        p_doc_type IN Student.doc_type_id%TYPE,
        p_doc_num IN Student.document_number%TYPE, p_fname IN Student.first_name%TYPE,
        p_lname IN Student.last_name%TYPE, p_gender IN Student.gender%TYPE,
        p_email IN Student.email%TYPE, p_phone IN Student.phone%TYPE,
        p_birth IN Student.birth_date%TYPE, p_new_id OUT Student.student_id%TYPE
    );
    
    PROCEDURE update_student(
        p_id IN Student.student_id%TYPE, p_fname IN Student.first_name%TYPE,
        p_lname IN Student.last_name%TYPE, p_email IN Student.email%TYPE,
        p_phone IN Student.phone%TYPE
    );
    
    -- RF03: Academic Structure (Levels and Courses)
    PROCEDURE create_academic_level(p_name IN Academic_Level.name%TYPE, p_new_id OUT Academic_Level.level_id%TYPE);
    
    -- NEW: Update and Delete for Academic Levels
    PROCEDURE update_academic_level(p_id IN Academic_Level.level_id%TYPE, p_name IN Academic_Level.name%TYPE);
    PROCEDURE delete_academic_level(p_id IN Academic_Level.level_id%TYPE);
    
    PROCEDURE create_course(
        p_level IN Course.level_id%TYPE, p_name IN Course.name%TYPE,
        p_prereq IN Course.prerequisite_id%TYPE, p_new_id OUT Course.course_id%TYPE
    );
    PROCEDURE update_course(
            p_course_id IN Course.course_id%TYPE,
            p_level IN Course.level_id%TYPE,
            p_name IN Course.name%TYPE,
            p_prereq IN Course.prerequisite_id%TYPE
        );
    -- RF04: Section Opening
    PROCEDURE open_section(
        p_course IN Section.course_id%TYPE, p_term IN Section.term_id%TYPE,
        p_teacher IN Section.teacher_id%TYPE, p_schedule IN Section.schedule_id%TYPE,
        p_classroom IN Section.classroom_id%TYPE, p_capacity IN Section.total_capacity%TYPE,
        p_new_id OUT Section.section_id%TYPE
    );
END PKG_ADMIN_BASE;
/
CREATE OR REPLACE PACKAGE BODY PKG_ADMIN_BASE AS

    -- RF01: Student CRUD
    PROCEDURE create_student(
        p_doc_type IN Student.doc_type_id%TYPE,
        p_doc_num IN Student.document_number%TYPE, p_fname IN Student.first_name%TYPE,
        p_lname IN Student.last_name%TYPE, p_gender IN Student.gender%TYPE,
        p_email IN Student.email%TYPE, p_phone IN Student.phone%TYPE,
        p_birth IN Student.birth_date%TYPE, p_new_id OUT Student.student_id%TYPE
    ) IS BEGIN
        INSERT INTO Student(student_code, doc_type_id, document_number, first_name, last_name, gender, email, phone, birth_date)
        VALUES (TO_CHAR(student_code_seq.NEXTVAL), p_doc_type, p_doc_num, p_fname, p_lname, p_gender, p_email, p_phone, p_birth)
        RETURNING student_id INTO p_new_id;
    EXCEPTION 
        WHEN DUP_VAL_ON_INDEX THEN 
            RAISE_APPLICATION_ERROR(-20101, 'Student code, document number or email already exists.');
    END;

    PROCEDURE update_student(
        p_id IN Student.student_id%TYPE, p_fname IN Student.first_name%TYPE,
        p_lname IN Student.last_name%TYPE, p_email IN Student.email%TYPE,
        p_phone IN Student.phone%TYPE
    ) IS BEGIN
        UPDATE Student SET first_name = p_fname, last_name = p_lname, email = p_email, phone = p_phone
        WHERE student_id = p_id;
        IF SQL%ROWCOUNT = 0 THEN RAISE_APPLICATION_ERROR(-20102, 'Student not found.'); END IF;
    END;

    -- RF03: Academic Structure
    PROCEDURE create_academic_level(p_name IN Academic_Level.name%TYPE, p_new_id OUT Academic_Level.level_id%TYPE) IS BEGIN
        INSERT INTO Academic_Level(name) VALUES (p_name) RETURNING level_id INTO p_new_id;
    END;

    -- NEW: Update Academic Level
    PROCEDURE update_academic_level(p_id IN Academic_Level.level_id%TYPE, p_name IN Academic_Level.name%TYPE) IS BEGIN
        UPDATE Academic_Level SET name = p_name WHERE level_id = p_id;
        IF SQL%ROWCOUNT = 0 THEN RAISE_APPLICATION_ERROR(-20103, 'Academic Level not found.'); END IF;
    END;

    -- NEW: Delete Academic Level
    PROCEDURE delete_academic_level(p_id IN Academic_Level.level_id%TYPE) IS BEGIN
        DELETE FROM Academic_Level WHERE level_id = p_id;
        IF SQL%ROWCOUNT = 0 THEN RAISE_APPLICATION_ERROR(-20103, 'Academic Level not found.'); END IF;
    END;

    PROCEDURE create_course(
        p_level IN Course.level_id%TYPE, p_name IN Course.name%TYPE,
        p_prereq IN Course.prerequisite_id%TYPE, p_new_id OUT Course.course_id%TYPE
    ) IS BEGIN
        INSERT INTO Course(level_id, name, prerequisite_id) VALUES (p_level, p_name, p_prereq)
        RETURNING course_id INTO p_new_id;
    END;
    PROCEDURE update_course(
        p_course_id IN Course.course_id%TYPE,
        p_level IN Course.level_id%TYPE,
        p_name IN Course.name%TYPE,
        p_prereq IN Course.prerequisite_id%TYPE
    ) IS BEGIN
        UPDATE Course 
        SET level_id = p_level, 
            name = p_name, 
            prerequisite_id = p_prereq
        WHERE course_id = p_course_id;
        
        IF SQL%ROWCOUNT = 0 THEN 
            RAISE_APPLICATION_ERROR(-20104, 'Course not found.'); 
        END IF;
    END;
    -- RF04: Section Opening
    PROCEDURE open_section(
        p_course IN Section.course_id%TYPE, p_term IN Section.term_id%TYPE,
        p_teacher IN Section.teacher_id%TYPE, p_schedule IN Section.schedule_id%TYPE,
        p_classroom IN Section.classroom_id%TYPE, p_capacity IN Section.total_capacity%TYPE,
        p_new_id OUT Section.section_id%TYPE
    ) IS BEGIN
        INSERT INTO Section(course_id, term_id, teacher_id, schedule_id, classroom_id, total_capacity, available_seats)
        VALUES (p_course, p_term, p_teacher, p_schedule, p_classroom, p_capacity, p_capacity)
        RETURNING section_id INTO p_new_id;
    END;
    
END PKG_ADMIN_BASE;
/
-- =============================================================================
-- PACKAGE SPECIFICATION: PKG_ENROLLMENT_TRANS 
-- =============================================================================
CREATE OR REPLACE PACKAGE PKG_ENROLLMENT_TRANS AS

    FUNCTION check_prerequisites(p_student_id IN NUMBER, p_course_id IN NUMBER) RETURN VARCHAR2;
    
    PROCEDURE register_enrollment(
        p_student IN Enrollment.student_id%TYPE, 
        p_section IN Enrollment.section_id%TYPE, 
        p_user IN Enrollment.user_id%TYPE, 
        p_new_id OUT Enrollment.enrollment_id%TYPE
    );

    -- Registro de Notas de fin de ciclo
    PROCEDURE record_final_grade(
        p_enrollment_id IN Enrollment.enrollment_id%TYPE,
        p_grade IN Enrollment.final_grade%TYPE
    );

    PROCEDURE get_academic_history(
        p_student_id IN NUMBER,
        p_cursor OUT SYS_REFCURSOR
    );

END PKG_ENROLLMENT_TRANS;
/

-- =============================================================================
-- PACKAGE BODY: PKG_ENROLLMENT_TRANS
-- =============================================================================
CREATE OR REPLACE PACKAGE BODY PKG_ENROLLMENT_TRANS AS

    FUNCTION check_prerequisites(p_student_id IN NUMBER, p_course_id IN NUMBER) RETURN VARCHAR2 IS
        v_prereq_id NUMBER;
        v_passed NUMBER;
    BEGIN
        SELECT prerequisite_id INTO v_prereq_id FROM Course WHERE course_id = p_course_id;
        
        IF v_prereq_id IS NULL THEN
            RETURN 'Y';
        END IF;

        SELECT COUNT(*) INTO v_passed
        FROM Enrollment e
        JOIN Section s ON e.section_id = s.section_id
        WHERE e.student_id = p_student_id 
          AND s.course_id = v_prereq_id 
          AND e.is_approved = 1;

        IF v_passed > 0 THEN
            RETURN 'Y';
        ELSE
            RETURN 'ERROR: Student has not passed the prerequisite course.';
        END IF;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 'ERROR: Course not found.';
    END check_prerequisites;

    PROCEDURE register_enrollment(
        p_student IN Enrollment.student_id%TYPE, 
        p_section IN Enrollment.section_id%TYPE, 
        p_user IN Enrollment.user_id%TYPE, 
        p_new_id OUT Enrollment.enrollment_id%TYPE
    ) IS
        v_target_course_id NUMBER;
        v_prereq_check VARCHAR2(500);
        v_available_seats NUMBER;
        v_already_enrolled NUMBER;
    BEGIN
        SELECT COUNT(*) INTO v_already_enrolled FROM Enrollment WHERE student_id = p_student AND section_id = p_section;
        IF v_already_enrolled > 0 THEN
            RAISE_APPLICATION_ERROR(-20201, 'Student is already enrolled in this section.');
        END IF;

        SELECT course_id INTO v_target_course_id FROM Section WHERE section_id = p_section;

        v_prereq_check := check_prerequisites(p_student, v_target_course_id);
        IF v_prereq_check != 'Y' THEN
            RAISE_APPLICATION_ERROR(-20202, v_prereq_check);
        END IF;

        -- 4. Ejecutar RF05 (Control de Aforo) con bloqueo de concurrencia
        -- FOR UPDATE bloquea la fila de Section para que otra recepcionista no asigne el mismo cupo al mismo tiempo
        SELECT available_seats INTO v_available_seats 
        FROM Section WHERE section_id = p_section FOR UPDATE;

        IF v_available_seats <= 0 THEN
            RAISE_APPLICATION_ERROR(-20203, 'Section is full. No seats available.');
        END IF;

        UPDATE Section SET available_seats = available_seats - 1 WHERE section_id = p_section;

        INSERT INTO Enrollment(student_id, section_id, user_id, enrollment_date, is_approved)
        VALUES (p_student, p_section, p_user, SYSTIMESTAMP, 0)
        RETURNING enrollment_id INTO p_new_id;

        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
    END register_enrollment;

    PROCEDURE record_final_grade(
        p_enrollment_id IN Enrollment.enrollment_id%TYPE,
        p_grade IN Enrollment.final_grade%TYPE
    ) IS
        v_is_approved NUMBER(1) := 0;
    BEGIN
        IF p_grade >= 70 THEN
            v_is_approved := 1;
        END IF;

        UPDATE Enrollment 
        SET final_grade = p_grade, is_approved = v_is_approved 
        WHERE enrollment_id = p_enrollment_id;
        
        COMMIT;
    END record_final_grade;

    PROCEDURE get_academic_history(
        p_student_id IN NUMBER,
        p_cursor OUT SYS_REFCURSOR
    ) IS
    BEGIN
        OPEN p_cursor FOR
            SELECT 
                e.enrollment_date,
                term.name AS term_name,
                lvl.name AS level_name,
                c.name AS course_name,
                e.final_grade,
                CASE 
                    WHEN e.final_grade IS NULL THEN 'EN CURSO'
                    WHEN e.is_approved = 1 THEN 'APROBADO'
                    ELSE 'REPROBADO' 
                END AS status
            FROM Enrollment e
            JOIN Section s ON e.section_id = s.section_id
            JOIN Academic_Term term ON s.term_id = term.term_id
            JOIN Course c ON s.course_id = c.course_id
            JOIN Academic_Level lvl ON c.level_id = lvl.level_id
            WHERE e.student_id = p_student_id
            ORDER BY e.enrollment_date DESC;
    END get_academic_history;

END PKG_ENROLLMENT_TRANS;
/

-- =============================================================================
-- PACKAGE SPECIFICATION: PKG_SYSTEM_SECURITY
-- =============================================================================
CREATE OR REPLACE PACKAGE PKG_SYSTEM_SECURITY AS

    PROCEDURE login_user(
        p_user IN VARCHAR2, 
        p_pass IN VARCHAR2, 
        p_id OUT NUMBER, 
        p_role OUT VARCHAR2, 
        p_ok OUT NUMBER
    );

END PKG_SYSTEM_SECURITY;
/

-- =============================================================================
-- PACKAGE BODY: PKG_SYSTEM_SECURITY
-- =============================================================================
CREATE OR REPLACE PACKAGE BODY PKG_SYSTEM_SECURITY AS

    PROCEDURE login_user(
        p_user IN VARCHAR2, 
        p_pass IN VARCHAR2, 
        p_id OUT NUMBER, 
        p_role OUT VARCHAR2, 
        p_ok OUT NUMBER
    ) IS 
    BEGIN
        SELECT user_id, user_role 
        INTO p_id, p_role 
        FROM System_User 
        WHERE username = p_user 
          AND password = p_pass 
          AND is_active = 1;
          
        p_ok := 1;
        
        UPDATE System_User SET last_login = SYSTIMESTAMP WHERE user_id = p_id;
        COMMIT;
        
    EXCEPTION 
        WHEN NO_DATA_FOUND THEN 
            p_ok := 0; 
            p_id := NULL;
            p_role := NULL;
    END login_user;

END PKG_SYSTEM_SECURITY;
/
COMMIT;
