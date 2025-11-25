import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", { username, email, password });
      const data = res.data;

      if (res.status >= 200 && res.status < 300) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f6f8]">
      <Card className="w-[400px] rounded-2xl border border-gray-200 shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-black">
            Create your account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Username</label>
              <Input
                type="text"
                className="bg-white border-gray-300 text-black placeholder:text-gray-400"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Email</label>
              <Input
                type="email"
                className="bg-white border-gray-300 text-black placeholder:text-gray-400"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">Password</label>
              <Input
                type="password"
                className="bg-white border-gray-300 text-black placeholder:text-gray-400"
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Primary CTA (black button like "Sign In" in navbar) */}
            <Button
              type="submit"
              className="w-full py-2 rounded-full bg-black text-white font-medium hover:bg-black/90 transition"
            >
              Sign Up
            </Button>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-black font-medium hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
