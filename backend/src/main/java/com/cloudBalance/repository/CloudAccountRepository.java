package com.cloudBalance.repository;

import com.cloudBalance.model.CloudAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CloudAccountRepository extends JpaRepository<CloudAccount, Long> {
    Optional<CloudAccount> findByAccountId(String accountId);
}
