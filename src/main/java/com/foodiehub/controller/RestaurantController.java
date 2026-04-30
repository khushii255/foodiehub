package com.foodiehub.controller;

import com.foodiehub.dto.RestaurantResponseDTO;
import com.foodiehub.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "http://localhost:3000")
public class RestaurantController {

    @Autowired
    private RestaurantService service;

    // 🟢 ADD RESTAURANT WITH IMAGE
    @PostMapping("/add")
    public RestaurantResponseDTO addRestaurant(
            @RequestParam("name") String name,
            @RequestParam("address") String address,
            @RequestParam(value = "cuisineType", required = false) String cuisineType,
            @RequestParam("image") MultipartFile image
    ) {
        return service.addRestaurant(name, address, cuisineType, image);
    }

    @GetMapping("/all")
    public List<RestaurantResponseDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public RestaurantResponseDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }
}