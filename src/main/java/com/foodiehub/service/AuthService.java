package com.foodiehub.service;

import com.foodiehub.entity.User;
import com.foodiehub.repository.UserRepository;
import com.foodiehub.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.foodiehub.entity.Role;
import java.util.Map;
import java.util.HashMap;


import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ REGISTER USER
    public String register(String email, String password) {

        // check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            return "User already exists with email: " + email;
        }

        // create new user
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.CUSTOMER);// default role

        userRepository.save(user);

        return "User registered successfully";
    }

    // ✅ LOGIN USER (JWT GENERATION)
    public Map<String, Object> login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // check password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // generate token
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        // ✅ CREATE RESPONSE
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);

        return response;
    }
}