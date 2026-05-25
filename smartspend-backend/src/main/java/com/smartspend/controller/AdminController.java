package com.smartspend.controller;

import com.smartspend.model.User;
import com.smartspend.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final UserRepository userRepository;

    // CONSTRUCTOR
    public AdminController(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    // GET ALL USERS
    @GetMapping("/users")
    public List<User> getUsers() {

        return userRepository.findAll();
    }

    // UPDATE USER STATUS
    @PutMapping("/users/{id}/status")
    public User updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body
    ) {

        User user = userRepository
                .findById(id)
                .orElseThrow();

        user.setStatus(
                body.get("status")
        );

        return userRepository.save(user);
    }

    // ADMIN DASHBOARD STATS
    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        List<User> users = userRepository.findAll();

        long totalUsers = users.size();

        long activeUsers = users.stream()
                .filter(u ->
                        !"suspended".equals(u.getStatus())
                )
                .count();

        long suspendedUsers = users.stream()
                .filter(u ->
                        "suspended".equals(u.getStatus())
                )
                .count();

        long adminUsers = users.stream()
                .filter(u ->
                        "ADMIN".equals(u.getRole())
                )
                .count();

        return Map.of(
                "totalUsers", totalUsers,
                "activeUsers", activeUsers,
                "suspendedUsers", suspendedUsers,
                "adminUsers", adminUsers
        );
    }
}