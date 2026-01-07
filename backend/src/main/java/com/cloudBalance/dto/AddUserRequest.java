package com.cloudBalance.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AddUserRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private Boolean isActive;

    private List<Long> cloudAccountIds;
}
