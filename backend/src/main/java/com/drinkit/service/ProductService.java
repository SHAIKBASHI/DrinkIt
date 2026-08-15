package com.drinkit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.drinkit.entity.Product;
import com.drinkit.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    // =========================================
    // ADD PRODUCT
    // =========================================

    public Product addProduct(Product product) {

        if (product.getRating() == null) {
            product.setRating(0.0);
        }

        if (product.getAvailable() == null) {
            product.setAvailable(true);
        }

        if (product.getTrending() == null) {
            product.setTrending(false);
        }

        if (product.getRecommended() == null) {
            product.setRecommended(false);
        }

        return productRepository.save(product);
    }


    // =========================================
    // GET ALL PRODUCTS
    // =========================================

    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }


    // =========================================
    // GET PRODUCT BY ID
    // =========================================

    public Product getProductById(Long id) {

        return productRepository
                .findById(id)
                .orElse(null);
    }


    // =========================================
    // GET PRODUCTS BY CATEGORY
    // =========================================

    public List<Product> getProductsByCategory(
            String category) {

        return productRepository
                .findByCategory(category);
    }


    // =========================================
    // SEARCH PRODUCTS
    // =========================================

    public List<Product> searchProducts(
            String keyword) {

        return productRepository
                .findByNameContainingIgnoreCase(keyword);
    }


    // =========================================
    // GET TRENDING PRODUCTS
    // =========================================

    public List<Product> getTrendingProducts() {

        return productRepository
                .findByTrendingTrueAndAvailableTrue();
    }


    // =========================================
    // GET RECOMMENDED PRODUCTS
    // =========================================

    public List<Product> getRecommendedProducts() {

        return productRepository
                .findByRecommendedTrueAndAvailableTrue();
    }


    // =========================================
    // UPDATE PRODUCT
    // =========================================

    public Product updateProduct(
            Long id,
            Product product) {

        Product existing =
                productRepository
                        .findById(id)
                        .orElse(null);

        if (existing == null) {
            return null;
        }


        existing.setName(
                product.getName()
        );

        existing.setDescription(
                product.getDescription()
        );

        existing.setCategory(
                product.getCategory()
        );

        existing.setVolume(
                product.getVolume()
        );

        existing.setPrice(
                product.getPrice()
        );

        existing.setStock(
                product.getStock()
        );

        existing.setImage(
                product.getImage()
        );


        existing.setRating(
                product.getRating() == null
                        ? 0.0
                        : product.getRating()
        );


        existing.setOffer(
                product.getOffer()
        );


        existing.setTrending(
                product.getTrending() != null
                        && product.getTrending()
        );


        existing.setRecommended(
                product.getRecommended() != null
                        && product.getRecommended()
        );


        existing.setAvailable(
                product.getAvailable() == null
                        || product.getAvailable()
        );


        return productRepository.save(existing);
    }


    // =========================================
    // DELETE PRODUCT
    // =========================================

    public String deleteProduct(Long id) {

        Product existing =
                productRepository
                        .findById(id)
                        .orElse(null);

        if (existing == null) {

            return "Product Not Found";
        }

        productRepository.delete(existing);

        return "Product Deleted Successfully";
    }
}