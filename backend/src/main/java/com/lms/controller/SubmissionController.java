package com.lms.controller;

import com.lms.entity.Submission;
import com.lms.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "http://localhost:5173")
public class SubmissionController {

    @Autowired
    private SubmissionRepository submissionRepository;

    @GetMapping
    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    @PostMapping
    public Submission createSubmission(@RequestBody Submission submission) {
        submission.setSubmissionDate(LocalDate.now());
        submission.setStatus("Pending");
        return submissionRepository.save(submission);
    }

    @GetMapping("/assignment/{id}")
    public List<Submission> getSubmissionsByAssignment(@PathVariable Long id) {
        return submissionRepository.findByAssignmentId(id);
    }

    @PutMapping("/{id}/status")
    @SuppressWarnings("null")
    public ResponseEntity<Submission> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return submissionRepository.findById(id)
                .map(s -> {
                    s.setStatus(status);
                    return ResponseEntity.ok(submissionRepository.save(s));
                }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/grade")
    @SuppressWarnings("null")
    public ResponseEntity<Submission> gradeSubmission(@PathVariable Long id, @RequestParam String grade) {
        return submissionRepository.findById(id)
                .map(s -> {
                    s.setGrade(grade);
                    s.setStatus("Graded");
                    return ResponseEntity.ok(submissionRepository.save(s));
                }).orElse(ResponseEntity.notFound().build());
    }
}
