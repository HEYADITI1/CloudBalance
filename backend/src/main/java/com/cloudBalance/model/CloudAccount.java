package com.cloudBalance.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "cloud_accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CloudAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_id", nullable = false, unique = true)
    private String accountId;

    @Column(name = "account_name", nullable = false)
    private String accountName;

    @Column(nullable = false)
    private String arn;

//    @Column(nullable = false)
//    private String provider;
//
//    @Column(name = "is_active")
//    private Boolean isActive = true;

    private LocalDateTime createdAt = LocalDateTime.now();
}
