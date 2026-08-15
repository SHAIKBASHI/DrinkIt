package com.drinkit.controller;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.drinkit.service.AuthService;
import com.drinkit.service.AuthService.AuthResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request
    ) {

        AuthResponse response =
                authService.register(
                        request.getFullName(),
                        request.getEmail(),
                        request.getPassword(),
                        request.getMobile()
                );

        return ResponseEntity.ok(response);
    }
    @PutMapping("/profile")
    public ResponseEntity<AuthResponse> updateProfile(
            @RequestBody ProfileUpdateRequest request,
            Authentication authentication
    ) {

        String currentEmail =
                authentication.getName();

        AuthResponse response =
                authService.updateProfile(
                        currentEmail,
                        request.getFullName(),
                        request.getEmail()
                );

        return ResponseEntity.ok(response);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request
    ) {

        AuthResponse response =
                authService.login(
                        request.getEmail(),
                        request.getPassword()
                );

        return ResponseEntity.ok(response);
    }
    public static class ProfileUpdateRequest {

        private String fullName;
        private String email;

        public ProfileUpdateRequest() {
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    // Register Request
    public static class RegisterRequest {

        private String fullName;
        private String email;
        private String password;
        private String mobile;

        public RegisterRequest() {
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getMobile() {
            return mobile;
        }

        public void setMobile(String mobile) {
            this.mobile = mobile;
        }
    }

    // Login Request
    public static class LoginRequest {

        private String email;
        private String password;

        public LoginRequest() {
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}