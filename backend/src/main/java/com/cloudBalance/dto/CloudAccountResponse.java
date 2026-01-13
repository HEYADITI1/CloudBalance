package com.cloudBalance.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CloudAccountResponse {

    private Long id;
    private String accountId;
    private String accountName;
    private String arn;
}
