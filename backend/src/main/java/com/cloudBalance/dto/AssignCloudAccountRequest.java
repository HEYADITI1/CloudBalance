package com.cloudBalance.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignCloudAccountRequest {
    private Long userId;
    private Long cloudAccountId;
}
