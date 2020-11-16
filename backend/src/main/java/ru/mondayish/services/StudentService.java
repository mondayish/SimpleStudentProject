package ru.mondayish.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mondayish.models.Student;
import ru.mondayish.repositories.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements EducationService<Student> {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student create(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> get(Long id) {
        return studentRepository.findById(id);
    }

    @Override
    public List<Student> getAll() {
        return studentRepository.findAll();
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
