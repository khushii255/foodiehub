package com.foodiehub.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/images")
@CrossOrigin
public class ImageUploadController {

    private static final String UPLOAD_DIR =
            "src/main/resources/static/images/";

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("image") MultipartFile file) {

        try {
            // 1. unique file name
            String fileName = System.currentTimeMillis()
                    + "_" + file.getOriginalFilename();

            // 2. path
            Path path = Paths.get(UPLOAD_DIR + fileName);

            // 3. save file
            Files.copy(file.getInputStream(), path);

            // 4. return ONLY filename ✅
            return fileName;

        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}