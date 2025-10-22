import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";

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
      await axios.post("/api/signup", {
        email: signUpData.email,
        password: signUpData.password,
        username: signUpData.username
      });
      alert(`Signed up successfully!`);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Sign up failed. Please try again.");
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
        {/* <Route path="/test" element={<Test />}></Route> */}

      </Routes>
    </>
  )
}

export default App;


