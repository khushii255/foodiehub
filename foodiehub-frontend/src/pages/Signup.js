import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = () => {

        // ✅ VALIDATION
        if (!name || !email || !password) {
            setMessage("All fields are required");
            return;
        }

        if (!email.includes("@")) {
            setMessage("Enter valid email");
            return;
        }

        API.post("/auth/register", {
            name,
            email,
            password
        })
            .then(() => {
                setMessage("Signup successful! Redirecting...");
                setTimeout(() => navigate("/login"), 1500);
            })
            .catch(() => {
                setMessage("Signup failed (email may already exist)");
            });
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>

                <h2 style={styles.title}>Sign Up</h2>

                {message && <p style={styles.message}>{message}</p>}

                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />

                <button onClick={handleSignup} style={styles.button}>
                    Create Account
                </button>

                <p style={{ marginTop: "15px" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.link}>
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

// 🎨 STYLES
const styles = {
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
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "6px",
        border: "1px solid #ccc"
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#ff6b6b",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
    },
    message: {
        marginBottom: "10px",
        color: "green",
        fontSize: "14px"
    },
    link: {
        color: "#ff6b6b",
        fontWeight: "bold",
        textDecoration: "none"
    }
};

export default Signup;