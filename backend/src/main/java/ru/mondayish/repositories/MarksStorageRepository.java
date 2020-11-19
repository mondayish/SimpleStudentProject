package ru.mondayish.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mondayish.models.MarksStorage;

public interface MarksStorageRepository extends JpaRepository<MarksStorage, Long> {
}
