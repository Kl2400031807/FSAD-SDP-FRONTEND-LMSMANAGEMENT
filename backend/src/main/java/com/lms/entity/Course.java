package com.lms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String instructorName;

    private String difficulty; // Beginner, Intermediate, Advanced

    private String duration; // e.g. "6 Weeks"

    private String enrollments; // Mock string or numeric

    private String category; // Development, Design, etc.

    private boolean isNew;

    private String image;

    private String ownerEmail; // Link to instructor's email

    public Course() {}

    public Course(Long id, String title, String description, String instructorName, String difficulty,
            String duration, String enrollments, String category, boolean isNew, String image, String ownerEmail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.instructorName = instructorName;
        this.difficulty = difficulty;
        this.duration = duration;
        this.enrollments = enrollments;
        this.category = category;
        this.isNew = isNew;
        this.image = image;
        this.ownerEmail = ownerEmail;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getEnrollments() { return enrollments; }
    public void setEnrollments(String enrollments) { this.enrollments = enrollments; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public boolean isNew() { return isNew; }
    public void setNew(boolean isNew) { this.isNew = isNew; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }
}

