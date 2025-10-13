import { useState } from 'react';

export default function Login({onLogin,setShowSignup,setShowForgot}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");     

    // STORES EMAIL AND PASSWORD AS PROPS
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email,password});
    }

    return(
        <div>
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
                <a href="#" onClick={(e) => {e.preventDefault(); 
                    setShowForgot(true)}}>Forgot Password?</a>
            </div>

            <button onClick={handleSubmit}>Login</button>

            <div className='signup-link'>
                Don't have an account? 
                <a href='#' 
                    onClick={(e) => {e.preventDefault(); 
                    setShowSignup(false)}}> Sign Up</a>
            </div> 
             
        </div>
    )
};