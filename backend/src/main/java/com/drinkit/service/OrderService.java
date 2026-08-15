package com.drinkit.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.drinkit.entity.Order;
import com.drinkit.entity.OrderItem;
import com.drinkit.repository.OrderItemRepository;
import com.drinkit.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;


    // Place Order
    public Order placeOrder(Order order) {

        order.setOrderDate(LocalDateTime.now());

        if (order.getStatus() == null
                || order.getStatus().isEmpty()) {

            order.setStatus("PLACED");
        }

        return orderRepository.save(order);
    }


    // Add Order Item
    public OrderItem addOrderItem(OrderItem orderItem) {

        double total =
                orderItem.getPrice()
                * orderItem.getQuantity();

        orderItem.setTotalPrice(total);

        return orderItemRepository.save(orderItem);
    }


    // Get All Orders
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }


    // Get Order By ID
    public Order getOrderById(Long id) {

        return orderRepository
                .findById(id)
                .orElse(null);
    }


    // Get Orders By User
    public List<Order> getOrdersByUser(Long userId) {

        return orderRepository
                .findByUserId(userId);
    }


    // Get Order Items
    public List<OrderItem> getOrderItems(Long orderId) {

        return orderItemRepository
                .findByOrderId(orderId);
    }


    // Update Order Status
    public Order updateStatus(
            Long id,
            String status) {

        Order order =
                orderRepository
                        .findById(id)
                        .orElse(null);

        if (order == null) {
            return null;
        }

        order.setStatus(status);

        return orderRepository.save(order);
    }


    // Delete Order
    public String deleteOrder(Long id) {

        Order order =
                orderRepository
                        .findById(id)
                        .orElse(null);

        if (order == null) {
            return "Order Not Found";
        }

        List<OrderItem> items =
                orderItemRepository
                        .findByOrderId(id);

        orderItemRepository.deleteAll(items);

        orderRepository.delete(order);

        return "Order Deleted Successfully";
    }
}