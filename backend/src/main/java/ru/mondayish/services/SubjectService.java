package ru.mondayish.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mondayish.models.Subject;
import ru.mondayish.repositories.SubjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService implements EducationService<Subject>{

    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Override
    public Subject create(Subject subject) {
        return subjectRepository.save(subject);
    }

    @Override
    public Optional<Subject> get(Long id) {
        return subjectRepository.findById(id);
    }

    @Override
    public List<Subject> getAll() {
        return subjectRepository.findAll();
    }

    @Override
    public boolean update(Subject subject) {
        if(subjectRepository.existsById(subject.getId())){
            subjectRepository.save(subject);
            return true;
        }
        return false;
    }

    @Override
    public void delete(Long id) {
        subjectRepository.deleteById(id);
    }
}
