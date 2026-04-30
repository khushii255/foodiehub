package com.foodiehub.controller;

import com.foodiehub.dto.FoodRequestDTO;
import com.foodiehub.dto.FoodResponseDTO;
import com.foodiehub.service.FoodService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService service;

    // ✅ ADD FOOD
    @PostMapping("/add")
    public FoodResponseDTO addFood(@RequestBody FoodRequestDTO dto)
    {
        return service.addFood(dto);
    }

    // ✅ GET ALL FOOD
    @GetMapping("/all")
    public List<FoodResponseDTO> getAllFood() {
        return service.getAllFood();
    }

    // ✅ GET FOOD BY RESTAURANT
    @GetMapping("/restaurant/{id}")
    public List<FoodResponseDTO> getByRestaurant(@PathVariable Long id) {
        return service.getFoodByRestaurant(id);
    }
}