// src/components/Register.jsx
import React, { useState } from "react";
import { userRegister } from "../services/auth";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "./Input";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let msg = "";
    if (name === "name" && value.trim().length < 3) msg = "Name too short";
    if (name === "username" && value.trim().length < 3)
      msg = "Username too short";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      msg = "Invalid email";
    if (name === "password" && value.length < 8)
      msg = "Password must be 8+ characters";
    if (name === "confirmPassword" && value !== formData.password)
      msg = "Passwords do not match";
    setErrors((p) => ({ ...p, [name]: msg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const hasErrors = () => Object.values(errors).some(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasErrors()) {
      toast.error("Fix form errors first.");
      return;
    }

    setLoading(true);
    try {
      await userRegister(formData.email.trim(), formData.password, {
        name: formData.name.trim(),
        username: formData.username.trim(),
        phone: "",
        profilePic: "",
      });

      // Optional: store a minimal client object for UI (username + initial)
      const username =
        formData.username || formData.name || formData.email.split("@")[0];
      const initial = username ? username[0].toUpperCase() : "U";
      localStorage.setItem("client", JSON.stringify({ username, initial }));

      toast.success("Registered successfully — please login");
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (err) {
      console.error("register failed:", err.code, err.message);
      if (err.code === "auth/email-already-in-use")
        toast.error("Email already in use");
      else toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const cardBg =
    theme === "dark" ? "bg-gray-800 text-gray-50" : "bg-white text-gray-900";
  const inputBg =
    theme === "dark" ? "bg-gray-700/40" : "bg-gray-50 text-gray-900";

  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center py-10 px-4">
        <div
          className={`w-full max-w-lg rounded-2xl shadow-xl border ${cardBg}`}
        >
          <div className="flex items-center gap-4 px-6 py-6">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white ${
                theme === "dark" ? "bg-indigo-700" : "bg-indigo-600"
              }`}
            >
              AP
            </div>
            <div>
              <h2 className="text-lg font-semibold">Create your account</h2>
              <p className="text-sm text-gray-400">Join our platform</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 ${inputBg}`}
              >
                <User size={16} />
                <Input
                  name="name"
                  placeholder="Full name"
                  onChange={handleChange}
                  value={formData.name}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Username</label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 ${inputBg}`}
              >
                <span>@</span>
                <Input
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  value={formData.username}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-400">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 ${inputBg}`}
              >
                <Mail size={16} />
                <Input
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 ${inputBg}`}
              >
                <Lock size={16} />
                <Input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  className="w-full bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="p-1"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <div
                className={`flex items-center border rounded-md px-3 py-2 ${inputBg}`}
              >
                <Lock size={16} />
                <Input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  className="w-full bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="p-1"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-2 rounded-md"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Toaster position="top-center" />
    </>
  );
};

export default Register;
