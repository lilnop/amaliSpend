import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";

function App() {  
  const [showSignup, setShowSignup] = useState(true); 
  const [showForgot, setShowForgot] = useState(false);

  // HANDLES THER LOGIN INFO
  const handleLogin = (loginData) => {
    if (loginData.email && loginData.password) {
            alert(`Welcome back ${loginData.email}. This is a demo.`);
        }else {
            alert("Please enter both email and password.");
    }
  }
  // HANDLES THE SIGNUP INFO
  const handleSignUp = (signUpData) => {
    alert(`SignedUp sucesfully ` )
  }

  return (
    <section className="container">
      <h1>AmaliSpend</h1>
      {/* TOGGLES BETWEEN LOGINPAGE,SIGNUP AND FORGETPASSWORD */}
      {
        showForgot ? 
          <ForgotPassword setShowForgot={setShowForgot} />
            :
          (            
            showSignup ?
            (<Login 
              onLogin={handleLogin} 
              setShowSignup={setShowSignup} 
              setShowForgot={setShowForgot}  
            />)
              :
            (<SignUp  
              onSignUp={handleSignUp} 
              setShowSignup={setShowSignup} />)
          )

      }   
    </section>
  )
}

export default App;
