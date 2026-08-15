package com.drinkit.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.drinkit.entity.Payment;
import com.drinkit.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // Make Payment
    public Payment makePayment(Payment payment) {

        payment.setPaymentDate(LocalDateTime.now());

        if (payment.getPaymentStatus() == null || payment.getPaymentStatus().isEmpty()) {
            payment.setPaymentStatus("SUCCESS");
        }

        return paymentRepository.save(payment);
    }

    // Get All Payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Get Payment By Id
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    // Get Payments By Order Id
    public List<Payment> getPaymentsByOrderId(Long orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    // Update Payment Status
    public Payment updatePaymentStatus(Long id, String status) {

        Payment payment = paymentRepository.findById(id).orElse(null);

        if (payment == null) {
            return null;
        }

        payment.setPaymentStatus(status);

        return paymentRepository.save(payment);
    }

    // Delete Payment
    public String deletePayment(Long id) {

        Payment payment = paymentRepository.findById(id).orElse(null);

        if (payment == null) {
            return "Payment Not Found";
        }

        paymentRepository.delete(payment);

        return "Payment Deleted Successfully";
    }

}