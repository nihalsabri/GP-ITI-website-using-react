// Register.jsx
import React, { useState } from "react";
import { userRegister } from "../services/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "./Input";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // validation
    if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        nameError:
          value.length < 3
            ? "Name must be at least 3 characters"
            : value.trim() === ""
            ? "Name cannot be empty"
            : "",
      }));
    }

    if (name === "username") {
      setErrors((prev) => ({
        ...prev,
        usernameError:
          value.length < 3
            ? "Username must be at least 3 characters"
            : value.trim() === ""
            ? "Username cannot be empty"
            : "",
      }));
    }

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        emailError: !value.includes("@") ? "Please enter a valid email" : "",
      }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        passwordError:
          value.length < 8
            ? "Password must be at least 8 characters"
            : value.trim() === ""
            ? "Password cannot be empty"
            : "",
      }));

      // also validate confirm if already typed
      if (formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPasswordError:
            formData.confirmPassword !== value ? "Passwords do not match" : "",
        }));
      }
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPasswordError:
          value !== formData.password ? "Passwords do not match" : "",
      }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasErrors = () =>
    !!(
      errors.nameError ||
      errors.emailError ||
      errors.usernameError ||
      errors.passwordError ||
      errors.confirmPasswordError
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // final check
    if (hasErrors()) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      // keep your existing register logic
      await userRegister(formData.email, formData.password);

      // optional: clear the form
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });

      toast.success("Registered successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const cardBg =
    theme === "dark" ? "bg-gray-800 text-gray-50" : "bg-white text-gray-900";
  const inputBg =
    theme === "dark"
      ? "bg-gray-700/40 text-gray-50 placeholder-gray-300"
      : "bg-gray-50 text-gray-900 placeholder-gray-500";
  const borderClass = theme === "dark" ? "border-gray-600" : "border-gray-200";

  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center py-10 px-4">
        <div
          className={`w-full max-w-lg rounded-2xl shadow-xl overflow-hidden transform transition-all duration-200 ${cardBg} border ${borderClass}`}
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
              <p className="text-sm text-gray-400">
                Join Tradesmen — quick and easy
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <div
                className={`flex items-center gap-2 rounded-md border ${borderClass} px-3 py-2 ${inputBg}`}
              >
                <User
                  size={16}
                  className={
                    theme === "dark" ? "text-gray-200" : "text-gray-500"
                  }
                />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full bg-transparent outline-none text-sm"
                  aria-describedby="name-error"
                />
              </div>
              {errors.nameError && (
                <p
                  id="name-error"
                  className="mt-1 text-xs text-red-400 font-medium"
                >
                  {errors.nameError}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <div
                className={`flex items-center gap-2 rounded-md border ${borderClass} px-3 py-2 ${inputBg}`}
              >
                <Mail
                  size={16}
                  className={
                    theme === "dark" ? "text-gray-200" : "text-gray-500"
                  }
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none text-sm"
                  aria-describedby="email-error"
                />
              </div>
              {errors.emailError && (
                <p
                  id="email-error"
                  className="mt-1 text-xs text-red-400 font-medium"
                >
                  {errors.emailError}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <div
                className={`flex items-center gap-2 rounded-md border ${borderClass} px-3 py-2 ${inputBg}`}
              >
                <div
                  className={
                    theme === "dark" ? "text-gray-200" : "text-gray-500"
                  }
                >
                  @
                </div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="username"
                  className="w-full bg-transparent outline-none text-sm"
                  aria-describedby="username-error"
                />
              </div>
              {errors.usernameError && (
                <p
                  id="username-error"
                  className="mt-1 text-xs text-red-400 font-medium"
                >
                  {errors.usernameError}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <div
                className={`flex items-center gap-2 rounded-md border ${borderClass} px-3 py-2 ${inputBg}`}
              >
                <Lock
                  size={16}
                  className={
                    theme === "dark" ? "text-gray-200" : "text-gray-500"
                  }
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full bg-transparent outline-none text-sm"
                  aria-describedby="password-error"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="p-1 rounded hover:bg-white/10 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.passwordError && (
                <p
                  id="password-error"
                  className="mt-1 text-xs text-red-400 font-medium"
                >
                  {errors.passwordError}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <div
                className={`flex items-center gap-2 rounded-md border ${borderClass} px-3 py-2 ${inputBg}`}
              >
                <Lock
                  size={16}
                  className={
                    theme === "dark" ? "text-gray-200" : "text-gray-500"
                  }
                />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="w-full bg-transparent outline-none text-sm"
                  aria-describedby="confirm-password-error"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="p-1 rounded hover:bg-white/10 transition"
                  aria-label={
                    showConfirm
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPasswordError && (
                <p
                  id="confirm-password-error"
                  className="mt-1 text-xs text-red-400 font-medium"
                >
                  {errors.confirmPasswordError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded-md font-semibold shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition`}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>

              <div className="text-sm">
                <span className="text-gray-400">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-indigo-300 hover:underline"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Toaster position="top-center" />
    </>
  );
};

export default Register;
