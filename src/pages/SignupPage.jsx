import React, { useState } from "react";
import FormField from "../campaigns/FormField.jsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ThemeButton.jsx"; // 👈 import

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        type: form.type,
        contact_no: "03101292626",
      };

      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log("Signup API Response:", data);

      if (res.ok) {
        setSuccess("Signup successful! Please login now.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 w-full max-w-4xl mx-auto mt-14">
      <div className="relative bg-white rounded-3xl shadow-[0_0px_25px_-3px_var(--tw-shadow-color),_0_0px_4px_-44px_var(--tw-shadow-color)] shadow-gray-500/80 w-full p-6">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <p className="text-gray-500 text-center mb-6">
          Welcome again you have been missed!
        </p>

        <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
          <FormField
            label="Full Name"
            type="text"
            name="name"
            placeholder="Joe Adams"
            value={form.name}
            onChange={handleChange}
          />
          <FormField
            label="Email"
            type="email"
            name="email"
            placeholder="joe@mail.com"
            value={form.email}
            onChange={handleChange}
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
          />
          <FormField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <FormField
            label="Type"
            type="select"
            name="type"
            options={[
              { label: "Organization", value: "organization" },
              { label: "Volunteer", value: "volunteer" },
            ]}
            value={form.type}
            onChange={handleChange}
          />

          {/* ✅ Reusable Button Component */}
          <Button type="submit" loading={loading}>
            Create Account
          </Button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        </p>

        <div className="flex justify-center space-x-4 mt-6">
          <button className="border p-2 rounded-lg hover:shadow">
            <img
              src="https://img.icons8.com/?size=100&id=JvOSspDsPpwP&format=png&color=000000"
              alt="Google"
              className="h-6 w-6"
            />
          </button>
          <button className="border p-2 rounded-lg hover:shadow">
            <img
              src="https://img.icons8.com/?size=100&id=890&format=png&color=000000"
              alt="Apple"
              className="h-6 w-6"
            />
          </button>
          <button className="border p-2 rounded-lg hover:shadow">
            <img
              src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"
              alt="Facebook"
              className="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
