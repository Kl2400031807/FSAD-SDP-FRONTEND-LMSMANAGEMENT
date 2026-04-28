package com.lms.controller;

import com.lms.entity.Assignment;
import com.lms.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "http://localhost:5173")
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @PostMapping
    @SuppressWarnings("null")
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @GetMapping("/instructor/{email}")
    public List<Assignment> getAssignmentsByInstructor(@PathVariable String email) {
        return assignmentRepository.findByInstructorEmail(email);
    }

    @PutMapping("/{id}")
    @SuppressWarnings("null")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable Long id, @RequestBody Assignment updated) {
        return assignmentRepository.findById(id)
                .map(a -> {
                    a.setTitle(updated.getTitle());
                    a.setDueDate(updated.getDueDate());
                    a.setStatus(updated.getStatus());
                    a.setProgress(updated.getProgress());
                    a.setGrade(updated.getGrade());
                    return ResponseEntity.ok(assignmentRepository.save(a));
                }).orElse(ResponseEntity.notFound().build());
    }
}
