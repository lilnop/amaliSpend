import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword({ setShowForgot }) {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleForgotPassword = (e) => {
        e.preventDefault();
        
        // Reset errors
        setErrors({});
        
        // Validation
        if (!email) {
            setErrors({ email: "Email is required" });
            return;
        }
        
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors({ email: "Please enter a valid email address" });
            return;
        }

        // Simulate backend call
        setIsSubmitted(true);
        setTimeout(() => {
            alert(`A password reset link has been sent to ${email}`);
            setShowForgot(false); // Go back to login after submission
        }, 1000);
    }

    if (isSubmitted) {
        return (
            <div className='forgot-wrapper'>
                <div className='forgot-container'>
                    {/* Left Side - Branding */}
                    <div className='forgot-branding'>
                        <div className='forgot-branding-content'>
                            <div className='forgot-logo'>
                                <span className='forgot-logo-icon'>🔐</span>
                                <h1 className='forgot-logo-text'>AmaliSpend</h1>
                            </div>
                            <p className='forgot-tagline'>Your account security is our priority</p>
                            <div className='forgot-features'>
                                <div className='forgot-feature-item'>
                                    <span className='forgot-feature-icon'>✓</span>
                                    <span>Secure password reset</span>
                                </div>
                                <div className='forgot-feature-item'>
                                    <span className='forgot-feature-icon'>✓</span>
                                    <span>Email verification</span>
                                </div>
                                <div className='forgot-feature-item'>
                                    <span className='forgot-feature-icon'>✓</span>
                                    <span>Quick account recovery</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Success Message */}
                    <div className='forgot-form-section'>
                        <div className='forgot-form-container'>
                            <div className='forgot-success-content'>
                                <div className='forgot-success-icon'>📧</div>
                                <h2 className='forgot-success-title'>Check Your Email</h2>
                                <p className='forgot-success-subtitle'>
                                    We've sent a password reset link to <strong>{email}</strong>
                                </p>
                                <p className='forgot-success-instructions'>
                                    Please check your email and click the link to reset your password. 
                                    The link will expire in 15 minutes.
                                </p>
                                <div className='forgot-actions'>
                                    <button 
                                        onClick={() => setShowForgot(false)}
                                        className='forgot-back-btn'
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='forgot-wrapper'>
            <div className='forgot-container'>
                {/* Left Side - Branding */}
                <div className='forgot-branding'>
                    <div className='forgot-branding-content'>
                        <div className='forgot-logo'>
                            <span className='forgot-logo-icon'>🔐</span>
                            <h1 className='forgot-logo-text'>AmaliSpend</h1>
                        </div>
                        <p className='forgot-tagline'>Don't worry, we'll help you get back into your account</p>
                        <div className='forgot-features'>
                            <div className='forgot-feature-item'>
                                <span className='forgot-feature-icon'>✓</span>
                                <span>Secure password reset</span>
                            </div>
                            <div className='forgot-feature-item'>
                                <span className='forgot-feature-icon'>✓</span>
                                <span>Email verification</span>
                            </div>
                            <div className='forgot-feature-item'>
                                <span className='forgot-feature-icon'>✓</span>
                                <span>Quick account recovery</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Forgot Password Form */}
                <div className='forgot-form-section'>
                    <div className='forgot-form-container'>
                        <div className='forgot-form-header'>
                            <h2 className='forgot-form-title'>Forgot Password?</h2>
                            <p className='forgot-form-subtitle'>Enter your email address and we'll send you a reset link</p>
                        </div>

                        <form onSubmit={handleForgotPassword} className='forgot-form'>
                            <div className='forgot-input-group'>
                                <label htmlFor="email" className='forgot-label'>
                                    <span className='forgot-label-icon'>📧</span>
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    value={email}
                                    type="email"
                                    placeholder='Enter your email address'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='forgot-input'
                                    required
                                />
                                {errors.email && <div className="forgot-error">{errors.email}</div>}
                            </div>

                            <button type='submit' className='forgot-submit-btn'>
                                Send Reset Link
                            </button>
                        </form>

                        <div className='forgot-divider'>
                            <span className='forgot-divider-text'>or</span>
                        </div>

                        <div className='forgot-login-prompt'>
                            Remember your password?
                            <Link to={"/login"} className='forgot-login-link'>
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;