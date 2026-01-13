package com.cloudBalance.service;

import com.cloudBalance.dto.LoginResponse;
import com.cloudBalance.exception.UnauthorizedException;
import com.cloudBalance.model.User;
import com.cloudBalance.repository.UserRepository;
import com.cloudBalance.config.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepo,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(String email, String rawPassword) {

        if (email == null || rawPassword == null) {
            throw new UnauthorizedException("Email or password missing");
        }

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new UnauthorizedException("User is inactive");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().getName()
        );

        user.setLastLogin(LocalDateTime.now());
        userRepo.save(user);

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().getName(),
                user.getIsActive()
        );
    }
}
