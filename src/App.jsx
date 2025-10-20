// import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import axios from "axios"; // use axios directly instead of missing ./api

function App() {
  const navigate = useNavigate();

  // HANDLES THE LOGIN INFO
  const handleLogin = async (loginData) => {
    try {
      const res = await axios.post("/api/login", {
        email: loginData.email,
        password: loginData.password,
      });

      // Save token (optional)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      alert(`Welcome back ${res.data.username}!`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  // HANDLES THE SIGNUP INFO
  const handleSignUp = async (signUpData) => {
    try {
      const res = await axios.post("/api/register", {
        username: signUpData.username,
        email: signUpData.email,
        password: signUpData.password,
      });

      alert(res.data.message || "Signed up successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Sign-up failed. Please try again.");
    }
  }

  return (
    // <section className="container">
      <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}

export default App;


