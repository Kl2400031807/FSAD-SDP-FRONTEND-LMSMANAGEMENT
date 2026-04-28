package com.lms.controller;

import com.lms.entity.Course;
import com.lms.entity.Enrollment;
import com.lms.entity.User;
import com.lms.repository.CourseRepository;
import com.lms.repository.EnrollmentRepository;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all courses
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllCourses(
            @RequestParam(required = false) String userEmail) {

        List<Course> courses = courseRepository.findAll();

        List<Map<String, Object>> courseData = courses.stream().map(course -> {

            Map<String, Object> courseMap = new java.util.HashMap<>();

            courseMap.put("id", course.getId());
            courseMap.put("title", course.getTitle());
            courseMap.put("description", course.getDescription());
            courseMap.put("instructor", course.getInstructorName());
            courseMap.put("difficulty", course.getDifficulty());
            courseMap.put("duration", course.getDuration());
            courseMap.put("enrollments", course.getEnrollments());
            courseMap.put("category", course.getCategory());
            courseMap.put("isNew", course.isNew());
            courseMap.put("image", course.getImage());
            courseMap.put("ownerEmail", course.getOwnerEmail());

            // ✅ Add enrollment info
            if (userEmail != null) {
                userRepository.findByEmail(userEmail).ifPresent(user -> {

                    Optional<Enrollment> enrollmentOpt =
                            enrollmentRepository.findByUserAndCourse(user, course);

                    if (enrollmentOpt.isPresent()) {
                        Enrollment enrollment = enrollmentOpt.get();
                        courseMap.put("studentEnrolled", true);
                        courseMap.put("isCompleted",
                                "COMPLETED".equals(enrollment.getStatus()));
                        courseMap.put("enrollmentStatus", enrollment.getStatus());
                    } else {
                        courseMap.put("studentEnrolled", false);
                        courseMap.put("isCompleted", false);
                        courseMap.put("enrollmentStatus", null);
                    }
                });
            }

            return courseMap;

        }).collect(Collectors.toList());

        return ResponseEntity.ok(courseData);
    }

    // ✅ Create course
    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseRepository.save(course));
    }

    // ✅ Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Update course
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(
            @PathVariable Long id,
            @RequestBody Course courseDetails) {

        return courseRepository.findById(id)
                .map(course -> {
                    course.setTitle(courseDetails.getTitle());
                    course.setDescription(courseDetails.getDescription());
                    course.setDifficulty(courseDetails.getDifficulty());
                    course.setDuration(courseDetails.getDuration());
                    course.setCategory(courseDetails.getCategory());
                    return ResponseEntity.ok(courseRepository.save(course));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Enroll
    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<Map<String, String>> enroll(
            @PathVariable Long courseId,
            @RequestParam String userEmail) {

        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (userOpt.isEmpty() || courseOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "User or course not found"));
        }

        User user = userOpt.get();
        Course course = courseOpt.get();

        if (enrollmentRepository.findByUserAndCourse(user, course).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Already enrolled"));
        }

        enrollmentRepository.save(new Enrollment(user, course));

        return ResponseEntity.ok(Map.of("message", "Enrolled successfully"));
    }
}