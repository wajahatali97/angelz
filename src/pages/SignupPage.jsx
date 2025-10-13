import React, { useState } from "react";
import FormField from "../campaigns/FormField.jsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ThemeButton.jsx";
import SocialLogin from "../components/SocialLogin.jsx";

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
        contact_no: form.contact_no || "0000000000", // Default contact number
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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="relative bg-white rounded-3xl shadow-[0_0px_25px_-3px_var(--tw-shadow-color),_0_0px_4px_-44px_var(--tw-shadow-color)] shadow-gray-500/80 w-[971px] h-[788px] p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center mb-3">Create Account</h2>
        <p className="text-gray-500 text-center mb-10">
          Welcome again you have been missed!
        </p>

        <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
          <FormField
            label="Name"
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

          <Button type="submit" loading={loading} className="mt-4 w-full">
            Create Account
          </Button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </form>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        </p>

        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
