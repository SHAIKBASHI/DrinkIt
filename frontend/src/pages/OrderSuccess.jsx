import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orderSuccess.css";

function OrderSuccess() {

  const navigate = useNavigate();

  return (
    <div className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✅
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for your order.
        </p>

        <p>
          Your drinks will be delivered in approximately
          <strong> 15 - 20 minutes.</strong>
        </p>

        <button
          className="track-btn"
          onClick={() => navigate("/tracking")}
        >
          Track Order
        </button>

        <button
          className="home-btn"
          onClick={() => navigate("/home")}
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

export default OrderSuccess;