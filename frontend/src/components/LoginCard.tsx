// components/LoginCard.tsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input" // Assuming shadcn/ui Input
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button
import api from "@/lib/api"; // Your backend connection
import type { AxiosError } from 'axios';

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res.data;
      // Store token and userId
      localStorage.setItem("token", data.token);
      if(data.user?.id) localStorage.setItem("userId", data.user.id);
      
      navigate("/home "); // Redirect to home page on success
    } catch(err: unknown) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const serverMessage = axiosErr?.response?.data?.message;
      alert(serverMessage || axiosErr?.message || "Something went wrong during login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full md:w-1/2 bg-gray-50">
      <div className="mb-8">
        {/* Logo Placeholder */}
        <div className="text-3xl font-bold text-black">INKWAVE</div> 
      </div>

      <h2 className="text-2xl font-semibold mb-6">Sign in to your account</h2>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        {/* Email Input */}
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {/* Password Input (Crucial for your use case) */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Sign In Button */}
        <Button 
          type="submit" 
          className="w-full bg-gray-900 text-white p-3 rounded-md hover:bg-black transition-colors"
        >
          Sign In
        </Button>
      </form>

      <a href="/signup" className="mt-6 text-blue-600 hover:underline text-sm">
        Don't have an account? Sign Up
      </a>
      
      <p className="absolute bottom-8 text-xs text-gray-500 text-center px-4">
        By continuing, you agree to our Terms & Conditions and Privacy Policy.
      </p>
    </div>
  );
};

export default LoginCard;