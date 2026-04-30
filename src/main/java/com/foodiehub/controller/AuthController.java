package com.foodiehub.controller;

import com.foodiehub.dto.LoginRequestDTO;
import com.foodiehub.dto.ResetPasswordRequest;
import com.foodiehub.dto.VerifyOtpRequest;
import com.foodiehub.repository.UserRepository;
import com.foodiehub.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.foodiehub.dto.SendOtpRequest;
import com.foodiehub.entity.User;
import com.foodiehub.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          AuthService authService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }




    // ✅ REGISTER API (ADD THIS)
    @PostMapping("/register")
    public String register(@RequestBody LoginRequestDTO request) {
        return authService.register(request.getEmail(), request.getPassword());
    }

    // ✅ LOGIN API
    @PostMapping("/login")
    public Object login(@RequestBody LoginRequestDTO request) {
        return authService.login(request.getEmail(), request.getPassword());
    }

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody SendOtpRequest request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return "User not found ❌";
        }

        User user = optionalUser.get();

        String otp = String.valueOf((int)(Math.random() * 9000) + 1000);

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        userRepository.save(user);

        System.out.println("OTP: " + otp);

        return "OTP sent successfully ✅";
    }
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody VerifyOtpRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Check OTP exists
        if (user.getOtp() == null) {
            return ResponseEntity.status(400).body("OTP not generated");
        }

        // 2. Check OTP match
        if (!user.getOtp().equals(request.getOtp())) {
            return ResponseEntity.status(400).body("Invalid OTP");
        }

        // 3. Check expiry
        if (user.getOtpExpiry() == null || user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(400).body("OTP expired");
        }

        return ResponseEntity.ok("OTP verified successfully");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Check OTP exists
        if (user.getOtp() == null) {
            return ResponseEntity.status(400).body("OTP not generated");
        }

        // 2. Check OTP match
        if (!user.getOtp().equals(request.getOtp())) {
            return ResponseEntity.status(400).body("Invalid OTP");
        }

        // 3. Check expiry
        if (user.getOtpExpiry() == null ||
                user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(400).body("OTP expired");
        }

        // 4. Update password (ENCRYPTED)
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // 5. Clear OTP after use (IMPORTANT SECURITY STEP)
        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepository.save(user);

        return ResponseEntity.ok("Password reset successful");
    }
}