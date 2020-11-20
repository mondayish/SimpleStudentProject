package ru.mondayish.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mondayish.models.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
