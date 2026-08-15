package com.drinkit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.drinkit.entity.User;
import com.drinkit.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService service;

    // Register User
    @PostMapping("/register")
    public User register(
            @RequestBody User user
    ) {

        return service.register(user);
    }

    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {

        return service.getAllUsers();
    }

    // Get User By Id
    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable Long id
    ) {

        return service.getUserById(id);
    }

    // Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id
    ) {

        return service.deleteUser(id);
    }
}