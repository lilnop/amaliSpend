import { useState } from "react";
import { Link } from "react-router-dom";

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
        <section className="container">
            <article className="container-elements">
                <h1>Recover Account</h1>
                <p className="subtitle">Enter your recovery email address</p>
                <form onSubmit={handleForgotPassword}>
                    <input
                        className="input-space"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter recovery email"
                        name="email"
                        id="email"
                    />
                    <button className="cta-button-login">Request Password</button>
                </form>
                <div className='signup-link'>
                    Already have an account?
                    <Link to={"/login"}> Log In</Link>
                </div>
            </article>

        </section>
    )
}

export default ForgotPassword;