import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaBell,
  FaShoppingCart,
  FaUserCircle,
  FaSearch
} from "react-icons/fa";

import { useLocation } from "../context/LocationContext";
import { useCart } from "../context/CartContext";

import products from "../data/products";

import "../styles/navbar.css";


function Navbar() {

  const navigate = useNavigate();

  const { location } = useLocation();

  const { totalItems } = useCart();

  const [search, setSearch] = useState("");


  /* =========================================================
     SEARCH PRODUCTS
  ========================================================= */

  const filteredProducts =
    search.trim() === ""
      ? []
      : products.filter((product) => {

          const searchText =
            search.toLowerCase().trim();

          return (
            product.name
              ?.toLowerCase()
              .includes(searchText) ||

            product.category
              ?.toLowerCase()
              .includes(searchText)
          );

        });


  /* =========================================================
     CLEAR SEARCH
  ========================================================= */

  const handleProductClick = () => {

    setSearch("");

  };


  /* =========================================================
     IMAGE CHECK
     
     Supports:
     - HTTP images
     - HTTPS images
     - Base64 images
     - Relative image paths
     - Data URLs
  ========================================================= */

  const isImageSource = (image) => {

    if (!image || typeof image !== "string") {
      return false;
    }

    const value = image.trim();

    return (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("data:image/") ||
      value.startsWith("/") ||
      value.startsWith("./") ||
      value.startsWith("../") ||
      value.startsWith("blob:")
    );

  };


  /* =========================================================
     IMAGE ERROR HANDLER
  ========================================================= */

  const handleImageError = (e) => {

    e.currentTarget.style.display = "none";

    const fallback =
      e.currentTarget.parentElement
        ?.querySelector(".search-image-fallback");

    if (fallback) {
      fallback.style.display = "flex";
    }

  };


  return (

    <nav className="navbar">


      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}

      <div className="navbar-top">


        {/* LOGO */}

        <Link
          to="/home"
          className="logo"
        >
          Drink<span>It</span>
        </Link>


        {/* NAVBAR ICONS */}

        <div className="navbar-icons">


          {/* Notifications */}

          <button
            className="icon-btn"
            type="button"
            onClick={() =>
              navigate("/notifications")
            }
            aria-label="Notifications"
          >

            <FaBell />

          </button>


          {/* Cart */}

          <Link
            to="/cart"
            className="icon-btn cart-icon"
            aria-label="Shopping cart"
          >

            <FaShoppingCart />

            {totalItems > 0 && (

              <span className="cart-badge">
                {totalItems}
              </span>

            )}

          </Link>


          {/* Profile */}

          <Link
            to="/profile"
            className="icon-btn"
            aria-label="Profile"
          >

            <FaUserCircle />

          </Link>


        </div>

      </div>


      {/* =====================================================
          LOCATION
      ===================================================== */}

      <div
        className="location-box"
        onClick={() =>
          navigate("/location")
        }
      >

        <FaMapMarkerAlt
          className="location-icon"
        />


        <div>

          <small>
            Deliver to
          </small>


          <h6>

            {location ||
              "Select Location"}

          </h6>

        </div>

      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="search-container">


        <div className="search-box">


          <FaSearch
            className="search-icon"
          />


          <input
            type="text"
            placeholder="Search beer, whisky, wine..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          {/* Clear Button */}

          {search && (

            <button
              type="button"
              className="search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>

          )}

        </div>


        {/* =================================================
            SEARCH RESULTS
        ================================================= */}

        {search.trim() !== "" && (

          <div className="search-results">


            {filteredProducts.length > 0 ? (

              filteredProducts.map(
                (product) => (

                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="search-item"
                    onClick={
                      handleProductClick
                    }
                  >


                    {/* =====================================
                        PRODUCT IMAGE
                    ===================================== */}

                    {/* Product Image */}

<span className="search-image">

  {product.image ? (

    <img
      src={product.image}
      alt={product.name}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />

  ) : (

    <span className="search-image-fallback">
      🥤
    </span>

  )}

</span>

                         


                    {/* =====================================
                        PRODUCT INFORMATION
                    ===================================== */}

                    <div className="search-product-info">


                      <h4>
                        {product.name}
                      </h4>


                      <small>

                        {product.category}

                        {product.volume && (
                          <>
                            {" • "}
                            {product.volume}
                          </>
                        )}

                      </small>


                    </div>


                    {/* =====================================
                        PRICE
                    ===================================== */}

                    <strong className="search-price">

                      ₹{product.price}

                    </strong>


                  </Link>

                )

              )

            ) : (

              <div className="no-results">

                <FaSearch />

                <span>
                  No products found for "{search}"
                </span>

              </div>

            )}


          </div>

        )}

      </div>

    </nav>

  );

}


export default Navbar;