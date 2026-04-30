import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const sendOtp = async () => {
        try {
            const res = await API.post("/auth/send-otp", {
                email
            });

            alert(res.data);
            navigate("/verify-otp", { state: { email } });
        } catch (err) {
            alert("Failed to send OTP");
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>

            <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={sendOtp}>
                Send OTP
            </button>
        </div>
    );
}

export default ForgotPassword;