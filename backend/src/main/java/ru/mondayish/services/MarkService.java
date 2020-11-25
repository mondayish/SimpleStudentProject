package ru.mondayish.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.mondayish.models.Mark;
import ru.mondayish.repositories.MarkRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MarkService implements EducationService<Mark> {

    private final MarkRepository markRepository;

    public MarkService(MarkRepository markRepository) {
        this.markRepository = markRepository;
    }

    @Override
    public Mark create(Mark mark) {
        return markRepository.save(mark);
    }

    @Override
    public Page<Mark> getAll(Pageable pageable) {
        return markRepository.findAll(pageable);
    }

    @Override
    public Optional<Mark> get(Long id) {
        return markRepository.findById(id);
    }

    @Override
    public List<Mark> getAll() {
        return markRepository.findAll();
    }

    @Override
    public boolean update(Mark mark) {
        if(markRepository.existsById(mark.getId())){
            markRepository.save(mark);
            return true;
        }
        return false;
    }

    @Override
    public void delete(Long id) {
        markRepository.deleteById(id);
    }
}
