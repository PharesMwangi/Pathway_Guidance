import { useState } from "react";
import { signIn } from "../../lib/auth";

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
        <form onSubmit={handleLogin}>
            <h2>LogIn</h2>

            <input 
                type="email" 
                placeholsrt="john@school.com"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                type="password" 
                placeholsrt="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Log-In</button>
        </form>
    )
}