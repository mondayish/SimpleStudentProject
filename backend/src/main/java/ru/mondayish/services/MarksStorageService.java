package ru.mondayish.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.mondayish.models.MarksStorage;
import ru.mondayish.repositories.MarksStorageRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MarksStorageService implements EducationService<MarksStorage> {

    private final MarksStorageRepository marksStorageRepository;

    public MarksStorageService(MarksStorageRepository marksStorageRepository) {
        this.marksStorageRepository = marksStorageRepository;
    }

    @Override
    public MarksStorage create(MarksStorage marksStorage) {
        return marksStorageRepository.save(marksStorage);
    }

    @Override
    public Optional<MarksStorage> get(Long id) {
        return marksStorageRepository.findById(id);
    }

    @Override
    public List<MarksStorage> getAll() {
        return marksStorageRepository.findAll();
    }

    @Override
    public Page<MarksStorage> getAll(Pageable pageable) {
        return marksStorageRepository.findAll(pageable);
    }

    @Override
    public boolean update(MarksStorage marksStorage) {
        if(marksStorageRepository.existsById(marksStorage.getId())){
            marksStorageRepository.save(marksStorage);
            return true;
        }
        return false;
    }

    @Override
    public void delete(Long id) {
        marksStorageRepository.deleteById(id);
    }
}
