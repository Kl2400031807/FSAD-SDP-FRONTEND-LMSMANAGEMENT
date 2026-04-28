package com.lms.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "assignments")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String course;

    private LocalDate dueDate;

    private String status; // Pending, Submitted, Graded, Overdue

    private String role; // student, instructor (creator/viewer)

    private int progress; // 0-100

    private String grade; // e.g. "A", "B+", etc.

    private int submissionCount; // Number of students who submitted

    private String instructorEmail; // Creator email link

    public Assignment() {}

    public Assignment(Long id, String title, String course, LocalDate dueDate, String status,
            String role, int progress, String grade, int submissionCount, String instructorEmail) {
        this.id = id;
        this.title = title;
        this.course = course;
        this.dueDate = dueDate;
        this.status = status;
        this.role = role;
        this.progress = progress;
        this.grade = grade;
        this.submissionCount = submissionCount;
        this.instructorEmail = instructorEmail;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public int getProgress() { return progress; }
    public void setProgress(int progress) { this.progress = progress; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public int getSubmissionCount() { return submissionCount; }
    public void setSubmissionCount(int submissionCount) { this.submissionCount = submissionCount; }

    public String getInstructorEmail() { return instructorEmail; }
    public void setInstructorEmail(String instructorEmail) { this.instructorEmail = instructorEmail; }
}

