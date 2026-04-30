import { useState } from "react";
import API from "../api";
import { useNavigate, useLocation } from "react-router-dom";

function OtpVerification() {
    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");


    const verifyOtp = async () => {
        try {
            const res = await API.post("/auth/verify-otp", {
                email: email,
                otp: otp
            });

            alert(res.data);
            navigate("/reset-password", {
                state: { email }
            });

        } catch (err) {
            alert("OTP verification failed");
        }
    };

    return (
        <div>
            <h2>Verify OTP</h2>

            <input
                type="text"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={verifyOtp}>
                Verify OTP
            </button>
        </div>
    );
}

export default OtpVerification;