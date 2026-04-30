package com.foodiehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.foodiehub.entity.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByUserId(int userId);
}