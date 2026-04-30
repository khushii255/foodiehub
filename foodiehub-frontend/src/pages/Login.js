import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

        // ✅ VALIDATION
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        if (!email.includes("@")) {
            setError("Enter a valid email");
            return;
        }

        API.post("/auth/login", { email, password })
            .then((res) => {

                console.log("LOGIN RESPONSE:", res.data); // 👈 ADD THIS

                localStorage.setItem("token", res.data.token);

                // ✅ SAFE USER SAVE
                if (res.data.user) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                } else {
                    console.log("User not coming from backend!");
                }

                navigate("/home");
            })
            .catch(() => {
                setError("Invalid email or password");
            });
    };

    return (
        <div style={styles.page}>

            <div style={styles.card}>

                <h2 style={styles.title}>Login</h2>

                {/* ❌ ERROR MESSAGE */}
                {error && <p style={styles.error}>{error}</p>}

                {/* 📧 EMAIL */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    style={styles.input}
                />

                {/* 🔒 PASSWORD */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                    style={styles.input}
                />

                {/* 🔘 LOGIN BUTTON */}
                <button onClick={handleLogin} style={styles.button}>
                    Login
                </button>

                {/* 🔗 LINKS */}
                <div style={styles.links}>
                    <Link to="/forgot-password" style={styles.linkLight}>
                        Forgot Password?
                    </Link>

                    <p style={{ marginTop: "10px" }}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={styles.linkBold}>
                            Sign Up
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

// 🎨 STYLES
const styles = {

    // ✅ PERFECT VERTICAL CENTERING
    page: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#fff5f5"
    },

    card: {
        width: "340px",
        padding: "30px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        textAlign: "center"
    },

    title: {
        marginBottom: "20px",
        color: "#ff6b6b"
    },

    // ✅ ERROR JUST ABOVE BUTTON (GOOD UX)
    error: {
        color: "red",
        marginBottom: "12px",
        fontSize: "14px"
    },

    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        outline: "none",
        fontSize: "14px"
    },

    button: {
        width: "100%",
        padding: "12px",
        background: "#ff6b6b",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "15px"
    },

    links: {
        marginTop: "15px",
        fontSize: "14px"
    },

    // subtle link
    linkLight: {
        color: "#888",
        textDecoration: "none"
    },

    // highlighted action
    linkBold: {
        color: "#ff6b6b",
        fontWeight: "bold",
        textDecoration: "none"
    }
};

export default Login;