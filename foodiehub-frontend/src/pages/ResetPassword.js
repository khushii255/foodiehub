import { useState } from "react";
import API from "../api";

function ResetPassword() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const resetPassword = async () => {
        try {
            const res = await API.post("/auth/reset-password", {
                email,
                otp,
                newPassword
            });

            alert(res.data);

        } catch (err) {
            alert("Password reset failed");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="text"
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
            />

            <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <button onClick={resetPassword}>
                Reset Password
            </button>
        </div>
    );
}

export default ResetPassword;