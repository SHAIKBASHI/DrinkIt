package com.drinkit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.drinkit.entity.Product;
import com.drinkit.entity.Wishlist;
import com.drinkit.repository.ProductRepository;
import com.drinkit.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;


    // Get user's wishlist
    public List<Wishlist> getUserWishlist(Long userId) {

        return wishlistRepository.findByUserId(userId);
    }


    // Add product to wishlist
    public Wishlist addToWishlist(
            Long userId,
            Long productId
    ) {

        // Check whether already exists
        if (wishlistRepository
                .findByUserIdAndProductId(
                        userId,
                        productId
                )
                .isPresent()) {

            throw new RuntimeException(
                    "Product already exists in wishlist"
            );
        }


        // Find product
        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found"
                                )
                        );


        Wishlist wishlist =
                new Wishlist();

        wishlist.setUserId(userId);
        wishlist.setProductId(product.getId());
        wishlist.setProductName(product.getName());
        wishlist.setPrice(product.getPrice());
        wishlist.setImage(product.getImage());
        wishlist.setCategory(product.getCategory());


        return wishlistRepository.save(wishlist);
    }


    // Remove wishlist item
    public String removeFromWishlist(
            Long userId,
            Long productId
    ) {

        Wishlist wishlist =
                wishlistRepository
                        .findByUserIdAndProductId(
                                userId,
                                productId
                        )
                        .orElse(null);


        if (wishlist == null) {

            return "Product not found in wishlist";
        }


        wishlistRepository.delete(wishlist);

        return "Product removed from wishlist";
    }


    // Check wishlist
    public boolean isInWishlist(
            Long userId,
            Long productId
    ) {

        return wishlistRepository
                .findByUserIdAndProductId(
                        userId,
                        productId
                )
                .isPresent();
    }
}