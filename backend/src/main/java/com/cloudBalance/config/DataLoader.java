package com.cloudBalance.config;

import com.cloudBalance.model.Role;
import com.cloudBalance.model.User;
import com.cloudBalance.repository.RoleRepository;
import com.cloudBalance.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepo,
                                   RoleRepository roleRepo,
                                   PasswordEncoder encoder) {
        return args -> {

            // preload roles
            if (roleRepo.count() == 0) {
                roleRepo.save(new Role("ADMIN"));
                roleRepo.save(new Role("READ_ONLY"));
                roleRepo.save(new Role("CUSTOMER"));
            }

            // preload users
            if (userRepo.count() == 0) {

                Role adminRole = roleRepo.findByName("ADMIN").get();

                userRepo.save(new User(
                        "Aditi", "Bhadoria",
                        "aditi@cloudkeeper.com",
                        encoder.encode("password123"),
                        adminRole,
                        true
                ));

                userRepo.save(new User(
                        "Disha", "Kaushik",
                        "disha@cloudkeeper.com",
                        encoder.encode("password123"),
                        adminRole,
                        true
                ));
            }
        };
    }
}
