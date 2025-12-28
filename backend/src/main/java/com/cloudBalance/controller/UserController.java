package com.cloudBalance.controller;

import com.cloudBalance.model.Role;
import com.cloudBalance.model.User;
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


    public UserController(UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
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

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User created"));
    }


    // UPDATE user
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateUserRequest req
    ) {
        return userRepository.findById(id)
                .map(existing -> {

                    existing.setFirstName(req.getFirstName());
                    existing.setLastName(req.getLastName());
                    existing.setEmail(req.getEmail());
                    existing.setIsActive(req.getIsActive());

                    if (req.getRole() != null) {
                        Role role = roleRepository.findByName(req.getRole())
                                .orElseThrow(() -> new RuntimeException("Role not found"));
                        existing.setRole(role);
                    }

                    return ResponseEntity.ok(userRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE user
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
