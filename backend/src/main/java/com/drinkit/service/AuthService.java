package com.drinkit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.drinkit.entity.User;
import com.drinkit.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    // Register
    public AuthResponse register(
            String fullName,
            String email,
            String password,
            String mobile
    ) {

        if (userRepository.findByEmail(email).isPresent()) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        if (userRepository.findByMobile(mobile).isPresent()) {

            throw new RuntimeException(
                    "Mobile number already exists"
            );
        }

        User user = new User();

        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(
                passwordEncoder.encode(password)
        );
        user.setMobile(mobile);
        user.setRole("USER");

        User savedUser =
                userRepository.save(user);

        String token =
                jwtService.generateToken(savedUser);

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getMobile(),
                savedUser.getRole()
        );
    }

    // Login
    public AuthResponse login(
            String email,
            String password
    ) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                password
                        )
                );

        User user =
                (User) authentication.getPrincipal();

        String token =
                jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getMobile(),
                user.getRole()
        );
    }
    public AuthResponse updateProfile(
            String currentEmail,
            String fullName,
            String newEmail
    ) {

        // Find currently logged-in user
        User user = userRepository
                .findByEmail(currentEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        // Check if new email belongs to another user
        if (!newEmail.equalsIgnoreCase(currentEmail)) {

            if (userRepository.findByEmail(newEmail).isPresent()) {

                throw new RuntimeException(
                        "Email already exists"
                );
            }
        }

        // Update name
        user.setFullName(fullName);

        // Update email
        user.setEmail(newEmail);

        // Save changes to database
        User updatedUser =
                userRepository.save(user);

        // IMPORTANT:
        // Generate new JWT using new email
        String newToken =
                jwtService.generateToken(updatedUser);

        return new AuthResponse(
                newToken,
                updatedUser.getId(),
                updatedUser.getFullName(),
                updatedUser.getEmail(),
                updatedUser.getMobile(),
                updatedUser.getRole()
        );
    }

    // Response class
    public static class AuthResponse {

        private String token;
        private Long userId;
        private String fullName;
        private String email;
        private String mobile;
        private String role;

        public AuthResponse() {
        }

        public AuthResponse(
                String token,
                Long userId,
                String fullName,
                String email,
                String mobile,
                String role
        ) {

            this.token = token;
            this.userId = userId;
            this.fullName = fullName;
            this.email = email;
            this.mobile = mobile;
            this.role = role;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
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

        public String getMobile() {
            return mobile;
        }

        public void setMobile(String mobile) {
            this.mobile = mobile;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}