package com.cloudBalance.controller;

import com.cloudBalance.dto.CreateCloudAccountRequest;
import com.cloudBalance.model.CloudAccount;
import com.cloudBalance.repository.CloudAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cloud-accounts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CloudAccountController {

    private final CloudAccountRepository cloudAccountRepo;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createCloudAccount(
            @RequestBody CreateCloudAccountRequest req) {

        // 1. Basic validation
        if (req.getAccountId() == null || req.getAccountId().isBlank())
            return ResponseEntity.badRequest().body("Account ID is required");

        if (req.getAccountName() == null || req.getAccountName().isBlank())
            return ResponseEntity.badRequest().body("Account Name is required");

        if (req.getArn() == null || req.getArn().isBlank())
            return ResponseEntity.badRequest().body("ARN is required");

        // 2. Duplicate check
        if (cloudAccountRepo.findByAccountId(req.getAccountId()).isPresent())
            return ResponseEntity.badRequest().body("Cloud account already exists");

        // 3. Save
        CloudAccount account = CloudAccount.builder()
                .accountId(req.getAccountId())
                .accountName(req.getAccountName())
                .arn(req.getArn())
                .build();

        return ResponseEntity.ok(cloudAccountRepo.save(account));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY')")
    @GetMapping
    public ResponseEntity<?> getAllCloudAccounts() {
        return ResponseEntity.ok(cloudAccountRepo.findAll());
    }

}
