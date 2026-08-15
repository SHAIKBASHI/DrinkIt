import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserPlus
} from "react-icons/fa";

import { register } from "../data/authService";
import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.mobile ||
      !formData.password
    ) {

      setError("Please fill in all fields.");

      return;
    }

    if (formData.mobile.length !== 10) {

      setError("Please enter a valid 10-digit mobile number.");

      return;
    }

    if (formData.password.length < 6) {

      setError("Password must contain at least 6 characters.");

      return;
    }

    try {

      setLoading(true);

      const data = await register(formData);

      loginUser(data);

      navigate("/home");

    } catch (error) {

      console.error(error);

      if (error.response?.data?.message) {

        setError(error.response.data.message);

      } else if (error.response?.status === 409) {

        setError("Email or mobile number already exists.");

      } else {

        setError(
          "Unable to create account. Please try again."
        );
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          Drink<span>It</span>
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join DrinkIt and start ordering your favorites.
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="auth-input-group">

            <FaUser />

            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
            />

          </div>

          <div className="auth-input-group">

            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />

          </div>

          <div className="auth-input-group">

            <FaPhone />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile number"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
              autoComplete="tel"
            />

          </div>

          <div className="auth-input-group">

            <FaLock />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />

          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >

            <FaUserPlus />

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

        <p className="auth-switch">

          Already have an account?

          {" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;