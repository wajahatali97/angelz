import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../campaigns/FormField.jsx";
import Button from "../components/ThemeButton.jsx"; 
import SocialLogin from "../components/SocialLogin.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("API Response:", data);

      if (res.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("authChange"));
        navigate("/dashboard");
      } else {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (
          storedUser &&
          storedUser.email === email &&
          storedUser.password === password
        ) {
          window.dispatchEvent(new Event("authChange"));
          navigate("/dashboard");
        } else {
          alert(data.message || "Invalid credentials, please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        window.dispatchEvent(new Event("authChange"));
        navigate("/dashboard");
      } else {
        alert("Server se connect nahi ho saka. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="relative bg-white rounded-3xl shadow-lg w-[668px] min-h-[700px] p-10 flex flex-col justify-center">
        {/* 👇 Centered content */}
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Welcome back!</h2>
          <p className="text-gray-500 text-center mb-10">
            Welcome again, you have been missed!
          </p>

          <form onSubmit={handleLogin}>
            <FormField
              label="Email"
              type="email"
              placeholder="volunteer.angel@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormField
              label="Password"
              type="password"
              placeholder="*******"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end mb-4">
              <a href="#" className="text-blue-500 text-sm">
                Forgot Password?
              </a>
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2">
              Log in
            </Button>
          </form>

          <p className="text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup
            </Link>
          </p>

          {/* 👇 Social Login */}
          <div className="mt-8">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
