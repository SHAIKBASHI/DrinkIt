package com.drinkit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.drinkit.entity.Payment;
import com.drinkit.service.PaymentService;

@RestController
@RequestMapping("/api/payments")

public class PaymentController {

    @Autowired
    private PaymentService service;

    // Make Payment
    @PostMapping
    public Payment makePayment(@RequestBody Payment payment) {
        return service.makePayment(payment);
    }

    // Get All Payments
    @GetMapping
    public List<Payment> getAllPayments() {
        return service.getAllPayments();
    }

    // Get Payment By Id
    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return service.getPaymentById(id);
    }

    // Get Payments By Order Id
    @GetMapping("/order/{orderId}")
    public List<Payment> getPaymentsByOrderId(@PathVariable Long orderId) {
        return service.getPaymentsByOrderId(orderId);
    }

    // Update Payment Status
    @PutMapping("/{id}/{status}")
    public Payment updatePaymentStatus(@PathVariable Long id,
                                       @PathVariable String status) {
        return service.updatePaymentStatus(id, status);
    }

    // Delete Payment
    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Long id) {
        return service.deletePayment(id);
    }

}