package ru.mondayish.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mondayish.models.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
