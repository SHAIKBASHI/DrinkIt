package com.drinkit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.drinkit.entity.Product;

@Repository
public interface ProductRepository
        extends JpaRepository<Product, Long> {

    // Products by category
    List<Product> findByCategory(String category);

    // Products by availability
    List<Product> findByAvailable(Boolean available);

    // Search products by name
    List<Product> findByNameContainingIgnoreCase(
            String keyword
    );

    // Trending products
    List<Product> findByTrendingTrueAndAvailableTrue();

    // Recommended products
    List<Product> findByRecommendedTrueAndAvailableTrue();
}