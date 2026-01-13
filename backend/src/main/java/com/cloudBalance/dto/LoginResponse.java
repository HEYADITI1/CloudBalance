package com.cloudBalance.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private Boolean isActive;
}
