// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  // HANDLES THER LOGIN INFO
  const handleLogin = (loginData) => {
    if (loginData.email && loginData.password) {
      alert(`Welcome back ${loginData.email}. This is a demo.`);
    } else {
      alert("Please enter both email and password.");
    }
  }

  // HANDLES THE SIGNUP INFO
  const handleSignUp = (signUpData) => {
    alert(`SignedUp sucesfully ` )
  }

  return (
    <section className="container">
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </section>
  )
}

export default App;