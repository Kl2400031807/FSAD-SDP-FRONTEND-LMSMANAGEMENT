package com.lms.repository;

import com.lms.entity.Enrollment;
import com.lms.entity.User;
import com.lms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByUser(User user);

    List<Enrollment> findByCourse(Course course);

    Optional<Enrollment> findByUserAndCourse(User user, Course course);

    List<Enrollment> findByUserAndStatus(User user, String status);

    long countByCourse(Course course);
}