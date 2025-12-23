package com.cloudBalance.service;

import com.cloudBalance.model.User;
import com.cloudBalance.repository.UserRepository;
import com.cloudBalance.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Object login(String email, String rawPassword) {

        // 1. Validate input
        if (email == null || rawPassword == null) {
            return Map.of("error", "Email or password missing");
        }

        // 2. Fetch user from DB
        User user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            return Map.of("error", "User not found");
        }

        // 3. Validate password
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            return Map.of("error", "Invalid credentials");
        }

        // 4. Generate JWT Token
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().getName()
        );

        // 5. Successful login response
        return Map.of(
                "token", token,
                "email", user.getEmail(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName(),
                "role", user.getRole().getName(),
                "isActive", user.getIsActive()
        );
    }
}
