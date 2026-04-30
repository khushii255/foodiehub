import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Home() {

    const [restaurants, setRestaurants] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        API.get("/restaurants/all")
            .then((res) => {
                setRestaurants(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div style={{ padding: "20px" }}>

            <h2 style={{ marginBottom: "20px" }}>
                🍽️ Discover Restaurants
            </h2>

            {/* SEARCH + FILTER */}
            <div style={{
                marginBottom: "20px",
                display: "flex",
                gap: "10px"
            }}>

                <input
                    placeholder="Search restaurants..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "60%",
                        borderRadius: "8px",
                        border: "1px solid #ccc"
                    }}
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc"
                    }}
                >
                    <option value="">All</option>
                    <option value="Indian">Indian</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Italian">Italian</option>
                </select>

            </div>

            {/* CARDS */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px"
            }}>

                {restaurants
                    .filter((r) =>
                        r.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .filter((r) =>
                        filter ? r.cuisineType === filter : true
                    )
                    .map((r, index) => (

                        <div
                            key={index}
                            onClick={() => navigate(`/restaurant/${r.id}/menu`)}
                            style={{
                                background: "white",
                                padding: "15px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                transition: "0.3s"
                            }}

                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "scale(1.03)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >

                            {/* 🟢 IMAGE + NAME ROW (FIXED) */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                marginBottom: "10px"
                            }}>

                                <img
                                    src={r.imageUrl}
                                    alt={r.name}
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                        flexShrink: 0
                                    }}
                                />

                                <h3 style={{
                                    margin: 0,
                                    lineHeight: "1.2",
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    {r.name}
                                </h3>
                            </div>

                            {/* 📍 DETAILS */}
                            <p style={{ margin: "5px 0", color: "#666" }}>
                                📍 {r.address}
                            </p>

                            <p style={{
                                color: "#ff6b6b",
                                fontWeight: "bold"
                            }}>
                                🍴 {r.cuisineType}
                            </p>

                            <p style={{
                                background: "green",
                                color: "white",
                                display: "inline-block",
                                padding: "3px 8px",
                                borderRadius: "6px",
                                fontSize: "14px"
                            }}>
                                ⭐ {r.rating}
                            </p>

                        </div>
                    ))}

            </div>

        </div>
    );
}

export default Home;