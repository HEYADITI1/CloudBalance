package com.cloudBalance.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateCloudAccountRequest {

    @NotBlank(message = "Account ID is required")
    private String accountId;

    @NotBlank(message = "Account Name is required")
    private String accountName;

    @NotBlank(message = "ARN is required")
    private String arn;
}
