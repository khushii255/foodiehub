package com.foodiehub.service;

import com.foodiehub.entity.User;
import com.foodiehub.entity.Role;
import com.foodiehub.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.foodiehub.entity.Role;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 👤 CREATE USER (REGISTER)
    public User registerUser(User user) {

        // ⭐ DEFAULT ROLE = CUSTOMER
        user.setRole(Role.CUSTOMER);

        return userRepository.save(user);
    }

    // 👤 GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 👤 GET USER BY ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // 👤 DELETE USER
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // 👤 UPDATE USER (optional)
    public User updateUser(Long id, User updatedUser) {

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());

            // ⚠️ Do NOT change role automatically here
            return userRepository.save(existingUser);
        }

        return null;
    }
}