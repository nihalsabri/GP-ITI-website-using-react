// src/components/Register.jsx
import React, { useState } from "react";
import { userRegister } from "../services/auth";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "./Input";
import { User, Mail, Lock, Eye, EyeOff, Image, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let msg = "";

    if (
      (name === "firstName" || name === "lastName") &&
      value.trim().length < 2
    )
      msg = t(
        name === "firstName" ? "First name too short" : "Last name too short"
      );

    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      msg = t("Invalid email");

    if (name === "password" && value.length < 8)
      msg = t("Password must be 8+ characters");

    if (name === "confirmPassword" && value !== formData.password)
      msg = t("Passwords do not match");

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
      toast.error(t("Fix form errors first"));
      return;
    }

    setLoading(true);

    try {
      const firstName = formData.firstName.trim();
      const lastName = formData.lastName.trim();
      const displayName = `${firstName} ${lastName}`.trim();

      await userRegister(formData.email.trim(), formData.password, {
        name: displayName,
        firstName,
        lastName,
        email: formData.email.trim(),
        phone: "",
        address: formData.address.trim(),
        profilePic: formData.profilePic.trim(),
        orders: [],
        createdAt: new Date().toISOString(),
      });

      toast.success(t("Registered successfully — please login"));

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
        address: "",
      });

      navigate("/login");
    } catch (err) {
      console.error("register failed:", err.code, err.message);

      if (err.code === "auth/email-already-in-use")
        toast.error(t("Email already in use"));
      else toast.error(t("Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  const cardBg =
    theme === "dark" ? "bg-gray-800 text-gray-50" : "bg-white text-gray-900";

  const inputBg =
    theme === "dark"
      ? "bg-gray-700/40 text-gray-50"
      : "bg-gray-50 text-gray-900";

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
              <h2 className="text-lg font-semibold">
                {t("Create your account")}
              </h2>
              <p className="text-sm text-gray-400">{t("Join our platform")}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
            {/* First Name */}
            <div>
              <label className="text-sm font-medium">{t("First name")}</label>
              <div
                className={`flex items-center gap-2 border rounded-md px-3 py-2 ${inputBg}`}
              >
                <User size={16} />
                <Input
                  name="firstName"
                  placeholder={t("First name")}
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {errors.firstName && (
                <p className="text-xs text-red-400">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium">{t("Last name")}</label>
              <div
                className={`flex items-center gap-2 border rounded-md px-3 py-2 ${inputBg}`}
              >
                <User size={16} />
                <Input
                  name="lastName"
                  placeholder={t("Last name")}
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {errors.lastName && (
                <p className="text-xs text-red-400">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">{t("Email")}</label>
              <div
                className={`flex items-center gap-2 border rounded-md px-3 py-2 ${inputBg}`}
              >
                <Mail size={16} />
                <Input
                  name="email"
                  placeholder={t("Email")}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label className="text-sm font-medium">
                {t("Profile Image URL")}
              </label>
              <div
                className={`flex items-center gap-2 border rounded-md px-3 py-2 ${inputBg}`}
              >
                <Image size={16} />
                <Input
                  name="profilePic"
                  placeholder="https://image-link.com/photo.jpg"
                  value={formData.profilePic}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium">{t("Address")}</label>
              <div
                className={`flex items-center gap-2 border rounded-md px-3 py-2 ${inputBg}`}
              >
                <MapPin size={16} />
                <Input
                  name="address"
                  placeholder={t("Street, City, Area")}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">{t("Password")}</label>
              <div
                className={`flex items-center gap-2 border rounded-md px-3 py-2 ${inputBg}`}
              >
                <Lock size={16} />
                <Input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder={t("Password")}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
                <button type="button" onClick={() => setShowPass((v) => !v)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium">
                {t("Confirm Password")}
              </label>
              <div
                className={`flex items-center gap-2 border rounded-md px-3 py-2 ${inputBg}`}
              >
                <Lock size={16} />
                <Input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder={t("Repeat password")}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                />
                <button type="button" onClick={() => setShowConfirm((v) => !v)}>
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
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-md"
            >
              {loading ? t("Signing up...") : t("Sign Up")}
            </button>

            <p className="text-center text-sm mt-3">
              {t("Already have an account?")}{" "}
              <Link to="/login" className="text-indigo-400">
                {t("Login")}
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
