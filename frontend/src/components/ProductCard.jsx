import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
  FaStar
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

import "../styles/productCard.css";


function ProductCard({ product }) {

  const { addToCart } = useCart();

  const [imageError, setImageError] = useState(false);

  const [isWishlisted, setIsWishlisted] = useState(false);


  /*
   * Convert database image path into
   * a path that React/Vite can display.
   *
   * Example:
   *
   * /products/bira.png
   *        ↓
   * /products/bira.png
   *
   * public/products/bira.png
   *        ↓
   * /products/bira.png
   */
  const getImageUrl = (image) => {

    if (!image) {
      return "";
    }

    // Base64 image
    if (image.startsWith("data:image")) {
      return image;
    }

    // Full URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // Already correct path
    if (image.startsWith("/")) {
      return image;
    }

    // Remove "public/" from database path
    if (image.startsWith("public/")) {
      return "/" + image.substring(7);
    }

    // Any other relative path
    return "/" + image;
  };


  /*
   * ADD TO CART
   */
  const handleAddToCart = (e) => {

    e.preventDefault();
    e.stopPropagation();

    addToCart(product);

  };


  /*
   * WISHLIST
   */
  const handleWishlist = (e) => {

    e.preventDefault();
    e.stopPropagation();

    setIsWishlisted(!isWishlisted);

  };


  /*
   * IMAGE ERROR
   */
  const handleImageError = () => {

    console.error(
      "Image could not be loaded:",
      product.image
    );

    setImageError(true);

  };


  return (

    <div className="product-card">


      {/* OFFER */}

      {product.offer && (

        <span className="offer-badge">
          {product.offer}
        </span>

      )}


      {/* WISHLIST */}

      <button
        type="button"
        className={`wishlist-btn ${
          isWishlisted
            ? "wishlist-active"
            : ""
        }`}
        onClick={handleWishlist}
        aria-label={
          isWishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >

        <FaHeart />

      </button>


      {/* PRODUCT */}

      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >


        {/* IMAGE */}

        <div className="product-image">

          {product.image && !imageError ? (

            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="product-real-image"
              onError={handleImageError}
              loading="lazy"
            />

          ) : (

            <div className="no-product-image">

              <span>
                🍹
              </span>

              <small>
                No Image
              </small>

            </div>

          )}

        </div>


        {/* NAME */}

        <h3 className="product-name">
          {product.name}
        </h3>


        {/* VOLUME */}

        {product.volume && (

          <small className="product-volume">
            {product.volume}
          </small>

        )}


        {/* CATEGORY */}

        {product.category && (

          <p className="product-category">
            {product.category}
          </p>

        )}


        {/* RATING */}

        <div className="rating">

          <FaStar />

          <span>
            {Number(product.rating || 0).toFixed(1)}
          </span>

        </div>


        {/* PRICE */}

        <div className="price-row">

          <h4>

            ₹
            {Number(
              product.price || 0
            ).toLocaleString("en-IN")}

          </h4>

        </div>


      </Link>


      {/* ADD TO CART */}

      <button
        type="button"
        className="add-cart-btn"
        onClick={handleAddToCart}
      >

        <FaShoppingCart />

        <span>
          Add to Cart
        </span>

      </button>


    </div>

  );

}


export default ProductCard;