package com.drinkit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.drinkit.entity.Address;
import com.drinkit.repository.AddressRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository repository;


    // Add Address
    public Address addAddress(Address address) {

        return repository.save(address);
    }


    // Get All Addresses
    public List<Address> getAllAddresses() {

        return repository.findAll();
    }


    // Get Address By Id
    public Address getAddressById(Long id) {

        return repository
                .findById(id)
                .orElse(null);
    }


    // Get Addresses By User Id
    public List<Address> getAddressesByUserId(Long userId) {

        return repository.findByUserId(userId);
    }


    // Update Address
    public Address updateAddress(
            Long id,
            Address address) {

        Address existing =
                repository
                        .findById(id)
                        .orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setFullName(
                address.getFullName()
        );

        existing.setMobile(
                address.getMobile()
        );

        existing.setHouseNo(
                address.getHouseNo()
        );

        existing.setStreet(
                address.getStreet()
        );

        existing.setCity(
                address.getCity()
        );

        existing.setState(
                address.getState()
        );

        existing.setPincode(
                address.getPincode()
        );

        existing.setAddressType(
                address.getAddressType()
        );

        existing.setDefaultAddress(
                address.getDefaultAddress()
        );

        return repository.save(existing);
    }


    // Delete Address
    public String deleteAddress(Long id) {

        Address existing =
                repository
                        .findById(id)
                        .orElse(null);

        if (existing == null) {
            return "Address Not Found";
        }

        repository.delete(existing);

        return "Address Deleted Successfully";
    }
}