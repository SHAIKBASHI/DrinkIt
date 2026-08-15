package com.drinkit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.drinkit.entity.Cart;
import com.drinkit.entity.CartItem;
import com.drinkit.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService service;

    // Create Cart for User
    @PostMapping("/create/{userId}")
    public Cart createCart(@PathVariable Long userId) {

        return service.createCart(userId);

    }

    // Add Product to Cart
    @PostMapping("/add")
    public CartItem addProduct(@RequestBody CartItem cartItem) {

        return service.addProduct(cartItem);

    }

    // Get All Cart Items
    @GetMapping
    public List<CartItem> getAllCartItems() {

        return service.getAllCartItems();

    }

    // Get Cart Items By Cart Id
    @GetMapping("/{cartId}")
    public List<CartItem> getCartItems(@PathVariable Long cartId) {

        return service.getCartItems(cartId);

    }

    // Update Quantity
    @PutMapping("/update/{id}/{quantity}")
    public CartItem updateQuantity(@PathVariable Long id,
                                   @PathVariable Integer quantity) {

        return service.updateQuantity(id, quantity);

    }

    // Delete Cart Item
    @DeleteMapping("/delete/{id}")
    public String deleteCartItem(@PathVariable Long id) {

        return service.deleteCartItem(id);

    }

    // Clear Cart
    @DeleteMapping("/clear/{cartId}")
    public String clearCart(@PathVariable Long cartId) {

        return service.clearCart(cartId);

    }

    // Calculate Total Amount
    @GetMapping("/total/{cartId}")
    public Double calculateTotal(@PathVariable Long cartId) {

        return service.calculateTotal(cartId);

    }

}