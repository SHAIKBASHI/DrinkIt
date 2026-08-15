// src/pages/Profile.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaCoins,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaCog,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronRight,
  FaTachometerAlt
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { getOrdersByUser } from "../data/orderService";

import "../styles/profile.css";

function Profile() {

  const navigate = useNavigate();

  const {
    user,
    logout
  } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);


  // =========================================
  // LOAD USER ORDERS
  // =========================================

  useEffect(() => {

    if (!user || !user.userId) {
      setOrders([]);
      setLoadingOrders(false);
      return;
    }

    const loadOrders = async () => {

      try {

        setLoadingOrders(true);

        const data =
          await getOrdersByUser(user.userId);

        setOrders(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(
          "Unable to load profile orders:",
          error
        );

        setOrders([]);

      } finally {

        setLoadingOrders(false);

      }

    };

    loadOrders();

  }, [user]);


  // =========================================
  // STATISTICS
  // =========================================

  const totalOrders = orders.length;

  const totalSpent = orders.reduce(
    (total, order) =>
      total + Number(order.totalAmount || 0),
    0
  );

  const liverCoins =
    Math.floor(totalSpent / 100);

  const deliveredOrders =
    orders.filter(
      (order) =>
        String(order.status || "").toUpperCase() ===
        "DELIVERED"
    ).length;


  // =========================================
  // MENU
  // =========================================

  const menu = [
    {
      id: 1,
      icon: <FaShoppingBag />,
      title: "My Orders",
      path: "/orders"
    },

    {
      id: 2,
      icon: <FaHeart />,
      title: "Wishlist",
      path: "/wishlist"
    },

    {
      id: 3,
      icon: <FaMapMarkerAlt />,
      title: "Saved Addresses",
      path: "/addresses"
    },

    {
      id: 4,
      icon: <FaCoins />,
      title: "Liver Coins",
      path: "/liver-coins"
    },

    {
      id: 5,
      icon: <FaBell />,
      title: "Notifications",
      path: "/notifications"
    },

    {
      id: 6,
      icon: <FaCog />,
      title: "Settings",
      path: "/settings"
    },

    {
      id: 7,
      icon: <FaQuestionCircle />,
      title: "Help & Support",
      path: "/help-support"
    }
  ];


  // =========================================
  // ADMIN MENU
  // =========================================

  if (user?.role === "ADMIN") {

    menu.push({
      id: 8,
      icon: <FaTachometerAlt />,
      title: "Admin Dashboard",
      path: "/admin"
    });

  }


  // =========================================
  // MENU CLICK
  // =========================================

  const handleMenuClick = (item) => {

    if (item.path) {
      navigate(item.path);
    }

  };


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    logout();

    navigate(
      "/login",
      {
        replace: true
      }
    );

  };


  // =========================================
  // NOT LOGGED IN
  // =========================================

  if (!user) {

    return (

      <div className="container-custom">

        <div className="profile-page">

          <div className="profile-card">

            <div className="avatar">
              <FaUserCircle />
            </div>

            <h2>
              Please Login
            </h2>

            <p>
              Login to view your profile.
            </p>

            <button
              className="logout-btn"
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


  // =========================================
  // RECENT ORDERS
  // =========================================

  const recentOrders =
    [...orders]
      .sort((a, b) => {

        const dateA =
          a.orderDate
            ? new Date(a.orderDate).getTime()
            : 0;

        const dateB =
          b.orderDate
            ? new Date(b.orderDate).getTime()
            : 0;

        return dateB - dateA;

      })
      .slice(0, 3);


  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="container-custom">

      <div className="profile-page">


        {/* =====================================
            PROFILE CARD
        ====================================== */}

        <div className="profile-card">

          <div className="avatar">

            <FaUserCircle />

          </div>

          <h2>
            {user.fullName}
          </h2>

          <p>
            {user.email}
          </p>

          <small>
            +91 {user.mobile}
          </small>

          {user.role === "ADMIN" && (

            <span
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "700",
                background: "#222",
                color: "#fff"
              }}
            >
              ADMIN
            </span>

          )}

        </div>


        {/* =====================================
            LIVER COINS
        ====================================== */}

        <div
          className="wallet-card"
          onClick={() =>
            navigate("/liver-coins")
          }
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {

            if (
              e.key === "Enter" ||
              e.key === " "
            ) {
              navigate("/liver-coins");
            }

          }}
        >

          <div>

            <h3>
              Liver Coins
            </h3>

            <p>
              Your Reward Balance
            </p>

          </div>

          <h2>
            {loadingOrders
              ? "..."
              : `${liverCoins} 🪙`}
          </h2>

        </div>


        {/* =====================================
            STATISTICS
        ====================================== */}

        <div className="stats">

          <div className="stat-box">

            <h2>
              {loadingOrders
                ? "..."
                : totalOrders}
            </h2>

            <p>
              Orders
            </p>

          </div>


          <div className="stat-box">

            <h2>

              {loadingOrders
                ? "..."
                : `₹${totalSpent.toLocaleString(
                    "en-IN"
                  )}`}

            </h2>

            <p>
              Spent
            </p>

          </div>


          <div className="stat-box">

            <h2>

              {loadingOrders
                ? "..."
                : deliveredOrders}

            </h2>

            <p>
              Delivered
            </p>

          </div>

        </div>


        {/* =====================================
            MENU
        ====================================== */}

        <div className="menu-card">

          {menu.map((item) => (

            <div
              className="menu-item"
              key={item.id}
              onClick={() =>
                handleMenuClick(item)
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {

                if (
                  e.key === "Enter" ||
                  e.key === " "
                ) {
                  handleMenuClick(item);
                }

              }}
            >

              <div className="left">

                <span className="menu-icon">

                  {item.icon}

                </span>

                <span>
                  {item.title}
                </span>

              </div>

              <FaChevronRight />

            </div>

          ))}

        </div>


        {/* =====================================
            RECENT ORDERS
        ====================================== */}

        <div className="recent-orders">

          <div className="recent-orders-header">

            <h3>
              Recent Orders
            </h3>

            {orders.length > 0 && (

              <button
                className="view-all-btn"
                onClick={() =>
                  navigate("/orders")
                }
              >
                View All
              </button>

            )}

          </div>


          {loadingOrders ? (

            <div className="no-recent-orders">

              <p>
                Loading your orders...
              </p>

            </div>

          ) : recentOrders.length === 0 ? (

            <div className="no-recent-orders">

              <p>
                You haven't placed any orders yet.
              </p>

              <button
                className="orders-shop-btn"
                onClick={() =>
                  navigate("/home")
                }
              >
                Start Shopping
              </button>

            </div>

          ) : (

            recentOrders.map((order) => (

              <div
                className="order"
                key={order.id}
              >

                <div>

                  <h4>
                    Order #{order.id}
                  </h4>

                  <small>

                    {order.orderDate
                      ? new Date(
                          order.orderDate
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          }
                        )
                      : "Date unavailable"}

                    {" • "}

                    {order.status || "PLACED"}

                  </small>

                </div>

                <span>

                  ₹
                  {Number(
                    order.totalAmount || 0
                  ).toLocaleString(
                    "en-IN"
                  )}

                </span>

              </div>

            ))

          )}

        </div>


        {/* =====================================
            LOGOUT
        ====================================== */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          Logout

        </button>


      </div>

    </div>

  );

}

export default Profile;