package ru.mondayish.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mondayish.models.Student;
import ru.mondayish.models.Subject;
import ru.mondayish.services.EducationService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    private final EducationService<Subject> subjectService;

    public SubjectController(EducationService<Subject> subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Long id) {
        Optional<Subject> opt = subjectService.get(id);
        return opt.map(subject -> new ResponseEntity<>(subject, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        Subject createdSubject = subjectService.create(subject);
        return new ResponseEntity<>(createdSubject, HttpStatus.CREATED);
    }
}
