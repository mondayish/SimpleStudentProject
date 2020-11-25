package ru.mondayish.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.mondayish.models.Professor;
import ru.mondayish.repositories.ProfessorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService implements EducationService<Professor> {

    private final ProfessorRepository professorRepository;

    public ProfessorService(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    @Override
    public Professor create(Professor professor) {
        return professorRepository.save(professor);
    }

    @Override
    public Optional<Professor> get(Long id) {
        return professorRepository.findById(id);
    }

    @Override
    public List<Professor> getAll() {
        return professorRepository.findAll();
    }

    @Override
    public Page<Professor> getAll(Pageable pageable) {
        return professorRepository.findAll(pageable);
    }

    @Override
    public boolean update(Professor professor) {
        if (professorRepository.existsById(professor.getId())) {
            professorRepository.save(professor);
            return true;
        }
        return false;
    }

    @Override
    public void delete(Long id) {
        professorRepository.deleteById(id);
    }
}
