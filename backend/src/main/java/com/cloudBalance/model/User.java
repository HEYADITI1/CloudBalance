package com.cloudBalance.model;
import com.cloudBalance.model.Role;
import org.springframework.security.crypto.password.PasswordEncoder;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    private Boolean isActive = true;

    private String lastLogin;

    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * Many-to-Many mapping with CloudAccount
     * Supports:
     * - Orphan accounts
     * - Shared accounts
     */
    @ManyToMany
    @JoinTable(
            name = "user_cloud_accounts",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "cloud_account_id")
    )
    private Set<CloudAccount> cloudAccounts = new HashSet<>();

    /**
     * Convenience constructor
     * IMPORTANT: Accepts Role entity (not String)
     */
    public User(String firstName,
                String lastName,
                String email,
                String password,
                Role role,
                Boolean isActive) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
    }
}