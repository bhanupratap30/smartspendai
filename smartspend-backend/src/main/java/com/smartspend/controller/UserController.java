package com.smartspend.controller;

import com.smartspend.model.User;
import com.smartspend.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public User getProfile() {

        return userRepository.findAll().get(0);
    }

    @PutMapping("/profile")
    public User updateProfile(
            @RequestBody User updatedUser
    ) {

        User user = userRepository.findAll().get(0);

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());
        user.setLocation(updatedUser.getLocation());
        user.setBio(updatedUser.getBio());

        return userRepository.save(user);
    }
}