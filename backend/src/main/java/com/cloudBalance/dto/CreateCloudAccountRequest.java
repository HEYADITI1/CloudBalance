package com.cloudBalance.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateCloudAccountRequest {

    private String accountId;     // from onboarding UI
    private String accountName;   // from onboarding UI
    private String arn;           // from onboarding UI
}
