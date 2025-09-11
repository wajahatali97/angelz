import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../campaigns/FormField.jsx";
import { Link } from "react-router-dom";
import Button from "../components/ThemeButton.jsx"; // ✅ Button component import

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
      // 🔹 API call
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
    <div className="fixed inset-0 flex items-center justify-center z-0">
      <div className="relative bg-white rounded-3xl shadow-lg w-full max-w-[667px]">
        <div className="p-6 max-w-96 w-full mx-auto py-10">
          <h2 className="text-2xl font-bold text-center">Welcome back!</h2>
          <p className="text-gray-500 text-center mb-6">
            Welcome again, you have been missed!
          </p>

          <form onSubmit={handleLogin}>
            <FormField
              label="Client ID"
              type="text"
              placeholder="volunteer.angel@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormField
              label="Password"
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end mb-4">
              <a href="#" className="text-blue-500 text-sm">
                Forgot Password?
              </a>
            </div>

            {/* ✅ Reusable Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
            >
              Log in
            </Button>
          </form>

          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
