package com.cloudBalance.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class UserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private Boolean isActive;
    private LocalDateTime lastLogin;

    private List<CloudAccountResponse> cloudAccounts;
}
