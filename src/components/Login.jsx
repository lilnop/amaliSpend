import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // STORES EMAIL AND PASSWORD AS PROPS
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    }

    return (
        <section className='container'>
            <article className='container-elements'>
                <h1>AmaliSpend</h1>
                <p className='subtitle'>Login to manage your expenses</p>
                <div>
                    <label htmlFor="">Email</label>
                    <input
                        value={email}
                        type="email"
                        placeholder='Enter email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        value={password}
                        placeholder='Enter password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="forgot-password">
                    <Link to={"/forgot-password"}> Forgot Password?</Link>
                </div>

                <button className='cta-button-login' onClick={handleSubmit}>Login</button>

                <div className='signup-link'>
                    Don't have an account?
                    <Link to={"/signup"}> Sign Up</Link>
                </div>
            </article>
        </section>
    )
};