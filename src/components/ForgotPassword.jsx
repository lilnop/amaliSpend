import { useState } from "react";

function ForgotPassword({ setShowForgot }) {
    const [email, setEmail] = useState("");

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (!email) {
            alert("Please enter your email");
            return;
        }

        // Simulate backend call
        alert(`A password reset link has been sent to ${email}`);
        setShowForgot(false); // Go back to login after submission

    }

    return (
        <section>
            <p className="subtitle">Enter your recovery email address</p>
            <div>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" 
                    placeholder="Enter recovery email"
                    name="email" 
                    id="email" 
                />
                <button onClick={handleForgotPassword}>Request Password</button>
            </div>
            <div className='signup-link'>
                Already have an account?
                <a href='#'
                    onClick={() => setShowForgot(false)}> Log In</a>
            </div>
        </section>
    )
}

export default ForgotPassword;