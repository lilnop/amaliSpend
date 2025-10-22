import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // ERROR VALIDATION
        const newErrors = {};

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
            setIsSuccess(true);
            setTimeout(() => {
                alert(`Password changed successfully! You will be redirected to the login page (This is a demo)`);
                navigate("/login");
            }, 2000);
        }
    }

    if (isSuccess) {
        return (
            <div className='reset-wrapper'>
                <div className='reset-container'>
                    {/* Left Side - Branding */}
                    <div className='reset-branding'>
                        <div className='reset-branding-content' >
                            <Link to={"/"}>
                                <div className='reset-logo' title="Back to the Homepage">
                                    <span className='reset-logo-icon'>🔐</span>
                                    <h1 className='reset-logo-text'>AmaliSpend</h1>
                                </div>
                            </Link>
                            <p className='reset-tagline'>Your account security is our priority</p>
                            <div className='reset-features'>
                                <div className='reset-feature-item'>
                                    <span className='reset-feature-icon'>✓</span>
                                    <span>Secure password reset</span>
                                </div>
                                <div className='reset-feature-item'>
                                    <span className='reset-feature-icon'>✓</span>
                                    <span>Account protection</span>
                                </div>
                                <div className='reset-feature-item'>
                                    <span className='reset-feature-icon'>✓</span>
                                    <span>Quick access restored</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Success Message */}
                    <div className='reset-form-section'>
                        <div className='reset-form-container'>
                            <div className='reset-success-content'>
                                <div className='reset-success-icon'>✅</div>
                                <h2 className='reset-success-title'>Password Reset Successfully!</h2>
                                <p className='reset-success-subtitle'>
                                    Your password has been updated and your account is secure.
                                </p>
                                <p className='reset-success-instructions'>
                                    You can now log in with your new password. You will be redirected to the login page shortly.
                                </p>
                                <div className='reset-actions'>
                                    <Link to="/login" className='reset-login-btn'>
                                        Go to Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='reset-wrapper'>
            <div className='reset-container'>
                {/* Left Side - Branding */}
                <div className='reset-branding'>
                    <div className='reset-branding-content'>
                        <Link to={"/"}>
                            <div className='reset-logo' title="Back to the Homepage">
                                <span className='reset-logo-icon'>🔐</span>
                                <h1 className='reset-logo-text'>AmaliSpend</h1>
                            </div>
                        </Link>

                        <p className='reset-tagline'>Create a strong new password to secure your account</p>
                        <div className='reset-features'>
                            <div className='reset-feature-item'>
                                <span className='reset-feature-icon'>✓</span>
                                <span>Strong password requirements</span>
                            </div>
                            <div className='reset-feature-item'>
                                <span className='reset-feature-icon'>✓</span>
                                <span>Secure account protection</span>
                            </div>
                            <div className='reset-feature-item'>
                                <span className='reset-feature-icon'>✓</span>
                                <span>Quick access restoration</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Reset Password Form */}
                <div className='reset-form-section'>
                    <div className='reset-form-container'>
                        <div className='reset-form-header'>
                            <h2 className='reset-form-title'>Reset Password</h2>
                            <p className='reset-form-subtitle'>Create a new secure password for your account</p>
                        </div>

                        <form onSubmit={handleResetPassword} className='reset-form'>
                            <div className='reset-input-group'>
                                <label htmlFor="password" className='reset-label'>
                                    <span className='reset-label-icon'>🔒</span>
                                    New Password
                                </label>
                                <div className='reset-password-wrapper'>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        placeholder='Create a strong password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='reset-input'
                                        required
                                    />
                                    <button
                                        type="button"
                                        className='reset-password-toggle'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.password && <div className="reset-error">{errors.password}</div>}
                            </div>

                            <div className='reset-input-group'>
                                <label htmlFor="confirmPassword" className='reset-label'>
                                    <span className='reset-label-icon'>🔒</span>
                                    Confirm Password
                                </label>
                                <div className='reset-password-wrapper'>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        placeholder='Confirm your new password'
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                        className='reset-input'
                                        required
                                    />
                                    <button
                                        type="button"
                                        className='reset-password-toggle'
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.confirmPassword && <div className="reset-error">{errors.confirmPassword}</div>}
                            </div>

                            <button type='submit' className='reset-submit-btn'>
                                Reset Password
                            </button>
                        </form>

                        <div className='reset-divider'>
                            <span className='reset-divider-text'>or</span>
                        </div>

                        <div className='reset-login-prompt'>
                            Remember your password?
                            <Link to={"/login"} className='reset-login-link'>
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;