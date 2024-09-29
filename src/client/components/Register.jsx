import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register({ token, setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleRegistration(event) {
        event.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:3000/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username, password, email
                    }),
                }
            );

            const result = await response.json();
            setToken(result.token);

            navigate("/users/me");

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="register-form">
            {error && <p>{error}</p>}
            
            <form  onSubmit={handleRegistration}>
                <div>
                    <h2>Register</h2>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <button type="submit">Login</button>
                
            </form>
            </div>
        
    )
};