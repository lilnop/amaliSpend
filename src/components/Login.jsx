import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // STORES EMAIL AND PASSWORD AS PROPS
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    }

    return (
        <div className='login-wrapper'>
            <div className='login-container'>
                {/* Left Side - Branding */}
                <div className='login-branding'>
                    <div className='login-branding-content'>
                        <div className='login-logo'>
                            <span className='login-logo-icon'>💰</span>
                            <Link to={"/"}>
                                <h1 className='login-logo-text'>AmaliSpend</h1>

                            </Link>
                        </div>
                        <p className='login-tagline'>Track your expenses with ease and take control of your financial future</p>
                        <div className='login-features'>
                            <div className='login-feature-item'>
                                <span className='login-feature-icon'>✓</span>
                                <span>Easy expense tracking</span>
                            </div>
                            <div className='login-feature-item'>
                                <span className='login-feature-icon'>✓</span>
                                <span>Visual insights & reports</span>
                            </div>
                            <div className='login-feature-item'>
                                <span className='login-feature-icon'>✓</span>
                                <span>Secure & private</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className='login-form-section'>
                    <div className='login-form-container'>
                        <div className='login-form-header'>
                            <h2 className='login-form-title'>Welcome Back</h2>
                            <p className='login-form-subtitle'>Login to manage your expenses</p>
                        </div>

                        <form onSubmit={handleSubmit} className='login-form'>
                            <div className='login-input-group'>
                                <label htmlFor="email" className='login-label'>
                                    <span className='login-label-icon'>📧</span>
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    value={email}
                                    type="email"
                                    placeholder='Enter your email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='login-input'
                                    required
                                />
                            </div>

                            <div className='login-input-group'>
                                <label htmlFor="password" className='login-label'>
                                    <span className='login-label-icon'>🔒</span>
                                    Password
                                </label>
                                <div className='login-password-wrapper'>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        placeholder='Enter your password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='login-input'
                                        required
                                    />
                                    <button
                                        type="button"
                                        className='login-password-toggle'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>

                            <div className="login-forgot-password">
                                <Link to={"/forgot-password"} className='login-forgot-link'>
                                    Forgot Password?
                                </Link>
                            </div>

                            <button type='submit' className='login-submit-btn'>
                                Login to Dashboard
                            </button>
                        </form>

                        <div className='login-divider'>
                            <span className='login-divider-text'>or</span>
                        </div>

                        <div className='login-signup-prompt'>
                            Don't have an account?
                            <Link to={"/signup"} className='login-signup-link'>
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};