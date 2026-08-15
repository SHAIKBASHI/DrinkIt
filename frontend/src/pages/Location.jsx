import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../context/LocationContext";
import "../styles/location.css";

function Location() {

  const navigate = useNavigate();

  const { updateLocation } = useLocation();

  const [city, setCity] = useState("");

  const cities = [
    "Visakhapatnam",
    "Hyderabad",
    "Vijayawada",
    "Bengaluru",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Pune"
  ];

  const continueHandler = () => {

    if (city.trim() === "") {

      alert("Please select a city");

      return;

    }

    updateLocation(city);

    navigate("/home");

  };

  return (

    <div className="location-page">

      <div className="location-card">

        <h1>📍 Choose Your Delivery Location</h1>

        <p>Select your city to continue</p>

        <input
          type="text"
          placeholder="Enter your city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <div className="city-list">

          {cities.map((item) => (

            <button
              key={item}
              onClick={() => setCity(item)}
            >
              {item}
            </button>

          ))}

        </div>

        <button
          className="continue-location"
          onClick={continueHandler}
        >
          Continue
        </button>

      </div>

    </div>

  );

}

export default Location;