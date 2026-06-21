"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // 1. Added password state
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // 2. Prevent form submission refresh
    try {
      // 3. Pass both email and password to the context login function
      await login(email, password); 
      alert("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}> {/* 4. Use a form for better UX */}
      <h1>Login Page</h1>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        required
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} // 5. Added password handler
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}