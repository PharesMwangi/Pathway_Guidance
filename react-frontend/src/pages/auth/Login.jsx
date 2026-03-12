import { useState } from "react";
import { signIn } from "../../lib/auth";
import { Link } from "react-router-dom";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e){
        e.preventDefault();

        try{
            await signIn(email, password);
            alert("Login successful!");
        }catch(error){
            alert(error.message);
        }
    }

    return(
        <div className="login-container">

            <div className="login-card">

                <h1>Login</h1>
                <p>Sign in with your email</p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>
                    <input 
                        type="email"
                        placeholder="john@school.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input 
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>

                </form>

                <p>
                    No account? <Link to="/signup">Sign Up</Link>
                </p>

            </div>

        </div>
    )
}