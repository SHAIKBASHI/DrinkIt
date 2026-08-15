import React, { useState } from "react";

import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaShieldAlt
} from "react-icons/fa";

import { login } from "../data/authService";
import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";


function Login() {

    const navigate = useNavigate();

    const location = useLocation();

    const { loginUser } = useAuth();


    const [formData, setFormData] = useState({

        email: "",
        password: ""

    });


    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    /* =====================================================
       HANDLE INPUT
    ===================================================== */

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

        /* Clear error while typing */

        if (error) {
            setError("");
        }

    };


    /* =====================================================
       LOGIN
    ===================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        /* ---------------------------------------------
           VALIDATION
        --------------------------------------------- */

        if (
            !formData.email.trim() ||
            !formData.password
        ) {

            setError(
                "Please enter your email and password."
            );

            return;

        }


        try {

            setLoading(true);


            /* -----------------------------------------
               CALL BACKEND
            ----------------------------------------- */

            const data = await login(formData);


            /* -----------------------------------------
               SAVE LOGIN
            ----------------------------------------- */

            loginUser(data);


            /* -----------------------------------------
               RETURN TO PREVIOUS PAGE
               
               Example:

               Checkout
                   ↓
               Login
                   ↓
               Checkout
            ----------------------------------------- */

            const from =
                location.state?.from;


            if (
                from &&
                from.pathname
            ) {

                navigate(
                    `${from.pathname}${from.search || ""}`,
                    {
                        replace: true
                    }
                );

            } else {

                navigate(
                    "/home",
                    {
                        replace: true
                    }
                );

            }


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            /* -----------------------------------------
               BACKEND MESSAGE
            ----------------------------------------- */

            if (
                error.response?.data?.message
            ) {

                setError(
                    error.response.data.message
                );

            }

            /* -----------------------------------------
               UNAUTHORIZED
            ----------------------------------------- */

            else if (
                error.response?.status === 401
            ) {

                setError(
                    "Invalid email or password."
                );

            }

            /* -----------------------------------------
               SERVER ERROR
            ----------------------------------------- */

            else if (
                error.response?.status >= 500
            ) {

                setError(
                    "Server error. Please try again later."
                );

            }

            /* -----------------------------------------
               CONNECTION ERROR
            ----------------------------------------- */

            else {

                setError(
                    "Unable to login. Please check that the backend is running."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    /* =====================================================
       CHECK WHETHER USER CAME FROM CHECKOUT
    ===================================================== */

    const cameFromCheckout =
        location.state?.from?.pathname === "/checkout";


    return (

        <div className="auth-page">


            {/* =================================================
                DECORATIVE BACKGROUND
            ================================================= */}

            <div
                className="
                    auth-decoration
                    auth-bottle-left
                "
            >
            </div>


            <div
                className="
                    auth-decoration
                    auth-bottle-right
                "
            >
            </div>


            <div
                className="
                    auth-decoration
                    auth-glass
                "
            >
            </div>


            {/* =================================================
                AUTH CARD
            ================================================= */}

            <div className="auth-card">


                {/* =================================================
                    BRAND
                ================================================= */}

                <div className="auth-logo">

                    Drink<span>It</span>

                </div>


                {/* =================================================
                    ICON
                ================================================= */}

                <div className="auth-title-icon">

                    <FaSignInAlt />

                </div>


                {/* =================================================
                    HEADING
                ================================================= */}

                <h1>

                    Welcome Back

                </h1>


                {/* =================================================
                    SUBTITLE
                ================================================= */}

                <p className="auth-subtitle">

                    {cameFromCheckout

                        ? "Login to continue with your checkout."

                        : "Login to continue ordering your favorite drinks."

                    }

                </p>


                {/* =================================================
                    SECURITY MESSAGE
                ================================================= */}

                <div className="auth-secure">

                    <FaShieldAlt />

                    <span>
                        Secure and protected login
                    </span>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="auth-error">

                        {error}

                    </div>

                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div className="auth-input-group">

                        <FaEnvelope />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            disabled={loading}
                        />

                    </div>


                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    <div className="auth-input-group">

                        <FaLock />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            disabled={loading}
                        />

                    </div>


                    {/* =================================================
                        LOGIN BUTTON
                    ================================================= */}

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >

                        <FaSignInAlt />

                        {loading

                            ? "Signing in..."

                            : "Login"

                        }

                    </button>


                </form>


                {/* =================================================
                    REGISTER
                ================================================= */}

                <p className="auth-switch">

                    Don't have an account?

                    {" "}

                    <Link to="/register">

                        Create Account

                    </Link>

                </p>


                {/* =================================================
                    CONTINUE SHOPPING
                ================================================= */}

                <Link
                    to="/home"
                    className="auth-home-link"
                >

                    ← Continue Shopping

                </Link>


            </div>


        </div>

    );

}


export default Login;