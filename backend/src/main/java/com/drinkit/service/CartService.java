package com.drinkit.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.drinkit.entity.Cart;
import com.drinkit.entity.CartItem;
import com.drinkit.repository.CartItemRepository;
import com.drinkit.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;


    // Create Cart for User
    public Cart createCart(Long userId) {

        Optional<Cart> existingCart =
                cartRepository.findByUserId(userId);

        if (existingCart.isPresent()) {
            return existingCart.get();
        }

        Cart cart = new Cart();

        cart.setUserId(userId);

        return cartRepository.save(cart);
    }


    // Add Product to Cart
 // Add Product to Cart
    public CartItem addProduct(CartItem cartItem) {

        Optional<Cart> cart =
                cartRepository.findById(cartItem.getCartId());

        if (cart.isEmpty()) {
            return null;
        }

        // Check if product already exists in this cart
        List<CartItem> existingItems =
                cartItemRepository.findByCartId(cartItem.getCartId());

        for (CartItem existingItem : existingItems) {

            if (existingItem.getProductId()
                    .equals(cartItem.getProductId())) {

                existingItem.setQuantity(
                        existingItem.getQuantity()
                                + cartItem.getQuantity()
                );

                existingItem.setTotalPrice(
                        existingItem.getPrice()
                                * existingItem.getQuantity()
                );

                return cartItemRepository.save(existingItem);
            }
        }

        // New product
        cartItem.setTotalPrice(
                cartItem.getPrice()
                        * cartItem.getQuantity()
        );

        return cartItemRepository.save(cartItem);
    }


    // Get All Cart Items
    public List<CartItem> getAllCartItems() {

        return cartItemRepository.findAll();
    }


    // Get Items By Cart Id
    public List<CartItem> getCartItems(Long cartId) {

        return cartItemRepository.findByCartId(cartId);
    }


    // Update Quantity
    public CartItem updateQuantity(
            Long id,
            Integer quantity) {

        CartItem item =
                cartItemRepository
                        .findById(id)
                        .orElse(null);

        if (item == null) {
            return null;
        }

        item.setQuantity(quantity);

        item.setTotalPrice(
                item.getPrice() * quantity
        );

        return cartItemRepository.save(item);
    }


    // Delete Cart Item
    public String deleteCartItem(Long id) {

        CartItem item =
                cartItemRepository
                        .findById(id)
                        .orElse(null);

        if (item == null) {
            return "Cart Item Not Found";
        }

        cartItemRepository.delete(item);

        return "Item Removed Successfully";
    }


    // Clear Cart
    public String clearCart(Long cartId) {

        List<CartItem> items =
                cartItemRepository.findByCartId(cartId);

        cartItemRepository.deleteAll(items);

        return "Cart Cleared Successfully";
    }


    // Calculate Total Amount
    public Double calculateTotal(Long cartId) {

        List<CartItem> items =
                cartItemRepository.findByCartId(cartId);

        double total = 0;

        for (CartItem item : items) {

            total += item.getTotalPrice();

        }

        return total;
    }
}