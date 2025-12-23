import React, { useState } from "react";
import { userLogin } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import { Toaster, toast } from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setClient } from "../store/orderSlice";

const Login = () => {
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
  const [inputsError, setInputsError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInputs((s) => ({ ...s, [e.target.name]: e.target.value }));

    if (e.target.name === "email") {
      setInputsError((s) => ({
        ...s,
        emailError: !e.target.value.includes("@")
          ? "Please enter a valid email"
          : "",
      }));
    }

    if (e.target.name === "password") {
      setInputsError((s) => ({
        ...s,
        passwordError:
          e.target.value.length < 8
            ? "Password must be at least 8 characters"
            : "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = loginInputs.email.trim();
    const password = loginInputs.password.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const { authResult, profile, token } = await userLogin(email, password);

      // ======================
      // localStorage (keep it)
      // ======================
      localStorage.setItem("token", token);
      localStorage.setItem("client", JSON.stringify(profile));

      // ======================
      // Redux (Order context)
      // ======================
      dispatch(
        setClient({
          id: profile?.id || authResult?.user?.uid,
          name: profile?.name || `${profile?.firstName} ${profile?.lastName}`,
          email: profile?.email || email,
          address: profile?.address || "",
          profilePic: profile?.profilePic || "",
          token,
        })
      );

      toast.success("Logged in successfully");
      setLoginInputs({ email: "", password: "" });
      navigate("/");
    } catch (err) {
      console.error("login failed:", err);

      if (err.code === "auth/invalid-email")
        toast.error("Invalid email address");
      else if (err.code === "auth/user-not-found")
        toast.error("No account found for this email");
      else if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      )
        toast.error("Wrong password");
      else toast.error("Login failed");
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

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 px-4">
      <div className={`w-full max-w-md rounded-2xl shadow-xl border ${cardBg}`}>
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

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <div
              className={`flex items-center border rounded-md px-3 py-2 ${inputBg}`}
            >
              <Mail size={16} />
              <Input
                name="email"
                placeholder="Email"
                value={loginInputs.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
            </div>
            {inputsError.emailError && (
              <p className="text-xs text-red-400">{inputsError.emailError}</p>
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={loginInputs.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="p-1"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {inputsError.passwordError && (
              <p className="text-xs text-red-400">
                {inputsError.passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400">
              Register
            </Link>
          </p>
        </form>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
