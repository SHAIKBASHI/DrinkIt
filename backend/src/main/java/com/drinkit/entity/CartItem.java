package com.drinkit.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private Long cartId;


    @Column(nullable = false)
    private Long productId;


    @Column(nullable = false)
    private String productName;


    @Column(nullable = false)
    private Double price;


    @Column(nullable = false)
    private Integer quantity;


    @Column(nullable = false)
    private Double totalPrice;


    /*
     * Product images can be Base64 strings.
     *
     * Base64 images can be much larger than
     * the default VARCHAR size.
     *
     * Therefore use LONGTEXT here.
     */
    @Column(columnDefinition = "LONGTEXT")
    private String image;


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public CartItem() {
    }


    // =========================================================
    // GETTERS AND SETTERS
    // =========================================================

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public Long getCartId() {
        return cartId;
    }


    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }


    public Long getProductId() {
        return productId;
    }


    public void setProductId(Long productId) {
        this.productId = productId;
    }


    public String getProductName() {
        return productName;
    }


    public void setProductName(String productName) {
        this.productName = productName;
    }


    public Double getPrice() {
        return price;
    }


    public void setPrice(Double price) {
        this.price = price;
    }


    public Integer getQuantity() {
        return quantity;
    }


    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }


    public Double getTotalPrice() {
        return totalPrice;
    }


    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }


    public String getImage() {
        return image;
    }


    public void setImage(String image) {
        this.image = image;
    }

}