package com.foodiehub.service;

import com.foodiehub.dto.RestaurantRequestDTO;
import com.foodiehub.dto.RestaurantResponseDTO;
import com.foodiehub.entity.Restaurant;
import com.foodiehub.repository.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository repo;

    // 📁 Image folder
    private static final String UPLOAD_DIR =
            "src/main/resources/static/images/";

    // 🟢 ADD RESTAURANT WITH IMAGE UPLOAD
    public RestaurantResponseDTO addRestaurant(
            String name,
            String address,
            String cuisineType,
            MultipartFile image
    ) {

        try {

            // 1️⃣ Save image file
            String imageName = System.currentTimeMillis()
                    + "_" + image.getOriginalFilename();

            Path path = Paths.get(UPLOAD_DIR + imageName);
            Files.write(path, image.getBytes());

            // 2️⃣ Save restaurant in DB
            Restaurant restaurant = new Restaurant();
            restaurant.setName(name);
            restaurant.setAddress(address);
            restaurant.setCuisineType(cuisineType);
            restaurant.setImageName(imageName); // store ONLY filename

            Restaurant saved = repo.save(restaurant);

            // 3️⃣ Convert to DTO
            return mapToDTO(saved);

        } catch (Exception e) {
            throw new RuntimeException("Error saving restaurant: " + e.getMessage());
        }
    }

    // 🟢 GET ALL
    public List<RestaurantResponseDTO> getAll() {
        return repo.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // 🟢 GET BY ID
    public RestaurantResponseDTO getById(Long id) {
        Restaurant r = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        return mapToDTO(r);
    }

    // 🟢 COMMON MAPPER
    private RestaurantResponseDTO mapToDTO(Restaurant r) {

        RestaurantResponseDTO dto = new RestaurantResponseDTO();

        dto.setId(r.getId());
        dto.setName(r.getName());
        dto.setAddress(r.getAddress());
        dto.setCuisineType(r.getCuisineType());
        dto.setRating(r.getRating());

        // 🔥 IMPORTANT: build full URL for frontend
        dto.setImageUrl("http://localhost:8080/images/" + r.getImageName());

        return dto;
    }
}