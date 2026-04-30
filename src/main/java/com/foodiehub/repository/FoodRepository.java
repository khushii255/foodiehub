package com.foodiehub.repository;

import com.foodiehub.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {

    // 🔥 CUSTOM METHOD
    List<Food> findByRestaurantId(Long restaurantId);
}
