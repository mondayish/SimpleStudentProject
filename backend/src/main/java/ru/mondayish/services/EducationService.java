package ru.mondayish.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface EducationService<T>{

    T create(T t);

    Optional<T> get(Long id);

    List<T> getAll();

    Page<T> getAll(Pageable pageable);

    boolean update(T t);

    void delete(Long id);
}
