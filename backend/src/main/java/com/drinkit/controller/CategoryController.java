package com.drinkit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.drinkit.entity.Category;
import com.drinkit.service.CategoryService;

@RestController
@RequestMapping("/api/categories")

public class CategoryController {

    @Autowired
    private CategoryService service;

    // Add Category
    @PostMapping
    public Category addCategory(@RequestBody Category category) {

        return service.addCategory(category);

    }

    // Get All Categories
    @GetMapping
    public List<Category> getAllCategories() {

        return service.getAllCategories();

    }

    // Get Category By Id
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {

        return service.getCategoryById(id);

    }

    // Update Category
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id,
                                   @RequestBody Category category) {

        return service.updateCategory(id, category);

    }

    // Delete Category
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {

        return service.deleteCategory(id);

    }

}