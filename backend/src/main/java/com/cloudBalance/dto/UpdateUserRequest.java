package com.cloudBalance.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String role;      // ADMIN, READ_ONLY, CUSTOMER
    private Boolean isActive;
}
