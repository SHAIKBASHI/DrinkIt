package com.drinkit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.drinkit.entity.Category;
import com.drinkit.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    // Add Category
    public Category addCategory(Category category) {

        if (repository.findByName(category.getName()).isPresent()) {
            throw new RuntimeException("Category already exists");
        }

        return repository.save(category);
    }

    // Get All Categories
    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    // Get Category By Id
    public Category getCategoryById(Long id) {

        return repository.findById(id).orElse(null);

    }

    // Update Category
    public Category updateCategory(Long id, Category category) {

        Category existing = repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setName(category.getName());
        existing.setImage(category.getImage());

        return repository.save(existing);
    }

    // Delete Category
    public String deleteCategory(Long id) {

        Category category = repository.findById(id).orElse(null);

        if (category == null) {
            return "Category Not Found";
        }

        repository.delete(category);

        return "Category Deleted Successfully";
    }

}