package com.cloudBalance.service;

import com.cloudBalance.dto.CloudAccountResponse;
import com.cloudBalance.dto.CreateCloudAccountRequest;
import com.cloudBalance.model.CloudAccount;
import com.cloudBalance.repository.CloudAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.cloudBalance.exception.BadRequestException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CloudAccountService {

    private final CloudAccountRepository cloudAccountRepo;

    public CloudAccountResponse create(CreateCloudAccountRequest req) {

        if (req.getAccountId() == null || req.getAccountId().isBlank())
            throw new BadRequestException("Account ID is required");


        if (req.getAccountName() == null || req.getAccountName().isBlank())
            throw new RuntimeException("Account Name is required");

        if (req.getArn() == null || req.getArn().isBlank())
            throw new RuntimeException("ARN is required");

        if (cloudAccountRepo.findByAccountId(req.getAccountId()).isPresent())
            throw new BadRequestException("Cloud account already exists");

        CloudAccount account = CloudAccount.builder()
                .accountId(req.getAccountId())
                .accountName(req.getAccountName())
                .arn(req.getArn())
                .build();

        return toResponse(cloudAccountRepo.save(account));
    }

    public List<CloudAccountResponse> getAll() {
        return cloudAccountRepo.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private CloudAccountResponse toResponse(CloudAccount a) {
        CloudAccountResponse r = new CloudAccountResponse();
        r.setId(a.getId());
        r.setAccountId(a.getAccountId());
        r.setAccountName(a.getAccountName());
        r.setArn(a.getArn());
        return r;
    }
}
