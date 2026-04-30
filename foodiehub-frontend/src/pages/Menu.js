import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function Menu() {

    const { id } = useParams();

    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);

    // 🔵 Load menu + cart
    useEffect(() => {

        API.get(`/food/restaurant/${id}`)
            .then(res => setMenu(res.data))
            .catch(err => console.log(err));

        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

    }, [id]);

    // 🔵 Sync helper
    const updateCart = (updated) => {
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    // 🔵 Add to cart
    const addToCart = (item) => {
          console.log(item);
        const existing = cart.find(i => i.id === item.id);

        let updated;

        if (existing) {
            updated = cart.map(i =>
                i.id === item.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            );
        } else {
            updated = [...cart, { ...item, quantity: 1 }];
        }

        updateCart(updated);
    };

    // 🔵 Increase
    const increaseQty = (id) => {
        const updated = cart.map(i =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );

        updateCart(updated);
    };

    // 🔵 Decrease
    const decreaseQty = (id) => {
        const updated = cart
            .map(i =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter(i => i.quantity > 0);

        updateCart(updated);
    };

    // 🔵 Get item from cart
    const getCartItem = (id) => {
        return cart.find(i => i.id === id);
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Menu</h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "15px",
                marginTop: "15px"
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

                            <div style={{
                                display: "flex",
                                gap: "12px",
                                alignItems: "center"
                            }}>

                                {/* 🖼️ IMAGE */}
                                <img
                                    src={item.imageUrl || "/no-image.png"}
                                    alt={item.name}
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />

                                {/* 📝 TEXT */}
                                <div style={{ flex: 1 }}>

                                    <h4 style={{ margin: "0 0 5px 0" }}>
                                        {item.name}
                                    </h4>

                                    <p style={{
                                        margin: "0",
                                        fontSize: "14px",
                                        color: "#666"
                                    }}>
                                        {item.description}
                                    </p>

                                    <p style={{
                                        fontWeight: "bold",
                                        marginTop: "6px"
                                    }}>
                                        ₹{item.price}
                                    </p>

                                </div>

                            </div>

                            {/* 🔥 SWIGGY STYLE BUTTONS */}
                            {cartItem ? (
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginTop: "10px"
                                }}>

                                    <button onClick={() => decreaseQty(item.id)}>
                                        -
                                    </button>

                                    <span>{cartItem.quantity}</span>

                                    <button onClick={() => increaseQty(item.id)}>
                                        +
                                    </button>

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

export default Menu;