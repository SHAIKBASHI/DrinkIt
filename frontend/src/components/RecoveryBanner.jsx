import React from "react";
import { FaHeartbeat, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/recoveryBanner.css";

function RecoveryBanner() {

  const navigate = useNavigate();

  return (
    <section className="recovery-banner">

      <div className="recovery-content">

        <span className="recovery-tag">
          💧 Drink Smart
        </span>

        <h2>Recovery Essentials</h2>

        <p>
          Stay refreshed after every celebration with ORS,
          Coconut Water, Energy Drinks and Healthy Snacks.
        </p>

        <button
          className="recovery-btn"
          onClick={() => navigate("/recovery")}
        >
          Explore
          <FaArrowRight />
        </button>

      </div>

      <div className="recovery-image">
        <FaHeartbeat />
      </div>

    </section>
  );
}

export default RecoveryBanner;