package com.cloudBalance.controller;

import com.cloudBalance.dto.CloudAccountResponse;
import com.cloudBalance.dto.CreateCloudAccountRequest;
import com.cloudBalance.service.CloudAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;


import java.util.List;

@RestController
@RequestMapping("/api/cloud-accounts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CloudAccountController {

    private final CloudAccountService cloudAccountService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CloudAccountResponse> createCloudAccount(
            @Valid @RequestBody CreateCloudAccountRequest req) {
        return ResponseEntity.status(201).body(cloudAccountService.create(req));
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY')")
    @GetMapping
    public ResponseEntity<List<CloudAccountResponse>> getAllCloudAccounts() {
        return ResponseEntity.ok(cloudAccountService.getAll());
    }
}
