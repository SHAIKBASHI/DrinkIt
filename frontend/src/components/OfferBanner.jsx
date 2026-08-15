import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/offerBanner.css";

function OfferBanner() {

  const navigate = useNavigate();

  return (
    <section className="offer-banner">

      <div className="offer-content">

        <span className="offer-tag">
          🔥 Limited Time Offer
        </span>

        <h2>Weekend Party Sale</h2>

        <p>
          Enjoy up to <strong>30% OFF</strong> on selected beers,
          whiskies, wines and vodkas.
        </p>

        <button
          className="offer-btn"
          onClick={() => navigate("/categories")}
        >
          Shop Now
          <FaArrowRight />
        </button>

      </div>

      <div className="offer-image">
        🍻
      </div>

    </section>
  );
}

export default OfferBanner;