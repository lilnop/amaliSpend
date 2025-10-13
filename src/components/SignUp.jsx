import { useState } from 'react';

export default function Signup({ onSignUp, setShowSignup }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // ERROR VALIDATIONb
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
            alert(`Account created successfully for ${name}! (This is a demo)`);
            onSignUp({ name, email, password, confirmPassword });
        }

    }

    return (
        <section >
            <p className='subtitle'>Signup to manage your expenses</p>
            <div className='form-group'>
                <label htmlFor="name">Name</label>
                <input
                    value={name}
                    id='name'
                    type="text"
                    placeholder='Enter full name'
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className='form-group'>
                <label htmlFor="email">Email</label>
                <input
                    id='email'
                    value={email}
                    type="email"
                    placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    id='password'
                    type="password"
                    value={password}
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="error">{errors.password}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id='confirmPassword'
                    type="password"
                    name='confirmPassword'
                    value={confirmPassword}
                    placeholder='Confirm password'
                    onChange={(e) => setconfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>

            <button onClick={handleSubmit}>Sign Up</button>

            <div className='signup-link'>
                Already have an account? <a href='#'
                    onClick={(e) => {
                        e.preventDefault();
                        setShowSignup(true)
                    }}>Login</a>
            </div>
        </section>
    )

}