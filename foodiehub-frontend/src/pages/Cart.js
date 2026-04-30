import React, { useEffect, useState } from "react";
import API from "../api";

function Cart() {

    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState("");

    // 🔵 Load cart from localStorage
    useEffect(() => {
        const data = localStorage.getItem("cart");

        if (!data || data === "undefined") {
            setCart([]);
            return;
        }

        try {
            setCart(JSON.parse(data));
        } catch (e) {
            console.log("Cart parse error", e);
            setCart([]);
        }
    }, []);

    // 🔵 Sync cart helper
    const syncCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // 🔵 Update quantity
    const updateQuantity = (id, type) => {

        const updatedCart = cart.map(item => {

            if (item.id === id) {
                if (type === "inc") {
                    return { ...item, quantity: item.quantity + 1 };
                }

                if (type === "dec") {
                    return item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item;
                }
            }

            return item;
        });

        syncCart(updatedCart);
    };

    // 🔵 Remove item
    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        syncCart(updatedCart);
    };

    // 🔵 Total
    const totalAmount = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    // 🔵 Place Order
    const placeOrder = async () => {

        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }

        if (!address.trim()) {
            alert("Please enter address");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first ❌");
            return;
        }

        let user = null;

        const userData = localStorage.getItem("user");

// ✅ HANDLE ALL BAD CASES
        if (!userData || userData === "undefined" || userData === "null") {
            alert("Please login again ❌");
            return;
        }

        try {
            user = JSON.parse(userData);
        } catch (e) {
            console.log("Parse error:", e);
            alert("User data broken ❌ Please login again");
            return;
        }

// ✅ EXTRA SAFETY
        if (!user || !user.id) {
            alert("Invalid user data ❌");
            return;
        }

        const foodIds = cart.map(item => item.id);
        const restaurantName = cart[0]?.restaurantName || "Unknown";
        const items = cart.map(item => `${item.name} x${item.quantity}`).join(", ");

        const orderData = {
            userId: user.id,
            foodIds: foodIds,
            totalAmount: totalAmount,
            address: address,
            restaurantName: restaurantName,
            items: items
        };

        try {
            await API.post("/orders", orderData);

            alert("Order placed successfully 🎉");

            localStorage.removeItem("cart");
            setCart([]);
            setAddress("");

        } catch (err) {
            console.log(err);
            alert("Error placing order");
        }
    };
    console.log(cart);
    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>

            <h2>Your Cart 🛒</h2>

            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.id} style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "10px"
                        }}>


                            {/* ✅ NEW IMAGE + TEXT ROW */}
                            <div style={{
                                display: "flex",
                                gap: "15px",
                                alignItems: "center"
                            }}>
                                <img
                                    src={item.imageUrl || "/no-image.png"}
                                    alt={item.name}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "10px",
                                        objectFit: "cover"
                                    }}
                                />
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>₹{item.price}</p>
                                </div>
                            </div>


                            {/* Quantity */}
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <button onClick={() => updateQuantity(item.id, "dec")}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, "inc")}>+</button>
                            </div>

                            <button
                                onClick={() => removeItem(item.id)}
                                style={{
                                    marginTop: "10px",
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    padding: "6px 10px",
                                    borderRadius: "5px"
                                }}
                            >
                                Remove
                            </button>

                        </div>
                    ))}

                    <h3>Total: ₹{totalAmount}</h3>

                    {/* 🔥 CHECKOUT SECTION */}
                    <div style={{ marginTop: "20px" }}>
                        <h3>Checkout</h3>

                        <input
                            type="text"
                            placeholder="Enter delivery address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc"
                            }}
                        />

                        <button
                            onClick={placeOrder}
                            style={{
                                width: "100%",
                                padding: "10px",
                                background: "#ff6b6b",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontWeight: "bold"
                            }}
                        >
                            Place Order
                        </button>
                    </div>
                </>
            )}

        </div>
    );
}

export default Cart;