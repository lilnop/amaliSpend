import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup({ onSignUp }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // ERROR VALIDATION
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name cannot be empty";
        }
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            newErrors.password = "Password must contain a number and an uppercase letter";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            alert(`Account created successfully for ${name}! (This is a demo)`);
            onSignUp({ name, email, password, confirmPassword });
            navigate("/"); // redirect after successful login
        }
    }

    return (
        <div className='signup-wrapper'>
            <div className='signup-container'>
                {/* Left Side - Branding */}
                <div className='signup-branding'>
                    <div className='signup-branding-content'>
                        <div className='signup-logo'>
                            <span className='signup-logo-icon'>💰</span>
                            <Link to={"/"}>
                                <h1 className='signup-logo-text'>AmaliSpend</h1>
                            </Link>
                        </div>
                        <p className='signup-tagline'>Join thousands of users who are taking control of their financial future</p>
                        <div className='signup-features'>
                            <div className='signup-feature-item'>
                                <span className='signup-feature-icon'>✓</span>
                                <span>Free to use forever</span>
                            </div>
                            <div className='signup-feature-item'>
                                <span className='signup-feature-icon'>✓</span>
                                <span>Secure data protection</span>
                            </div>
                            <div className='signup-feature-item'>
                                <span className='signup-feature-icon'>✓</span>
                                <span>Start tracking in seconds</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className='signup-form-section'>
                    <div className='signup-form-container'>
                        <div className='signup-form-header'>
                            <h2 className='signup-form-title'>Create Account</h2>
                            <p className='signup-form-subtitle'>Join AmaliSpend and start tracking your expenses</p>
                        </div>

                        <form onSubmit={handleSubmit} className='signup-form'>
                            <div className='signup-input-group'>
                                <label htmlFor="name" className='signup-label'>
                                    <span className='signup-label-icon'>👤</span>
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    value={name}
                                    type="text"
                                    placeholder='Enter your full name'
                                    onChange={(e) => setName(e.target.value)}
                                    className='signup-input'
                                    required
                                />
                                {errors.name && <div className="signup-error">{errors.name}</div>}
                            </div>

                            <div className='signup-input-group'>
                                <label htmlFor="email" className='signup-label'>
                                    <span className='signup-label-icon'>📧</span>
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    value={email}
                                    type="email"
                                    placeholder='Enter your email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='signup-input'
                                    required
                                />
                                {errors.email && <div className="signup-error">{errors.email}</div>}
                            </div>

                            <div className='signup-input-group'>
                                <label htmlFor="password" className='signup-label'>
                                    <span className='signup-label-icon'>🔒</span>
                                    Password
                                </label>
                                <div className='signup-password-wrapper'>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        placeholder='Create a strong password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='signup-input'
                                        required
                                    />
                                    <button
                                        type="button"
                                        className='signup-password-toggle'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.password && <div className="signup-error">{errors.password}</div>}
                            </div>

                            <div className='signup-input-group'>
                                <label htmlFor="confirmPassword" className='signup-label'>
                                    <span className='signup-label-icon'>🔒</span>
                                    Confirm Password
                                </label>
                                <div className='signup-password-wrapper'>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        placeholder='Confirm your password'
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                        className='signup-input'
                                        required
                                    />
                                    <button
                                        type="button"
                                        className='signup-password-toggle'
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.confirmPassword && <div className="signup-error">{errors.confirmPassword}</div>}
                            </div>

                            <button type='submit' className='signup-submit-btn'>
                                Create Account
                            </button>
                        </form>

                        <div className='signup-divider'>
                            <span className='signup-divider-text'>or</span>
                        </div>

                        <div className='signup-login-prompt'>
                            Already have an account?
                            <Link to={"/login"} className='signup-login-link'>
                                Login Here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}