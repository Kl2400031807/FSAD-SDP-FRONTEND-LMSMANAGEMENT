package com.lms.controller;

import com.lms.dto.LoginRequest;
import com.lms.dto.LoginResponse;
import com.lms.dto.RegisterRequest;
import com.lms.entity.User;
import com.lms.repository.UserRepository;
import com.lms.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {

        System.out.println("===== REGISTER DEBUG =====");
        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Password: " + request.getPassword());

        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "Data is NULL", null));
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "Email already exists", null));
        }

        // Generate OTP
        String otp = emailService.generateOtp();
        long otpExpiryTime = System.currentTimeMillis() + (10 * 60 * 1000); // 10 minutes

        // ✅ DTO → ENTITY
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        
        // Use role from request if present, otherwise default to student
        String role = request.getRole() != null ? request.getRole().toLowerCase() : "student";
        user.setRole(role);
        user.setOtp(otp);
        user.setOtpExpiryTime(otpExpiryTime);
        user.setEmailVerified(false);

        User savedUser = userRepository.save(user);
        savedUser.setPassword(null);
        savedUser.setOtp(null); // Don't send OTP in response

        // Send OTP email
        try {
            emailService.sendOtpEmail(request.getEmail(), otp);
        } catch (Exception e) {
            System.err.println("Failed to send OTP email: " + e.getMessage());
            // Continue anyway - user can request resend
        }

        return ResponseEntity.ok(
                new LoginResponse(true, "Registration initiated. Please check your email for OTP.", savedUser)
        );
    }

    // 🔐 LOGIN API
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        System.out.println("----- LOGIN DEBUG -----");
        System.out.println("Email entered: " + request.getEmail());
        System.out.println("Password entered: " + request.getPassword());

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isPresent()) {
            System.out.println("User found in DB");
            System.out.println("DB Password: " + userOpt.get().getPassword());
        } else {
            System.out.println("User NOT found");
        }

        if (userOpt.isPresent() &&
                userOpt.get().getPassword().equals(request.getPassword())) {

            User user = userOpt.get();
            
            // Check if email is verified
            if (!user.isEmailVerified()) {
                return ResponseEntity.status(401)
                        .body(new LoginResponse(false, "Please verify your email before logging in", null));
            }

            String normalizedRole = user.getRole() != null ? user.getRole().toLowerCase() : "student";
            user.setRole(normalizedRole);
            user.setPassword(null);

            return ResponseEntity.ok(
                    new LoginResponse(true, "Login successful", user)
            );
        }

        return ResponseEntity.status(401)
                .body(new LoginResponse(false, "Invalid credentials", null));
    }

    @PostMapping("/validate-password")
    public ResponseEntity<Map<String, Object>> validatePassword(@RequestParam String password) {
        Map<String, Object> response = new HashMap<>();
        
        boolean hasMinLength = password.length() >= 8;
        boolean hasUpperCase = password.matches(".*[A-Z].*");
        boolean hasLowerCase = password.matches(".*[a-z].*");
        boolean hasDigit = password.matches(".*[0-9].*");
        boolean hasSpecialChar = password.matches(".*[@$!%*?&].*");
        boolean isValid = hasMinLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
        
        response.put("hasMinLength", hasMinLength);
        response.put("hasUpperCase", hasUpperCase);
        response.put("hasLowerCase", hasLowerCase);
        response.put("hasDigit", hasDigit);
        response.put("hasSpecialChar", hasSpecialChar);
        response.put("isValid", isValid);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<LoginResponse> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        if (email == null || otp == null) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "Email and OTP are required", null));
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "User not found", null));
        }

        User user = userOpt.get();
        
        if (user.isEmailVerified()) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "Email already verified", null));
        }

        if (System.currentTimeMillis() > user.getOtpExpiryTime()) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "OTP has expired", null));
        }

        if (!otp.equals(user.getOtp())) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "Invalid OTP", null));
        }

        // Mark email as verified
        user.setEmailVerified(true);
        user.setOtp(null); // Clear OTP after successful verification
        user.setOtpExpiryTime(0);
        userRepository.save(user);

        String normalizedRole = user.getRole() != null ? user.getRole().toLowerCase() : "student";
        user.setRole(normalizedRole);
        user.setPassword(null); // Don't send password in response
        user.setOtp(null);

        return ResponseEntity.ok(
                new LoginResponse(true, "Email verified successfully", user)
        );
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<LoginResponse> resendOtp(@RequestParam String email) {
        if (email == null) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "Email is required", null));
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "User not found", null));
        }

        User user = userOpt.get();
        
        if (user.isEmailVerified()) {
            return ResponseEntity.status(400)
                    .body(new LoginResponse(false, "Email already verified", null));
        }

        // Generate new OTP
        String otp = emailService.generateOtp();
        long otpExpiryTime = System.currentTimeMillis() + (10 * 60 * 1000); // 10 minutes

        user.setOtp(otp);
        user.setOtpExpiryTime(otpExpiryTime);
        userRepository.save(user);

        // Send OTP email
        try {
            emailService.sendOtpEmail(email, otp);
        } catch (Exception e) {
            System.err.println("Failed to send OTP email: " + e.getMessage());
            return ResponseEntity.status(500)
                    .body(new LoginResponse(false, "Failed to send OTP email", null));
        }

        return ResponseEntity.ok(
                new LoginResponse(true, "OTP sent successfully", null)
        );
    }
}