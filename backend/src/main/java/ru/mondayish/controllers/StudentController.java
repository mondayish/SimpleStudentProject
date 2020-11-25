package ru.mondayish.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mondayish.models.Student;
import ru.mondayish.services.EducationService;

import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final EducationService<Student> studentService;

    public StudentController(EducationService<Student> studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public Page<Student> getAllStudents(@PageableDefault(page = 0, size = 5) Pageable pageable) {
        return studentService.getAll(pageable);
    }

    @GetMapping("{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> opt = studentService.get(id);
        return opt.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student createdStudent = studentService.create(student);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @PutMapping("/")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
        return studentService.update(student) ?
                new ResponseEntity<>(student, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable Long id) {
        studentService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
