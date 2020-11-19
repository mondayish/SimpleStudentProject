package ru.mondayish.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mondayish.models.MarksStorage;
import ru.mondayish.models.Student;
import ru.mondayish.repositories.StudentRepository;
import ru.mondayish.repositories.SubjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements EducationService<Student> {

    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository, SubjectRepository subjectRepository) {
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public Student create(Student student) {
        // handle every new subject
        student.getMarksStorages()
                .stream()
                .map(MarksStorage::getSubject)
                .filter(subject -> subject.getId() == 0)
                .forEach(subjectRepository::save);
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
