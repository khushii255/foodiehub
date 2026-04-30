import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const styles = {
        nav: {
            padding: "10px 20px",
            background: "#ff6b6b",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        },
        logoContainer: {
            display: "flex",
            alignItems: "center",
            cursor: "pointer"
        },
        logo: {
            width: "40px",
            height: "40px",
            marginRight: "10px",
            objectFit: "contain"
        },
        title: {
            margin: 0,
            fontWeight: "bold",
            letterSpacing: "1px"
        },
        navLinks: {
            display: "flex",
            alignItems: "center",
            gap: "10px" // 🔥 THIS FIXES OVERLAP
        },
        button: {
            background: "white",
            color: "#ff6b6b",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500"
        }
    };

    return (
        <div style={styles.nav}>

            {/* Logo Section */}
            <div
                style={styles.logoContainer}
                onClick={() => navigate("/home")}
            >
                <img src={logo} alt="logo" style={styles.logo} />
                <h3 style={styles.title}>FoodieHub</h3>
            </div>

            {/* Navigation Buttons */}
            <div style={styles.navLinks}>

                <Link to="/home" style={{ textDecoration: "none" }}>
                    <button style={styles.button}>Home</button>
                </Link>

                <Link to="/cart" style={{ textDecoration: "none" }}>
                    <button style={styles.button}>Cart 🛒</button>
                </Link>
                
                <Link to="/orders" style={{ textDecoration: "none" }}>
                    <button style={styles.button}>My Orders 📦</button>
                </Link>

                {!token ? (
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <button style={styles.button}>Login</button>
                    </Link>
                ) : (
                    <button onClick={handleLogout} style={styles.button}>
                        Logout
                    </button>)
                }

            </div>
        </div>
    );
}

export default Navbar;