package com.cloudBalance.controller;

import com.cloudBalance.model.CloudAccount;
import com.cloudBalance.model.Role;
import com.cloudBalance.model.User;
import com.cloudBalance.repository.CloudAccountRepository;
import com.cloudBalance.repository.RoleRepository;
import com.cloudBalance.repository.UserRepository;
import com.cloudBalance.dto.AddUserRequest;
import com.cloudBalance.dto.UpdateUserRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final CloudAccountRepository cloudAccountRepository;


    public UserController(UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder,CloudAccountRepository cloudAccountRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.cloudAccountRepository = cloudAccountRepository;
    }

    // GET all users
    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY')")
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE user
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody AddUserRequest req) {

        Role role = roleRepository.findByName(req.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User(
                req.getFirstName(),
                req.getLastName(),
                req.getEmail(),
                passwordEncoder.encode("default123"),
                role,
                req.getIsActive()
        );

        // ONLY CUSTOMER CAN HAVE ACCOUNTS
        if ("CUSTOMER".equals(req.getRole())) {

            if (req.getCloudAccountIds() != null && !req.getCloudAccountIds().isEmpty()) {

                List<CloudAccount> accounts =
                        cloudAccountRepository.findAllById(req.getCloudAccountIds());

                if (accounts.size() != req.getCloudAccountIds().size()) {
                    return ResponseEntity.badRequest()
                            .body("Invalid cloud account selection");
                }

                user.getCloudAccounts().addAll(accounts);
            }
        }

        // ADMIN / READ_ONLY → accounts always empty
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User created successfully"));
    }




    // UPDATE user
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest req
    ) {
        return userRepository.findById(id).map(existing -> {

            String oldRole = existing.getRole().getName();
            String newRole = req.getRole();

            existing.setFirstName(req.getFirstName());
            existing.setLastName(req.getLastName());
            existing.setEmail(req.getEmail());
            existing.setIsActive(req.getIsActive());

            // Update role if provided
            if (newRole != null && !newRole.equals(oldRole)) {
                Role role = roleRepository.findByName(newRole)
                        .orElseThrow(() -> new RuntimeException("Role not found"));
                existing.setRole(role);
            }

            // ACCOUNT HANDLING LOGIC
            if ("CUSTOMER".equals(newRole)) {

                // Optional account assignment
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
                // Role changed to ADMIN / READ_ONLY
                existing.getCloudAccounts().clear();
            }

            return ResponseEntity.ok(userRepository.save(existing));

        }).orElse(ResponseEntity.notFound().build());
    }


}
