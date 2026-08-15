import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaCog,
    FaBell,
    FaMapMarkerAlt,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaSignOutAlt,
    FaPen,
    FaCheck,
    FaTimes,
    FaArrowLeft,
    FaShieldAlt,
    FaSave
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import { updateProfile } from "../data/authService";

import "../styles/settings.css";


function Settings() {

    const navigate = useNavigate();

    const {
        user,
        updateUser,
        logout
    } = useAuth();


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    const [notifications, setNotifications] =
        useState(true);


    /* =====================================================
       EDIT STATE
    ===================================================== */

    const [editingName, setEditingName] =
        useState(false);

    const [editingEmail, setEditingEmail] =
        useState(false);


    const [nameValue, setNameValue] =
        useState("");

    const [emailValue, setEmailValue] =
        useState("");


    /* =====================================================
       SAVE STATE
    ===================================================== */

    const [savingName, setSavingName] =
        useState(false);

    const [savingEmail, setSavingEmail] =
        useState(false);


    /* =====================================================
       LOAD USER + PREFERENCES
    ===================================================== */

    useEffect(() => {

        if (!user) {
            return;
        }

        setNameValue(
            user.fullName || ""
        );

        setEmailValue(
            user.email || ""
        );


        const savedNotifications =
            localStorage.getItem(
                "notificationPreference"
            );


        if (savedNotifications !== null) {

            setNotifications(
                savedNotifications === "true"
            );

        }

    }, [user]);


    /* =====================================================
       NOTIFICATION CHANGE
    ===================================================== */

    const handleNotificationChange = (value) => {

        setNotifications(value);

        localStorage.setItem(
            "notificationPreference",
            String(value)
        );

    };


    /* =====================================================
       START EDIT NAME
    ===================================================== */

    const startNameEdit = () => {

        setNameValue(
            user?.fullName || ""
        );

        setEditingName(true);

    };


    /* =====================================================
       SAVE NAME
       BACKEND UPDATE
    ===================================================== */

    const saveName = async () => {

        const trimmedName =
            nameValue.trim();


        if (!trimmedName) {

            alert(
                "Please enter your name."
            );

            return;
        }


        if (trimmedName.length < 2) {

            alert(
                "Name must contain at least 2 characters."
            );

            return;
        }


        try {

            setSavingName(true);


            /*
             * Send BOTH values.
             *
             * Backend expects:
             * fullName
             * email
             *
             * Email remains unchanged here.
             */

            const updatedUser =
                await updateProfile({

                    fullName: trimmedName,

                    email:
                        user.email

                });


            /*
             * Backend returns:
             *
             * new JWT
             * updated user details
             *
             * AuthContext will update
             * localStorage + React state.
             */

            updateUser(updatedUser);


            setNameValue(
                updatedUser.fullName
            );

            setEditingName(false);


        } catch (error) {

            console.error(
                "Error updating name:",
                error
            );


            if (
                error.response?.data?.message
            ) {

                alert(
                    error.response.data.message
                );

            } else {

                alert(
                    "Unable to update your name. Please try again."
                );

            }

        } finally {

            setSavingName(false);

        }

    };


    /* =====================================================
       CANCEL NAME
    ===================================================== */

    const cancelNameEdit = () => {

        setNameValue(
            user?.fullName || ""
        );

        setEditingName(false);

    };


    /* =====================================================
       START EDIT EMAIL
    ===================================================== */

    const startEmailEdit = () => {

        setEmailValue(
            user?.email || ""
        );

        setEditingEmail(true);

    };


    /* =====================================================
       SAVE EMAIL
       BACKEND UPDATE
    ===================================================== */

    const saveEmail = async () => {

        const trimmedEmail =
            emailValue.trim()
                .toLowerCase();


        if (!trimmedEmail) {

            alert(
                "Please enter your email."
            );

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(trimmedEmail)) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }


        /*
         * No need to call backend if
         * email hasn't actually changed.
         */

        if (
            trimmedEmail ===
            user.email.toLowerCase()
        ) {

            setEditingEmail(false);

            return;

        }


        try {

            setSavingEmail(true);


            /*
             * Send BOTH values.
             *
             * Name remains unchanged.
             */

            const updatedUser =
                await updateProfile({

                    fullName:
                        user.fullName,

                    email:
                        trimmedEmail

                });


            /*
             * VERY IMPORTANT
             *
             * Backend generates a NEW JWT
             * because email is the username.
             *
             * AuthContext stores:
             *
             * new token
             * new email
             * updated user
             */

            updateUser(updatedUser);


            setEmailValue(
                updatedUser.email
            );

            setEditingEmail(false);


        } catch (error) {

            console.error(
                "Error updating email:",
                error
            );


            if (
                error.response?.data?.message
            ) {

                alert(
                    error.response.data.message
                );

            } else if (
                error.response?.status === 409
            ) {

                alert(
                    "This email address is already registered."
                );

            } else {

                alert(
                    "Unable to update your email. Please try again."
                );

            }

        } finally {

            setSavingEmail(false);

        }

    };


    /* =====================================================
       CANCEL EMAIL
    ===================================================== */

    const cancelEmailEdit = () => {

        setEmailValue(
            user?.email || ""
        );

        setEditingEmail(false);

    };


    /* =====================================================
       LOGOUT
    ===================================================== */

    const handleLogout = () => {

        logout();

        navigate(
            "/login",
            {
                replace: true
            }
        );

    };


    /* =====================================================
       NOT LOGGED IN
    ===================================================== */

    if (!user) {

        return (

            <div className="settings-page">

                <div className="settings-container">

                    <div className="settings-empty">

                        <div className="settings-empty-icon">
                            <FaUser />
                        </div>

                        <h2>
                            Login Required
                        </h2>

                        <p>
                            Please login to access
                            your account settings.
                        </p>

                        <button
                            className="settings-login-btn"
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Login
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    /* =====================================================
       MAIN PAGE
    ===================================================== */

    return (

        <div className="settings-page">

            <div className="settings-container">


                {/* =================================================
                    TOP HEADER
                ================================================= */}

               <div className="settings-top">

    <button
        className="back-btn"
        onClick={() => navigate("/profile")}
    >
        ← Back to Profile
    </button>

</div>





                {/* =================================================
                    PAGE HEADING
                ================================================= */}

                <div className="settings-heading">

                    <div className="settings-heading-icon">

                        <FaCog />

                    </div>

                    <div>

                        <h1>
                            Settings
                        </h1>

                        <p>
                            Manage your account and preferences
                        </p>

                    </div>

                </div>


                {/* =================================================
                    ACCOUNT
                ================================================= */}

                <div className="settings-card">

                    <div className="settings-card-heading">

                        <div>

                            <h2>
                                Account Information
                            </h2>

                            <p>
                                Manage your personal account details
                            </p>

                        </div>

                        <FaShieldAlt />

                    </div>


                    {/* =================================================
                        NAME
                    ================================================= */}

                    <div className="settings-row">

                        <div className="settings-row-left">

                            <div className="settings-icon">

                                <FaUser />

                            </div>

                            <div>

                                <strong>
                                    Full Name
                                </strong>


                                {!editingName ? (

                                    <span>
                                        {user.fullName ||
                                            "Not available"}
                                    </span>

                                ) : (

                                    <input
                                        className="settings-edit-input"
                                        type="text"
                                        value={nameValue}
                                        onChange={(e) =>
                                            setNameValue(
                                                e.target.value
                                            )
                                        }
                                        autoFocus
                                        disabled={savingName}
                                    />

                                )}

                            </div>

                        </div>


                        {!editingName ? (

                            <button
                                className="edit-btn"
                                onClick={startNameEdit}
                            >

                                <FaPen />

                                <span>
                                    Edit
                                </span>

                            </button>

                        ) : (

                            <div className="edit-actions">

                                <button
                                    className="save-btn"
                                    onClick={saveName}
                                    disabled={savingName}
                                    title="Save"
                                >

                                    {savingName ? (
                                        <span className="settings-spinner">
                                            ⟳
                                        </span>
                                    ) : (
                                        <FaCheck />
                                    )}

                                </button>


                                <button
                                    className="cancel-btn"
                                    onClick={cancelNameEdit}
                                    disabled={savingName}
                                    title="Cancel"
                                >

                                    <FaTimes />

                                </button>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div className="settings-row">

                        <div className="settings-row-left">

                            <div className="settings-icon">

                                <FaEnvelope />

                            </div>

                            <div>

                                <strong>
                                    Email Address
                                </strong>


                                {!editingEmail ? (

                                    <span>
                                        {user.email ||
                                            "Not available"}
                                    </span>

                                ) : (

                                    <input
                                        className="settings-edit-input"
                                        type="email"
                                        value={emailValue}
                                        onChange={(e) =>
                                            setEmailValue(
                                                e.target.value
                                            )
                                        }
                                        autoFocus
                                        disabled={savingEmail}
                                    />

                                )}

                            </div>

                        </div>


                        {!editingEmail ? (

                            <button
                                className="edit-btn"
                                onClick={startEmailEdit}
                            >

                                <FaPen />

                                <span>
                                    Edit
                                </span>

                            </button>

                        ) : (

                            <div className="edit-actions">

                                <button
                                    className="save-btn"
                                    onClick={saveEmail}
                                    disabled={savingEmail}
                                    title="Save"
                                >

                                    {savingEmail ? (
                                        <span className="settings-spinner">
                                            ⟳
                                        </span>
                                    ) : (
                                        <FaCheck />
                                    )}

                                </button>


                                <button
                                    className="cancel-btn"
                                    onClick={cancelEmailEdit}
                                    disabled={savingEmail}
                                    title="Cancel"
                                >

                                    <FaTimes />

                                </button>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        MOBILE
                    ================================================= */}

                    <div className="settings-row">

                        <div className="settings-row-left">

                            <div className="settings-icon">

                                <FaPhone />

                            </div>

                            <div>

                                <strong>
                                    Mobile Number
                                </strong>

                                <span>
                                    {user.mobile
                                        ? `+91 ${user.mobile}`
                                        : "Not available"}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    PREFERENCES
                ================================================= */}

                <div className="settings-card">

                    <div className="settings-card-heading">

                        <div>

                            <h2>
                                Preferences
                            </h2>

                            <p>
                                Customize your DrinkIt experience
                            </p>

                        </div>

                        <FaCog />

                    </div>


                    {/* =================================================
                        NOTIFICATIONS
                    ================================================= */}

                    <div className="settings-row">

                        <div className="settings-row-left">

                            <div className="settings-icon">

                                <FaBell />

                            </div>

                            <div>

                                <strong>
                                    Notifications
                                </strong>

                                <span>
                                    Receive order and reward updates
                                </span>

                            </div>

                        </div>


                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) =>
                                    handleNotificationChange(
                                        e.target.checked
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>


                    {/* =================================================
                        ADDRESSES
                    ================================================= */}

                    <div
                        className="settings-row clickable"
                        onClick={() =>
                            navigate("/addresses")
                        }
                    >

                        <div className="settings-row-left">

                            <div className="settings-icon">

                                <FaMapMarkerAlt />

                            </div>

                            <div>

                                <strong>
                                    Saved Addresses
                                </strong>

                                <span>
                                    Manage your delivery addresses
                                </span>

                            </div>

                        </div>


                        <span className="row-arrow">
                            →
                        </span>

                    </div>

                </div>


                {/* =================================================
                    ACCOUNT NOTE
                ================================================= */}

                <div className="settings-info">

                    <FaShieldAlt />

                    <div>

                        <strong>
                            Your account is protected
                        </strong>

                        <p>
                            Account changes are securely
                            synchronized with your DrinkIt account.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    LOGOUT
                ================================================= */}

                <button
                    className="settings-logout"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    Logout from DrinkIt

                </button>


                <p className="settings-version">
                    DrinkIt Account Settings
                </p>

            </div>

        </div>

    );

}


export default Settings;