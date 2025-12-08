// Login.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userLogin } from "../services/auth";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import { Toaster, toast } from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const [inputsError, setInputsError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useSelector((state) => state.theme.mode);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInputs({
      ...loginInputs,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "email") {
      setInputsError({
        ...inputsError,
        emailError:
          e.target.value.length < 3
            ? "Email must be at least 3 characters"
            : e.target.value.trim() === ""
            ? "Email cannot be empty"
            : !e.target.value.includes("@")
            ? "Please enter a valid email"
            : "",
      });
    }

    if (e.target.name === "password") {
      setInputsError({
        ...inputsError,
        passwordError:
          e.target.value.length < 8
            ? "Password must be at least 8 characters"
            : e.target.value.trim() === ""
            ? "Password cannot be empty"
            : "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent submit if errors exist
    if (inputsError.emailError || inputsError.passwordError) {
      toast.error("Please fix form errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      // you'll keep your userLogin logic - show toast & redirect as before
      const user = await userLogin(loginInputs.email, loginInputs.password);

      // clear inputs
      setLoginInputs({ email: "", password: "" });
      toast.success("Logged in successfully");
      const userToken = user?.user?.accessToken;
      if (userToken) localStorage.setItem("token", userToken);

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // shared classes
  const cardBg =
    theme === "dark" ? "bg-gray-800 text-gray-50" : "bg-white text-gray-900";
  const inputBg =
    theme === "dark"
      ? "bg-gray-700/40 text-gray-50 placeholder-gray-300"
      : "bg-gray-50 text-gray-900 placeholder-gray-500";
  const accent = "bg-indigo-600 hover:bg-indigo-700";

  return (
    <div className={`min-h-[70vh] flex items-center justify-center py-10 px-4`}>
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl overflow-hidden transform transition-all duration-200 ${cardBg} border ${
          theme === "dark" ? "border-gray-700" : "border-gray-100"
        }`}
      >
        {/* Header / brand */}
        <div className="flex items-center gap-4 px-6 py-6">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white ${
              theme === "dark" ? "bg-indigo-700" : "bg-indigo-600"
            }`}
          >
            AP
          </div>
          <div>
            <h2 className="text-lg font-semibold">Welcome back</h2>
            <p className="text-sm text-gray-400">Login to your account</p>
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div
              className={`flex items-center gap-2 rounded-md border ${
                theme === "dark" ? "border-gray-600" : "border-gray-200"
              } px-3 py-2 ${inputBg}`}
            >
              <Mail
                size={16}
                className={theme === "dark" ? "text-gray-200" : "text-gray-500"}
              />
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={loginInputs.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-sm"
                aria-invalid={!!inputsError.emailError}
                aria-describedby="email-error"
              />
            </div>
            {inputsError.emailError && (
              <p
                id="email-error"
                className="mt-1 text-xs text-red-400 font-medium"
              >
                {inputsError.emailError}
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
              className={`flex items-center gap-2 rounded-md border ${
                theme === "dark" ? "border-gray-600" : "border-gray-200"
              } px-3 py-2 ${inputBg}`}
            >
              <Lock
                size={16}
                className={theme === "dark" ? "text-gray-200" : "text-gray-500"}
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={loginInputs.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-sm"
                aria-invalid={!!inputsError.passwordError}
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
            {inputsError.passwordError && (
              <p
                id="password-error"
                className="mt-1 text-xs text-red-400 font-medium"
              >
                {inputsError.passwordError}
              </p>
            )}
          </div>

          {/* actions */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 ${accent} text-white px-4 py-2 rounded-md font-semibold shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* footer small */}
          <div className="pt-2 text-center text-sm text-gray-400">
            <span>Don&apos;t have an account?</span>{" "}
            <Link to="/register" className="text-indigo-300 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
