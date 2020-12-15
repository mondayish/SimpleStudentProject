package ru.mondayish.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.mondayish.models.Student;
import ru.mondayish.repositories.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements EducationService<Student> {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student create(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @Override
    public Optional<Student> get(Long id) {
        return studentRepository.findById(id);
    }

    @Override
    public Page<Student> getAll(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }

    @Override
    public boolean update(Student student) {
        if (studentRepository.existsById(student.getId())) {
            studentRepository.save(student);
            return true;
        }
        return false;
    }

    @Override
    public void delete(Long id) {
        studentRepository.deleteById(id);
    }
}
