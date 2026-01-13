package com.cloudBalance.service;

import com.cloudBalance.dto.AddUserRequest;
import com.cloudBalance.dto.UpdateUserRequest;
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

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       CloudAccountRepository cloudAccountRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.cloudAccountRepository = cloudAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // CREATE USER
    public void createUser(AddUserRequest req) {

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

        // ONLY CUSTOMER CAN HAVE ACCOUNTS
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

        userRepository.save(user);
    }

    // UPDATE USER
    public User updateUser(Long id, UpdateUserRequest req) {

        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String oldRole = existing.getRole().getName();
        String newRole = req.getRole();

        existing.setFirstName(req.getFirstName());
        existing.setLastName(req.getLastName());
        existing.setEmail(req.getEmail());
        existing.setIsActive(req.getIsActive());

        // Update password only if provided
        if (req.getPassword() != null && !req.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(req.getPassword()));
        }

        // Update role if changed
        if (newRole != null && !newRole.equals(oldRole)) {
            Role role = roleRepository.findByName(newRole)
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            existing.setRole(role);
        }

        // ACCOUNT HANDLING
        if ("CUSTOMER".equals(newRole)) {

            existing.getCloudAccounts().clear();

            if (req.getCloudAccountIds() != null && !req.getCloudAccountIds().isEmpty()) {

                List<CloudAccount> accounts =
                        cloudAccountRepository.findAllById(req.getCloudAccountIds());

                if (accounts.size() != req.getCloudAccountIds().size()) {
                    throw new RuntimeException("Invalid cloud account selection");
                }

                existing.getCloudAccounts().addAll(accounts);
            }

        } else {
            existing.getCloudAccounts().clear();
        }

        return userRepository.save(existing);
    }
}
