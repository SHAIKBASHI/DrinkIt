package com.drinkit.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.drinkit.service.CustomUserDetailsService;
import com.drinkit.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");

        System.out.println(
                "JWT FILTER -> " +
                request.getMethod() +
                " " +
                request.getRequestURI()
        );

        System.out.println(
                "Authorization Header Present: " +
                (authorizationHeader != null)
        );

        String username = null;
        String token = null;

        // -----------------------------------------
        // Get JWT token
        // -----------------------------------------

        if (authorizationHeader != null
                && authorizationHeader.startsWith("Bearer ")) {

            token = authorizationHeader.substring(7);

            try {

                username =
                        jwtService.extractUsername(token);

                System.out.println(
                        "JWT Username: " + username
                );

            } catch (Exception e) {

                System.out.println(
                        "JWT extraction failed: " +
                        e.getMessage()
                );

                username = null;
            }
        }

        // -----------------------------------------
        // Authenticate user
        // -----------------------------------------

        if (username != null
                && SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {

            try {

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(username);

                boolean valid =
                        jwtService.validateToken(
                                token,
                                userDetails.getUsername()
                        );

                System.out.println(
                        "JWT Valid: " + valid
                );

                if (valid) {

                    UsernamePasswordAuthenticationToken
                            authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication
                            );

                    System.out.println(
                            "USER AUTHENTICATED: " +
                            userDetails.getUsername()
                    );
                }

            } catch (Exception e) {

                System.out.println(
                        "Authentication failed: " +
                        e.getMessage()
                );
            }
        }

        // -----------------------------------------
        // Continue request
        // -----------------------------------------

        filterChain.doFilter(
                request,
                response
        );
    }
}