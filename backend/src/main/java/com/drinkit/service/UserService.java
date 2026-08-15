package com.drinkit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.drinkit.entity.User;
import com.drinkit.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register User
    public User register(User user) {

        if (repository.findByEmail(
                user.getEmail()
        ).isPresent()) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        if (repository.findByMobile(
                user.getMobile()
        ).isPresent()) {

            throw new RuntimeException(
                    "Mobile number already exists"
            );
        }

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        if (user.getRole() == null
                || user.getRole().isBlank()) {

            user.setRole("USER");
        }

        return repository.save(user);
    }

    // Get All Users
    public List<User> getAllUsers() {

        return repository.findAll();
    }

    // Get User By Id
    public User getUserById(Long id) {

        return repository.findById(id)
                .orElse(null);
    }

    // Delete User
    public String deleteUser(Long id) {

        User user =
                repository.findById(id)
                        .orElse(null);

        if (user == null) {

            return "User Not Found";
        }

        repository.delete(user);

        return "User Deleted Successfully";
    }
}