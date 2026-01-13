package com.cloudBalance.mapper;

import com.cloudBalance.dto.CloudAccountResponse;
import com.cloudBalance.dto.UserResponse;
import com.cloudBalance.model.User;

import java.util.stream.Collectors;

public class UserMapper {

    public static UserResponse toResponse(User u) {
        if (u == null) return null;

        UserResponse res = new UserResponse();
        res.setId(u.getId());
        res.setFirstName(u.getFirstName());
        res.setLastName(u.getLastName());
        res.setEmail(u.getEmail());
        res.setRole(u.getRole().getName());
        res.setIsActive(u.getIsActive());
        res.setLastLogin(u.getLastLogin());

        if (u.getCloudAccounts() != null) {
            res.setCloudAccounts(
                    u.getCloudAccounts()
                            .stream()
                            .map(acc -> {
                                CloudAccountResponse a = new CloudAccountResponse();
                                a.setId(acc.getId());
                                a.setAccountId(acc.getAccountId());
                                a.setAccountName(acc.getAccountName());
                                a.setArn(acc.getArn());
                                return a;
                            })
                            .collect(Collectors.toList())
            );
        }

        return res;
    }
}
