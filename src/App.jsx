// import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
// import Test from "./components/Test";

function App() {
  const navigate = useNavigate();

  // HANDLES THER LOGIN INFO
  const handleLogin = (loginData) => {
    if (loginData.email && loginData.password) {
      alert(`Welcome back ${loginData.email}. This is a demo.`);
      navigate("/dashboard");
    } else {
      alert("Please enter both email and password.");
    }
  }

  // HANDLES THE SIGNUP INFO
  const handleSignUp = (signUpData) => {
    alert(`SignedUp sucesfully `)
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
        {/* <Route path="/test" element={<Test />}></Route> */}

      </Routes>
    </>
  )
}

export default App;