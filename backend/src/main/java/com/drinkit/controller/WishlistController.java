package com.drinkit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.drinkit.entity.Wishlist;
import com.drinkit.service.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;


    // Get user's wishlist
    @GetMapping("/user/{userId}")
    public List<Wishlist> getUserWishlist(
            @PathVariable Long userId
    ) {

        return wishlistService
                .getUserWishlist(userId);
    }


    // Add product
    @PostMapping
    public Wishlist addToWishlist(
            @RequestParam Long userId,
            @RequestParam Long productId
    ) {

        return wishlistService.addToWishlist(
                userId,
                productId
        );
    }


    // Remove product
    @DeleteMapping
    public String removeFromWishlist(
            @RequestParam Long userId,
            @RequestParam Long productId
    ) {

        return wishlistService.removeFromWishlist(
                userId,
                productId
        );
    }


    // Check product
    @GetMapping("/check")
    public boolean isInWishlist(
            @RequestParam Long userId,
            @RequestParam Long productId
    ) {

        return wishlistService.isInWishlist(
                userId,
                productId
        );
    }
}