package ru.mondayish.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mondayish.models.Mark;

public interface MarkRepository extends JpaRepository<Mark, Long> {
}
