package com.foodiehub.controller;

import com.foodiehub.dto.OrderRequestDTO;
import com.foodiehub.dto.OrderResponseDTO;
import com.foodiehub.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // ✅ PLACE ORDER
    @PostMapping
    public OrderResponseDTO placeOrder(@RequestBody OrderRequestDTO dto) {
        return orderService.placeOrder(dto);
    }

    // ✅ GET USER ORDERS
    @GetMapping("/user/{userId}")
    public List<OrderResponseDTO> getOrders(@PathVariable int userId) {
        return orderService.getOrdersByUser(userId);
    }

    // ✅ UPDATE STATUS
    @PutMapping("/{id}")
    public void updateStatus(@PathVariable int id, @RequestParam String status) {
        orderService.updateStatus(id, status);
    }
}