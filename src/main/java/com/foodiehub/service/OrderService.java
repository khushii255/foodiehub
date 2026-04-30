package com.foodiehub.service;

import com.foodiehub.dto.OrderRequestDTO;
import com.foodiehub.dto.OrderResponseDTO;
import com.foodiehub.entity.Order;
import com.foodiehub.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    // ✅ PLACE ORDER
    public OrderResponseDTO placeOrder(OrderRequestDTO dto) {

        Order order = new Order();

        order.setUserId(dto.getUserId());
        order.setRestaurantId(dto.getRestaurantId());
        order.setTotalAmount(dto.getTotalAmount());
        order.setAddress(dto.getAddress());
        order.setStatus("PLACED");
        order.setRestaurantName(dto.getRestaurantName());
        order.setItems(dto.getItems());
        order.setOrderTime(LocalDateTime.now());

        Order saved = orderRepo.save(order);

        OrderResponseDTO res = new OrderResponseDTO();
        res.setId(saved.getId());
        res.setTotalAmount(saved.getTotalAmount());
        res.setStatus(saved.getStatus());

        return res;
    }

    // ✅ GET ORDERS BY USER
    public List<OrderResponseDTO> getOrdersByUser(int userId) {

        List<Order> orders = orderRepo.findByUserId(userId);

        return orders.stream().map(o -> {
            OrderResponseDTO dto = new OrderResponseDTO();

            dto.setId(o.getId());
            dto.setTotalAmount(o.getTotalAmount());
            dto.setStatus(o.getStatus());
            dto.setAddress(o.getAddress());
            dto.setRestaurantName(o.getRestaurantName());
            dto.setItems(o.getItems());
            dto.setOrderTime(o.getOrderTime());

            return dto;

        }).collect(Collectors.toList());
    }

    // ✅ UPDATE STATUS
    public void updateStatus(int orderId, String status) {

        Order order = orderRepo.findById(orderId).orElse(null);

        if (order != null) {
            order.setStatus(status);
            orderRepo.save(order);
        }
    }
}