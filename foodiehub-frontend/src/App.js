import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import Menu from "./pages/Menu";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";

function App() {
    return (
        <Router>

            <Navbar />

            <Routes>

                {/* Public route */}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Protected routes */}
                <Route path="/home" element={
                        <Home />
                } />

                <Route path="/restaurant/:id" element={<h1>RESTAURANT PAGE LOADED</h1>} />

                <Route path="/restaurant/:id/menu" element={
                    <ProtectedRoute>
                        <Menu />
                    </ProtectedRoute>
                } />

                {/* default route */}
                <Route path="*" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/verify-otp" element={<OtpVerification />} />

            </Routes>

        </Router>
    );
}

export default App;