import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function RestaurantDetails() {
    const { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    const[loading, setLoading] = useState(true);

    // 🔵 Load data
    useEffect(() => {
        API.get(`/restaurants/${id}`)
            .then(res => {
                console.log("RAW RESPONSE:", res);
                console.log("DATA:", res.data);
                setRestaurant(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });


        API.get(`/food/restaurant/${id}`)
            .then(res => {
                console.log("MENU RESPONSE:", res.data);
                setMenu(res.data);
            })
            .catch(err => console.log(err));

        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, [id]);

    // 🔵 Add to cart
    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);

            let updated;

            if (existing) {
                updated = prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                updated = [...prev, { ...item, quantity: 1 }];
            }

            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        });
    };

    const increaseQty = (id) => {
        setCart(prev =>
            prev.map(i =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            )
        );
    };

    const decreaseQty = (id) => {
        setCart(prev => {
            const updated = prev
                .map(i =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                )
                .filter(i => i.quantity > 0);

            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        });
    };

    const getCartItem = (id) => {
        return cart.find(i => i.id === id);
    };

    // 🔵 Loading state
    if (loading || !restaurant ) return <p style={{ padding: "20px" }}>Loading...</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>

            {/* Restaurant Image */}
            <img
                src={restaurant.imageUrl}
                    alt={restaurant.name}
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400";
                }}
                    style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        marginBottom: "15px"
                    }}
                />

            {/* Restaurant Info */}
            <h2>{restaurant.name}</h2>
            <p>📍 {restaurant.address}</p>
            <p style={{ color: "#ff6b6b", fontWeight: "bold" }}>
                🍴 {restaurant.cuisineType}
            </p>

            <hr />

            {/* Menu */}
            <h3>Menu</h3>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "15px"
            }}>

                {menu.map(item => {

                    const cartItem = getCartItem(item.id);

                    return (
                        <div key={item.id} style={{
                            background: "#fff",
                            padding: "15px",
                            borderRadius: "12px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                        }}>

                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <p style={{ fontWeight: "bold" }}>₹{item.price}</p>

                            {cartItem ? (
                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <button onClick={() => decreaseQty(item.id)}>-</button>
                                    <span>{cartItem.quantity}</span>
                                    <button onClick={() => increaseQty(item.id)}>+</button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addToCart(item)}
                                    style={{
                                        marginTop: "10px",
                                        background: "#ff6b6b",
                                        color: "white",
                                        border: "none",
                                        padding: "6px 10px",
                                        borderRadius: "6px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Add to Cart
                                </button>
                            )}

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default RestaurantDetails;