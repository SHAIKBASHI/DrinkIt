package com.drinkit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.drinkit.entity.Address;
import com.drinkit.entity.User;
import com.drinkit.service.AddressService;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "http://localhost:5173")
public class AddressController {

    @Autowired
    private AddressService service;


    // Add Address
    @PostMapping
    public ResponseEntity<Address> addAddress(
            @RequestBody Address address,
            Authentication authentication) {

        User user =
                (User) authentication.getPrincipal();

        address.setUserId(user.getId());

        Address savedAddress =
                service.addAddress(address);

        return ResponseEntity.ok(savedAddress);
    }


    // Get All Addresses
    @GetMapping
    public List<Address> getAllAddresses() {

        return service.getAllAddresses();
    }


    // Get Address By Id
    @GetMapping("/{id}")
    public Address getAddressById(
            @PathVariable Long id) {

        return service.getAddressById(id);
    }


    // Get Addresses By User Id
    @GetMapping("/user/{userId}")
    public List<Address> getAddressesByUserId(
            @PathVariable Long userId) {

        return service.getAddressesByUserId(userId);
    }


    // Update Address
    @PutMapping("/{id}")
    public Address updateAddress(
            @PathVariable Long id,
            @RequestBody Address address) {

        return service.updateAddress(
                id,
                address
        );
    }


    // Delete Address
    @DeleteMapping("/{id}")
    public String deleteAddress(
            @PathVariable Long id) {

        return service.deleteAddress(id);
    }
}