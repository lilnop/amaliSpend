import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup({ onSignUp }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
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
        <section className='container'>
            <article className="container-elements">
                <h1>AmaliSpend</h1>
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

                <button className='cta-button-signup' onClick={handleSubmit}>Sign Up</button>

                <div className='signup-link'>
                    Already have an account?
                    <Link to={"/login"}> Login</Link>
                </div>
            </article>

        </section>
    )

}