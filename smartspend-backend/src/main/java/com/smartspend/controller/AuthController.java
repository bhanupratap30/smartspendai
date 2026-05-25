package com.smartspend.controller;

import com.smartspend.dto.AuthResponse;
import com.smartspend.dto.ForgotPasswordRequest;
import com.smartspend.dto.LoginRequest;
import com.smartspend.dto.RegisterRequest;
import com.smartspend.dto.ResetPasswordRequest;
import com.smartspend.dto.UserResponse;
import com.smartspend.model.User;
import com.smartspend.repository.UserRepository;
import com.smartspend.service.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    // CONSTRUCTOR
    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // REGISTER API
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {

        // CHECK EMAIL EXISTS
        if (userRepository.findByEmail(
                request.getEmail()
        ).isPresent()) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message",
                            "Email already exists"
                    )
            );
        }

        // CREATE USER
        User user = new User();

        user.setName(
                request.getName()
        );

        user.setEmail(
                request.getEmail()
        );

        // ENCODE PASSWORD
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setRole("USER");

        // SAVE USER
        userRepository.save(user);

        // GENERATE JWT TOKEN
        String token = jwtService.generateToken(
                user.getEmail()
        );

        // RETURN RESPONSE
        return ResponseEntity.ok(
                new AuthResponse(
                        token,
                        new UserResponse(
                                user.getId(),
                                user.getName(),
                                user.getEmail(),
                                user.getRole()
                        )
                )
        );
    }

    // LOGIN API
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        // FIND USER
        User user = userRepository
                .findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email"
                        )
                );

        // CHECK PASSWORD
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid password"
            );
        }

        // GENERATE TOKEN
        String token = jwtService.generateToken(
                user.getEmail()
        );

        // RETURN RESPONSE
        return ResponseEntity.ok(
                new AuthResponse(
                        token,
                        new UserResponse(
                                user.getId(),
                                user.getName(),
                                user.getEmail(),
                                user.getRole()
                        )
                )
        );
    }

    // FORGOT PASSWORD API
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody ForgotPasswordRequest request
    ) {

        // FIND USER
        User user = userRepository
                .findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        // GENERATE RESET TOKEN
        String token = UUID.randomUUID().toString();

        // SAVE TOKEN
        user.setResetToken(token);

        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Reset token generated",
                        "resetToken",
                        token
                )
        );
    }

    // RESET PASSWORD API
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request
    ) {

        // FIND USER USING TOKEN
        User user = userRepository
                .findByResetToken(
                        request.getToken()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid token"
                        )
                );

        // UPDATE PASSWORD
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // REMOVE RESET TOKEN
        user.setResetToken(null);

        // SAVE USER
        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Password updated successfully"
                )
        );
    }

    // CURRENT USER API
    @GetMapping("/me")
    public ResponseEntity<?> me() {

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Authenticated user"
                )
        );
    }
}