package com.drinkit.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

            // Disable CSRF because we are using JWT
            .csrf(csrf -> csrf.disable())

            // Enable CORS
            .cors(Customizer.withDefaults())

            // JWT = stateless
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // =========================================
            // AUTHORIZATION
            // =========================================
            .authorizeHttpRequests(auth -> auth

                // -------------------------------
                // Authentication
                // -------------------------------
            		.requestMatchers(
            			    "/api/auth/login",
            			    "/api/auth/register"
            			).permitAll()

            			.requestMatchers(
            			    HttpMethod.PUT,
            			    "/api/auth/profile"
            			).authenticated()


                // -------------------------------
                // Products
                // GET = public
                // POST/PUT/DELETE = ADMIN
                // -------------------------------
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/products",
                    "/api/products/**"
                ).permitAll()

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/products",
                    "/api/products/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/products/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/products/**"
                ).hasRole("ADMIN")


                // -------------------------------
                // Categories
                // GET = public
                // POST/PUT/DELETE = ADMIN
                // -------------------------------
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/categories",
                    "/api/categories/**"
                ).permitAll()

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/categories",
                    "/api/categories/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/categories/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/categories/**"
                ).hasRole("ADMIN")


                // -------------------------------
                // Cart
                // -------------------------------
                .requestMatchers(
                    "/api/cart",
                    "/api/cart/**"
                ).authenticated()


                // -------------------------------
                // Addresses
                // -------------------------------
                .requestMatchers(
                    "/api/addresses",
                    "/api/addresses/**"
                ).authenticated()


                // -------------------------------
                // Wishlist
                // -------------------------------
                .requestMatchers(
                    "/api/wishlist",
                    "/api/wishlist/**"
                ).authenticated()


                // -------------------------------
                // Orders
                // -------------------------------
                .requestMatchers(
                    "/api/orders",
                    "/api/orders/**"
                ).authenticated()


                // -------------------------------
                // Payments
                // -------------------------------
                .requestMatchers(
                    "/api/payments",
                    "/api/payments/**"
                ).authenticated()


                // -------------------------------
                // Everything else
                // -------------------------------
                .anyRequest().authenticated()
            )


            // JWT filter
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );


        return http.build();
    }


    // =========================================
    // AUTHENTICATION MANAGER
    // =========================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }


    // =========================================
    // CORS
    // =========================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
            List.of(
    "http://localhost:5173",
    "https://drink-it-five.vercel.app"
)
        );

        configuration.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
            )
        );

        configuration.setAllowedHeaders(
            List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }
}