package ru.mondayish.services;

import java.util.List;
import java.util.Optional;

public interface EducationService<T>{

    T create(T t);

    Optional<T> get(Long id);

    List<T> getAll();

    boolean update(T t);

    void delete(Long id);
}
