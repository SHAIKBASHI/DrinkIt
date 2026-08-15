import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

function Hero() {

  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-badge">
          ⚡ Delivery in 15-20 mins
        </span>

        <h1>
          Premium Drinks <br />
          Delivered Fast
        </h1>

        <p>
          Order beer, whisky, wine, vodka and more with
          fast doorstep delivery.
        </p>

        <button
          className="hero-btn"
          onClick={() => navigate("/categories")}
        >
          Shop Now
          <FaArrowRight />
        </button>

      </div>

      <div className="hero-image">
        🍻
      </div>

    </section>
  );
}

export default Hero;