package com.lms.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "submissions")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;

    @Column(nullable = false)
    private String studentEmail;

    private String studentName;

    private LocalDate submissionDate;

    private String fileName;

    private String status; // Pending, Graded, etc.

    private String size; // e.g. "1.2MB"

    private String grade;

    public Submission() {}

    public Submission(Long id, Assignment assignment, String studentEmail, String studentName,
            LocalDate submissionDate, String fileName, String status, String size, String grade) {
        this.id = id;
        this.assignment = assignment;
        this.studentEmail = studentEmail;
        this.studentName = studentName;
        this.submissionDate = submissionDate;
        this.fileName = fileName;
        this.status = status;
        this.size = size;
        this.grade = grade;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Assignment getAssignment() { return assignment; }
    public void setAssignment(Assignment assignment) { this.assignment = assignment; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public LocalDate getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(LocalDate submissionDate) { this.submissionDate = submissionDate; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
}

