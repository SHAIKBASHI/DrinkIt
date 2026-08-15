package com.drinkit.service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.drinkit.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final Key key;

    private static final long EXPIRATION_TIME =
            1000L * 60 * 60 * 24;

    public JwtService(
            @Value("${JWT_SECRET}") String secret
    ) {

        this.key = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
    }


    // =========================================
    // Generate Token
    // =========================================

    public String generateToken(User user) {

        return Jwts.builder()

                .subject(user.getUsername())

                .claim("userId", user.getId())

                .claim("role", user.getRole())

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )

                .signWith(key)

                .compact();
    }


    // =========================================
    // Extract Username
    // =========================================

    public String extractUsername(String token) {

        Claims claims =
                Jwts.parser()

                        .verifyWith(
                                (javax.crypto.SecretKey) key
                        )

                        .build()

                        .parseSignedClaims(token)

                        .getPayload();

        return claims.getSubject();
    }


    // =========================================
    // Validate Token
    // =========================================

    public boolean validateToken(
            String token,
            String username
    ) {

        try {

            Claims claims =
                    Jwts.parser()

                            .verifyWith(
                                    (javax.crypto.SecretKey) key
                            )

                            .build()

                            .parseSignedClaims(token)

                            .getPayload();

            String extractedUsername =
                    claims.getSubject();

            Date expiration =
                    claims.getExpiration();

            return extractedUsername.equals(username)
                    && expiration.after(new Date());

        } catch (Exception e) {

            System.out.println(
                    "JWT validation error: "
                            + e.getMessage()
            );

            return false;
        }
    }
}