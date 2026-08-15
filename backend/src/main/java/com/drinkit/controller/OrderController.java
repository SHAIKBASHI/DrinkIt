package com.drinkit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.drinkit.entity.Order;
import com.drinkit.entity.OrderItem;
import com.drinkit.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService service;

    // Place Order
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {

        return service.placeOrder(order);

    }

    // Add Order Item
    @PostMapping("/item")
    public OrderItem addOrderItem(@RequestBody OrderItem orderItem) {

        return service.addOrderItem(orderItem);

    }

    // Get All Orders
    @GetMapping
    public List<Order> getAllOrders() {

        return service.getAllOrders();

    }

    // Get Order By Id
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {

        return service.getOrderById(id);

    }

    // Get Orders By User Id
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {

        return service.getOrdersByUser(userId);

    }

    // Get Order Items
    @GetMapping("/items/{orderId}")
    public List<OrderItem> getOrderItems(@PathVariable Long orderId) {

        return service.getOrderItems(orderId);

    }

    // Update Order Status
    @PutMapping("/status/{id}/{status}")
    public Order updateStatus(@PathVariable Long id,
                              @PathVariable String status) {

        return service.updateStatus(id, status);

    }

    // Delete Order
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {

        return service.deleteOrder(id);

    }

}