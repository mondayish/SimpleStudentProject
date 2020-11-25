package ru.mondayish.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mondayish.models.Professor;
import ru.mondayish.services.EducationService;

import java.util.Optional;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {

    private final EducationService<Professor> professorService;

    public ProfessorController(EducationService<Professor> professorService) {
        this.professorService = professorService;
    }

    @GetMapping
    public Page<Professor> getAllProfessors(@PageableDefault(page = 0, size = 5) Pageable pageable) {
        return professorService.getAll(pageable);
    }

    @GetMapping("{id}")
    public ResponseEntity<Professor> getProfessorById(@PathVariable Long id) {
        Optional<Professor> opt = professorService.get(id);
        return opt.map(professor -> new ResponseEntity<>(professor, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<Professor> createProfessor(@RequestBody Professor professor) {
        Professor createdProfessor = professorService.create(professor);
        return new ResponseEntity<>(createdProfessor, HttpStatus.CREATED);
    }

    @PutMapping("/")
    public ResponseEntity<Professor> updateProfessor(@RequestBody Professor professor) {
        return professorService.update(professor) ?
                new ResponseEntity<>(professor, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProfessor(@PathVariable Long id) {
        professorService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
