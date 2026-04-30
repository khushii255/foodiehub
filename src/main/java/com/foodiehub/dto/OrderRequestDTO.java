package com.foodiehub.dto;

public class OrderRequestDTO {

    private int userId;
    private int restaurantId;
    private double totalAmount;
    private String address;
    private String restaurantName;
    private String items;

    // Getters & Setters

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
    public String getItems() {
        return items;
    }

    public void setItems(String items) {
        this.items = items;
    }
}