package com.drinkit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.drinkit.entity.Product;
import com.drinkit.service.ProductService;

@RestController
@RequestMapping("/api/products")

public class ProductController {

    @Autowired
    private ProductService productService;


    // =========================================
    // ADD PRODUCT
    // =========================================

    @PostMapping
    public Product addProduct(
            @RequestBody Product product) {

        return productService.addProduct(product);
    }


    // =========================================
    // GET ALL PRODUCTS
    // =========================================

    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }


    // =========================================
    // GET TRENDING PRODUCTS
    // =========================================

    @GetMapping("/trending")
    public List<Product> getTrendingProducts() {

        return productService
                .getTrendingProducts();
    }


    // =========================================
    // GET RECOMMENDED PRODUCTS
    // =========================================

    @GetMapping("/recommended")
    public List<Product> getRecommendedProducts() {

        return productService
                .getRecommendedProducts();
    }


    // =========================================
    // GET PRODUCT BY ID
    // =========================================

    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id) {

        return productService
                .getProductById(id);
    }


    // =========================================
    // GET PRODUCTS BY CATEGORY
    // =========================================

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(
            @PathVariable String category) {

        return productService
                .getProductsByCategory(category);
    }


    // =========================================
    // SEARCH PRODUCTS
    // =========================================

    @GetMapping("/search/{keyword}")
    public List<Product> searchProducts(
            @PathVariable String keyword) {

        return productService
                .searchProducts(keyword);
    }


    // =========================================
    // UPDATE PRODUCT
    // =========================================

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return productService.updateProduct(
                id,
                product
        );
    }


    // =========================================
    // DELETE PRODUCT
    // =========================================

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        return productService
                .deleteProduct(id);
    }
}