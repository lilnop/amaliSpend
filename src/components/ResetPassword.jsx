import { useState } from "react";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleResetPassword = (e) => {
        e.preventDefault();

        // ERROR VALIDATION
        const newErrors = {};

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            newErrors.password = "Password must contain a number and an uppercase letter";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert(`Password changed successfully! You will be redirected to the login page(This is a demo)`);
            onSignUp({ name, email, password, confirmPassword });
        }
    }

    return (
        <section>
            <h1>Reset Password</h1>
            <p className='subtitle'>Enter information to reset password</p>
            <form onSubmit={handleResetPassword}>
                <label htmlFor="">New Password</label>
                <input
                    className="input-space"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter new password"
                    name="password"
                    id="password"
                />
                {errors.password && <div className="error">{errors.password}</div>}

                <label htmlFor="">Confirm Password</label>
                <input
                    className="input-space"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password confirmation"
                    name="confirmPassword"
                    id="confirmPassword"
                />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                <button>Request Password</button>
            </form>
        </section>
    )
}

export default ResetPassword;