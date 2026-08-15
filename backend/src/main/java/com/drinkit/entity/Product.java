package com.drinkit.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String category;

    private String volume;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer stock;

    @Column(columnDefinition = "LONGTEXT")
    private String image;

    private Double rating;

    private String offer;

    @Column(nullable = false)
    private Boolean available = true;

    /*
     * If true, product appears in
     * Trending Products section.
     */
    @Column(nullable = false)
    private Boolean trending = false;

    /*
     * If true, product appears in
     * Recommended For You section.
     */
    @Column(nullable = false)
    private Boolean recommended = false;


    // ==============================
    // CONSTRUCTOR
    // ==============================

    public Product() {
    }


    // ==============================
    // ID
    // ==============================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // ==============================
    // NAME
    // ==============================

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    // ==============================
    // DESCRIPTION
    // ==============================

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    // ==============================
    // CATEGORY
    // ==============================

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    // ==============================
    // VOLUME
    // ==============================

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }


    // ==============================
    // PRICE
    // ==============================

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }


    // ==============================
    // STOCK
    // ==============================

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }


    // ==============================
    // IMAGE
    // ==============================

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    // ==============================
    // RATING
    // ==============================

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }


    // ==============================
    // OFFER
    // ==============================

    public String getOffer() {
        return offer;
    }

    public void setOffer(String offer) {
        this.offer = offer;
    }


    // ==============================
    // AVAILABLE
    // ==============================

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }


    // ==============================
    // TRENDING
    // ==============================

    public Boolean getTrending() {
        return trending;
    }

    public void setTrending(Boolean trending) {
        this.trending = trending;
    }


    // ==============================
    // RECOMMENDED
    // ==============================

    public Boolean getRecommended() {
        return recommended;
    }

    public void setRecommended(Boolean recommended) {
        this.recommended = recommended;
    }
}