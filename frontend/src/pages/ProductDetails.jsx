import React, { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaHeart,
  FaStar,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaBolt
} from "react-icons/fa";

import {
  Link,
  useParams
} from "react-router-dom";

import { useCart } from "../context/CartContext";

import {
  getProductById,
  getProductsByCategory
} from "../data/productService";

import "../styles/productDetails.css";


function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();


  /* =========================================================
     STATES
  ========================================================= */

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Wishlist state
  const [isWishlisted, setIsWishlisted] = useState(false);


  /* =========================================================
     IMAGE URL
  ========================================================= */

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


    // Already starts with /
    if (image.startsWith("/")) {
      return image;
    }


    // Example:
    // public/products/bira.png
    //
    // becomes:
    // /products/bira.png

    if (image.startsWith("public/")) {
      return "/" + image.substring(7);
    }


    // Example:
    // products/bira.png
    //
    // becomes:
    // /products/bira.png

    return "/" + image;

  };


  /* =========================================================
     LOAD PRODUCT
  ========================================================= */

  useEffect(() => {

    const loadProduct = async () => {

      try {

        setLoading(true);

        setError("");


        // Get selected product

        const data =
          await getProductById(id);


        setProduct(data);


        // Get related products

        if (data && data.category) {

          const related =
            await getProductsByCategory(
              data.category
            );


          const filtered =
            related
              .filter(
                (item) =>
                  String(item.id) !==
                  String(data.id)
              )
              .slice(0, 4);


          setRelatedProducts(filtered);

        } else {

          setRelatedProducts([]);

        }


      } catch (err) {

        console.error(
          "Error loading product:",
          err
        );

        setError(
          "Unable to load product."
        );

        setProduct(null);

      } finally {

        setLoading(false);

      }

    };


    loadProduct();

  }, [id]);


  /* =========================================================
     INCREASE QUANTITY
  ========================================================= */

  const increase = () => {

    setQuantity(
      (previous) =>
        previous + 1
    );

  };


  /* =========================================================
     DECREASE QUANTITY
  ========================================================= */

  const decrease = () => {

    if (quantity > 1) {

      setQuantity(
        (previous) =>
          previous - 1
      );

    }

  };


  /* =========================================================
     WISHLIST TOGGLE
  ========================================================= */

  const handleWishlist = () => {

    setIsWishlisted(
      (previous) => !previous
    );

  };


  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = () => {

    if (!product) {
      return;
    }


    for (
      let i = 0;
      i < quantity;
      i++
    ) {

      addToCart(product);

    }

  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (

      <div className="product-not-found">

        <h2>
          Loading Product...
        </h2>

      </div>

    );

  }


  /* =========================================================
     ERROR / PRODUCT NOT FOUND
  ========================================================= */

  if (error || !product) {

    return (

      <div className="product-not-found">

        <h2>
          {error || "Product Not Found"}
        </h2>


        <Link to="/categories">
          Go Back to Categories
        </Link>

      </div>

    );

  }


  /* =========================================================
     PAGE
  ========================================================= */

  return (

    <div className="product-details-page">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="details-header">


        {/* BACK BUTTON */}

        <Link
          to="/home"
          className="back-btn"
          aria-label="Go back"
        >

          <FaArrowLeft />

        </Link>


        {/* WISHLIST BUTTON */}

        <button
          type="button"
          className={
            `fav-btn ${
              isWishlisted
                ? "wishlist-active"
                : ""
            }`
          }
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >

          <FaHeart />

        </button>


      </div>


      {/* =====================================================
          MAIN PRODUCT
      ===================================================== */}

      <div className="product-details-container">


        {/* ===================================================
            PRODUCT IMAGE
        =================================================== */}

        <div className="product-image-section">

          <div className="big-product">


            {product.image ? (

              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="big-product-image"

                onError={(e) => {

                  console.error(
                    "Product image failed:",
                    product.image
                  );

                  e.currentTarget.style.display =
                    "none";

                }}

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

        </div>


        {/* ===================================================
            PRODUCT INFORMATION
        =================================================== */}

        <div className="details-container">


          {/* CATEGORY */}

          <span className="category">

            {product.category}

          </span>


          {/* NAME */}

          <h1>

            {product.name}

          </h1>


          {/* VOLUME */}

          {product.volume && (

            <p className="volume">

              {product.volume}

            </p>

          )}


          {/* RATING */}

          <div className="rating-row">


            <span className="rating-box">

              <FaStar />

              {Number(
                product.rating || 0
              ).toFixed(1)}

            </span>


            <span className="reviews">

              2,145 Reviews

            </span>


          </div>


          {/* OFFER */}

          {product.offer && (

            <span className="detail-offer">

              {product.offer}

            </span>

          )}


          {/* PRICE */}

          <div className="price-section">

            <h2>

              ₹
              {Number(
                product.price || 0
              ).toLocaleString("en-IN")}

            </h2>

          </div>


          {/* DESCRIPTION */}

          <p className="description">

            {product.description ||
              `Enjoy premium quality ${product.name} with rich taste, authentic flavor and fast doorstep delivery.`}

          </p>


          {/* =================================================
              QUANTITY
          ================================================= */}

          <div className="quantity-section">

            <span>
              Quantity
            </span>


            <div className="quantity-box">


              <button
                type="button"
                onClick={decrease}
                aria-label="Decrease quantity"
              >

                <FaMinus />

              </button>


              <strong>

                {quantity}

              </strong>


              <button
                type="button"
                onClick={increase}
                aria-label="Increase quantity"
              >

                <FaPlus />

              </button>


            </div>

          </div>


          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="features">


            <div className="feature">

              <span className="feature-icon">
                🚚
              </span>

              <span>
                Fast Delivery
              </span>

            </div>


            <div className="feature">

              <span className="feature-icon">
                🥶
              </span>

              <span>
                Serve Chilled
              </span>

            </div>


            <div className="feature">

              <span className="feature-icon">
                🪙
              </span>

              <span>
                Earn Liver Coins
              </span>

            </div>


          </div>


          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div className="action-buttons">


            {/* ADD TO CART */}

            <button
              type="button"
              className="cart-btn"
              onClick={handleAddToCart}
            >

              <FaShoppingCart />

              <span>
                Add To Cart
              </span>

            </button>


            {/* BUY NOW */}

            <button
              type="button"
              className="buy-btn"
              onClick={handleAddToCart}
            >

              <FaBolt />

              <span>
                Buy Now
              </span>

            </button>


          </div>


        </div>

      </div>


      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      {relatedProducts.length > 0 && (

        <section className="related-section">


          <div className="related-header">

            <h2>
              You May Also Like
            </h2>


            <Link to="/categories">

              View All

            </Link>


          </div>


          <div className="related-products">


            {relatedProducts.map(
              (item) => (

                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="mini-card"
                >


                  {/* IMAGE */}

                  <div className="mini-product-image">


                    {item.image ? (

                      <img
                        src={getImageUrl(
                          item.image
                        )}
                        alt={item.name}

                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : (

                      <span>
                        No Image
                      </span>

                    )}


                  </div>


                  {/* NAME */}

                  <h4>

                    {item.name}

                  </h4>


                  {/* VOLUME */}

                  {item.volume && (

                    <small>

                      {item.volume}

                    </small>

                  )}


                  {/* PRICE */}

                  <p>

                    ₹
                    {Number(
                      item.price || 0
                    ).toLocaleString("en-IN")}

                  </p>


                </Link>

              )
            )}


          </div>


        </section>

      )}


    </div>

  );

}


export default ProductDetails;