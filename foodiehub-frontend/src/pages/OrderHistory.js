import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function OrderHistory() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        // 🔐 Check login
        if (!token || !userData) {
            alert("Please login first ❌");
            navigate("/login");
            return;
        }

        let user;

        try {
            user = JSON.parse(userData);
        } catch (e) {
            alert("Session expired. Please login again ❌");
            localStorage.clear();
            navigate("/login");
            return;
        }

        // 📦 Fetch orders
        API.get(`/orders/user/${user.id}`)
            .then((res) => {
                console.log("Orders:", res.data); // debug
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert("Error fetching orders ❌");
            });

    }, [navigate]);

    return (
        <div style={styles.container}>
            <h2>📦 My Orders</h2>

            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} style={styles.card}>
                        <h3>Order #{order.id}</h3>
                        <p><b>Items:</b> {order.items}</p>
                        <p>
                            <b>Ordered On:</b>{" "}
                            {new Date(order.orderTime).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short"
                            })}
                        </p>
                        
                        <h4 style={{ color: "#ff6b6b" }}>
                            🍴 {order.restaurantName}
                        </h4>

                        <p><strong>Total:</strong> ₹{order.totalAmount}</p>

                        <p style={{
                            color: order.status === "DELIVERED" ? "green" : "orange",
                            fontWeight: "bold"
                        }}>
                            Status: {order.status}
                        </p>

                        <p><strong>Address:</strong> {order.address}</p>
                    </div>
                ))
            )}
        </div>
    );
}

// 🎨 Simple styling
const styles = {
    container: {
        padding: "20px",
        maxWidth: "600px",
        margin: "auto"
    },
    card: {
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }
};

export default OrderHistory;