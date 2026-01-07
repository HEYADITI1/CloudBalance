package com.cloudBalance.config;

import com.cloudBalance.model.User;
import com.cloudBalance.repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.util.Collections;


import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().equals("/auth/login");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        System.out.println("\n============ JWT FILTER DEBUG ==============");
        System.out.println("REQUEST: " + request.getMethod() + " " + request.getServletPath());

        String header = request.getHeader("Authorization");
        System.out.println("AUTHORIZATION HEADER: " + header);

        String email = null;
        String token = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);

            try {
                email = jwtUtil.extractEmail(token);
                System.out.println("EXTRACTED EMAIL FROM TOKEN = " + email);
            } catch (Exception e) {
                System.out.println("❌ JWT parsing failed: " + e.getMessage());
            }
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepo.findByEmail(email).orElse(null);

            if (user != null) {
                String roleName = user.getRole().getName(); // ADMIN, READ_ONLY, CUSTOMER

                List<SimpleGrantedAuthority> authorities =
                        List.of(new SimpleGrantedAuthority("ROLE_" + roleName));

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                authorities
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        chain.doFilter(request, response);
    }
}

