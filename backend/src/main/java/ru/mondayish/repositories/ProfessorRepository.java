package ru.mondayish.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mondayish.models.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}
