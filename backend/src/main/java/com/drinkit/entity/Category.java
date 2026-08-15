package com.drinkit.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Category name is required")
    @Column(nullable = false, unique = true)
    private String name;

    private String image;


    // No Argument Constructor
    public Category() {
    }


    // All Argument Constructor
    public Category(Long id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }


    // Get ID
    public Long getId() {
        return id;
    }

    // Set ID
    public void setId(Long id) {
        this.id = id;
    }


    // Get Name
    public String getName() {
        return name;
    }

    // Set Name
    public void setName(String name) {
        this.name = name;
    }


    // Get Image
    public String getImage() {
        return image;
    }

    // Set Image
    public void setImage(String image) {
        this.image = image;
    }
}