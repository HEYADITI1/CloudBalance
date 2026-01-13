package com.cloudBalance.service;

import com.cloudBalance.dto.AddUserRequest;
import com.cloudBalance.dto.UpdateUserRequest;
import com.cloudBalance.dto.UserResponse;
import com.cloudBalance.mapper.UserMapper;
import com.cloudBalance.model.CloudAccount;
import com.cloudBalance.model.Role;
import com.cloudBalance.model.User;
import com.cloudBalance.repository.CloudAccountRepository;
import com.cloudBalance.repository.RoleRepository;
import com.cloudBalance.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CloudAccountRepository cloudAccountRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ FIXED CONSTRUCTOR
    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            CloudAccountRepository cloudAccountRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.cloudAccountRepository = cloudAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // GET ALL USERS
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toResponse)
                .toList();
    }

    // GET USER BY ID
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.toResponse(user);
    }

    // CREATE USER
    public UserResponse createUser(AddUserRequest req) {

        Role role = roleRepository.findByName(req.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User(
                req.getFirstName(),
                req.getLastName(),
                req.getEmail(),
                passwordEncoder.encode(req.getPassword()),
                role,
                req.getIsActive()
        );

        if ("CUSTOMER".equals(req.getRole())) {
            if (req.getCloudAccountIds() != null && !req.getCloudAccountIds().isEmpty()) {
                List<CloudAccount> accounts =
                        cloudAccountRepository.findAllById(req.getCloudAccountIds());

                if (accounts.size() != req.getCloudAccountIds().size()) {
                    throw new RuntimeException("Invalid cloud account selection");
                }

                user.getCloudAccounts().addAll(accounts);
            }
        }

        User saved = userRepository.save(user);
        return UserMapper.toResponse(saved);
    }

    // UPDATE USER
    public UserResponse updateUser(Long id, UpdateUserRequest req) {

        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setFirstName(req.getFirstName());
        existing.setLastName(req.getLastName());
        existing.setEmail(req.getEmail());
        existing.setIsActive(req.getIsActive());

        if (req.getPassword() != null && !req.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(req.getPassword()));
        }

        if (req.getRole() != null) {
            Role role = roleRepository.findByName(req.getRole())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            existing.setRole(role);
        }

        if ("CUSTOMER".equals(req.getRole())) {
            existing.getCloudAccounts().clear();
            if (req.getCloudAccountIds() != null) {
                existing.getCloudAccounts().addAll(
                        cloudAccountRepository.findAllById(req.getCloudAccountIds())
                );
            }
        } else {
            existing.getCloudAccounts().clear();
        }

        User saved = userRepository.save(existing);
        return UserMapper.toResponse(saved);
    }
}
