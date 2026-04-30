package com.foodiehub.service;

import com.foodiehub.dto.FoodRequestDTO;
import com.foodiehub.dto.FoodResponseDTO;
import com.foodiehub.entity.Food;
import com.foodiehub.entity.Restaurant;
import com.foodiehub.repository.FoodRepository;
import com.foodiehub.repository.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepo;

    @Autowired
    private RestaurantRepository restaurantRepo;

    // ✅ ADD FOOD
    public FoodResponseDTO addFood(FoodRequestDTO dto) {

        // 🔥 Find restaurant using ID
        Restaurant restaurant = restaurantRepo.findById(dto.getRestaurantId()).orElse(null);

        if (restaurant == null) return null;

        // DTO → Entity
        Food food = new Food();
        food.setName(dto.getName());
        food.setPrice(dto.getPrice());
        food.setRestaurant(restaurant);

        // 🖼️ HANDLE IMAGE
        String fileName = dto.getImageName();

        // encode spaces (important)
        String encodedName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);

        food.setImageName(fileName);
        food.setImageUrl("http://localhost:8080/images/" + encodedName);

        // Save
        Food saved = foodRepo.save(food);

        // Entity → ResponseDTO
        FoodResponseDTO res = new FoodResponseDTO();
        res.setId(saved.getId());
        res.setName(saved.getName());
        res.setPrice(saved.getPrice());
        res.setRestaurantName(restaurant.getName());
        res.setImageUrl(saved.getImageUrl());

        return res;
    }

    // ✅ GET ALL FOOD
    public List<FoodResponseDTO> getAllFood() {

        return foodRepo.findAll().stream().map(f -> {
            FoodResponseDTO dto = new FoodResponseDTO();
            dto.setId(f.getId());
            dto.setName(f.getName());
            dto.setPrice(f.getPrice());
            dto.setRestaurantName(f.getRestaurant().getName());
            String encodedName = URLEncoder.encode(f.getImageName(), StandardCharsets.UTF_8);
            dto.setImageUrl("http://localhost:8080/images/" + encodedName);
            return dto;
        }).collect(Collectors.toList());
    }

    // ✅ GET FOOD BY RESTAURANT
    public List<FoodResponseDTO> getFoodByRestaurant(Long restaurantId) {

        return foodRepo.findByRestaurantId(restaurantId).stream().map(f -> {
            FoodResponseDTO dto = new FoodResponseDTO();
            dto.setId(f.getId());
            dto.setName(f.getName());
            dto.setPrice(f.getPrice());
            dto.setRestaurantName(f.getRestaurant().getName());

            dto.setImageUrl("http://localhost:8080/images/" + f.getImageUrl());// TEMP FIX

            return dto;
        }).collect(Collectors.toList());
    }
}