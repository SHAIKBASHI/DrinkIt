import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

import { getUser } from "../data/authService";
import { getOrdersByUser } from "../data/orderService";

import "../styles/orders.css";

function Orders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    console.log("========== ORDERS PAGE ==========");

    const user = getUser();

    console.log("Logged user:", user);

    if (!user) {

      console.log("No user found in localStorage");

      setError("Please login first.");
      setLoading(false);

      return;
    }

    if (!user.userId) {

      console.log("User ID missing:", user);

      setError("User information is missing.");
      setLoading(false);

      return;
    }

    const loadOrders = async () => {

      try {

        console.log(
          "Calling orders API for user:",
          user.userId
        );

        const data =
          await getOrdersByUser(user.userId);

        console.log(
          "Orders API response:",
          data
        );

        setOrders(data || []);

      } catch (error) {

        console.error(
          "ORDERS API ERROR:",
          error
        );

        console.error(
          "Status:",
          error.response?.status
        );

        console.error(
          "Response:",
          error.response?.data
        );

        setError(
          "Unable to load your orders."
        );

      } finally {

        setLoading(false);

      }

    };

    loadOrders();

  }, []);


  if (loading) {

    return (
      <div className="orders-page">

        <div className="orders-container">

          <h1>📦 My Orders</h1>

          <div className="orders-message">

            <p>
              Loading your orders...
            </p>

          </div>

        </div>

      </div>
    );

  }


  if (error) {

    return (
      <div className="orders-page">

        <div className="orders-container">

          <h1>📦 My Orders</h1>

          <div className="orders-message">

            <p>
              {error}
            </p>

            <button
              className="orders-home-btn"
              onClick={() => navigate("/home")}
            >
              Back to Home
            </button>

          </div>

        </div>

      </div>
    );

  }


  return (

    <div className="orders-page">

      <div className="orders-container">

        <h1>
          📦 My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="empty-orders">

            <div className="empty-orders-icon">

              <FaShoppingBag />

            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              You haven't placed any orders yet.
            </p>

            <button
              className="orders-shop-btn"
              onClick={() => navigate("/home")}
            >
              Start Shopping
            </button>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-card-top">

                  <div>

                    <h3>
                      Order #{order.id}
                    </h3>

                    <p className="order-date">

                      {order.orderDate
                        ? new Date(
                            order.orderDate
                          ).toLocaleString()
                        : "Date unavailable"}

                    </p>

                  </div>

                  <span
                    className={`order-status ${
                      (
                        order.status || "PLACED"
                      ).toLowerCase()
                    }`}
                  >
                    {order.status || "PLACED"}
                  </span>

                </div>


                <div className="order-card-bottom">

                  <div>

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹{order.totalAmount}
                    </strong>

                  </div>

                  <button
                    className="order-view-btn"
                    onClick={() =>
                      alert(
                        `Order #${order.id} details will be added next.`
                      )
                    }
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Orders;