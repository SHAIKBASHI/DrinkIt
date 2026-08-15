import React, {
  useEffect,
  useState
} from "react";

import {
  FaTint,
  FaLeaf,
  FaAppleAlt,
  FaHeart,
  FaShoppingCart,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";

import {
  getProductsByCategory
} from "../data/productService";

import { useCart } from "../context/CartContext";

import "../styles/recovery.css";


function Recovery() {

  const {
    addToCart,
    addRecoveryKit
  } = useCart();


  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [addingId, setAddingId] =
    useState(null);

  const [kitAdding, setKitAdding] =
    useState(false);


  // =========================================
  // LOAD RECOVERY PRODUCTS
  // =========================================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);


        const data =
          await getProductsByCategory(
            "Recovery"
          );


        setProducts(
          Array.isArray(data)
            ? data
            : []
        );


      } catch (error) {

        console.error(
          "Error loading recovery products:",
          error
        );

        setProducts([]);


      } finally {

        setLoading(false);

      }

    };


    loadProducts();

  }, []);


  // =========================================
  // PRODUCT ICON
  // =========================================

  const getProductIcon = (name) => {

    const productName =
      String(name || "").toLowerCase();


    if (
      productName.includes("banana")
    ) {

      return <FaAppleAlt />;

    }


    if (
      productName.includes("coconut") ||
      productName.includes("honey")
    ) {

      return <FaLeaf />;

    }


    if (
      productName.includes("buttermilk")
    ) {

      return <FaHeart />;

    }


    return <FaTint />;

  };


  // =========================================
  // ADD PRODUCT
  // =========================================

  const handleAddToCart = async (
    product
  ) => {

    try {

      setAddingId(product.id);


      await addToCart(product);


    } catch (error) {

      console.error(
        "Error adding recovery product:",
        error
      );


    } finally {

      setAddingId(null);

    }

  };


  // =========================================
  // RECOVERY KIT PRODUCTS
  // =========================================

  const kitNames = [
    "ORS Drink",
    "Coconut Water",
    "Bananas",
    "Buttermilk",
    "Honey"
  ];


  const kitProducts =
    products.filter(
      (product) =>
        kitNames.includes(product.name)
    );


  // =========================================
  // KIT PRICE
  // =========================================

  const kitPrice =
    kitProducts.reduce(
      (total, product) =>
        total +
        Number(product.price || 0),
      0
    );


  // =========================================
  // ADD COMPLETE KIT
  // =========================================

  const handleAddKit = async () => {

    try {

      setKitAdding(true);


      if (kitProducts.length === 0) {

        alert(
          "Recovery Kit products are unavailable."
        );

        return;
      }


      const success =
        await addRecoveryKit(
          kitProducts
        );


      if (success) {

        alert(
          "Morning Recovery Kit added to cart!"
        );

      }


    } catch (error) {

      console.error(
        "Error adding recovery kit:",
        error
      );

      alert(
        "Unable to add Recovery Kit."
      );


    } finally {

      setKitAdding(false);

    }

  };


  return (

    <div className="container-custom">

      <div className="recovery-page">


        {/* =====================================
            HERO
        ===================================== */}

        <section className="recovery-banner">

          <div className="recovery-banner-content">

            <div>

              <span className="recovery-badge">
                💧 WELLNESS
              </span>

              <h1>
                Recovery Mode
              </h1>

              <p>
                Rehydrate, refresh and recover
                with carefully selected essentials.
              </p>

            </div>


            <div className="recovery-banner-icon">
              💧
            </div>

          </div>

        </section>


        {/* =====================================
            HEALTH TIPS
        ===================================== */}

        <section className="health-tip">

          <div className="health-tip-header">

            <div>

              <span className="small-label">
                TAKE CARE
              </span>

              <h2>
                Healthy Tips
              </h2>

            </div>


            <div className="health-tip-symbol">
              🌿
            </div>

          </div>


          <div className="health-tip-grid">

            <div className="health-tip-item">

              <FaCheckCircle />

              <div>

                <strong>
                  Stay Hydrated
                </strong>

                <p>
                  Drink plenty of water
                  throughout the day.
                </p>

              </div>

            </div>


            <div className="health-tip-item">

              <FaCheckCircle />

              <div>

                <strong>
                  Eat Light
                </strong>

                <p>
                  Choose light and
                  nutritious foods.
                </p>

              </div>

            </div>


            <div className="health-tip-item">

              <FaCheckCircle />

              <div>

                <strong>
                  Get Enough Sleep
                </strong>

                <p>
                  Give your body enough
                  time to recover.
                </p>

              </div>

            </div>


            <div className="health-tip-item">

              <FaCheckCircle />

              <div>

                <strong>
                  Take a Break
                </strong>

                <p>
                  Avoid more alcohol
                  until recovered.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            PRODUCTS
        ===================================== */}

        <section className="recovery-products-section">

          <div className="recovery-section-heading">

            <div>

              <span className="small-label">
                RECOVERY ESSENTIALS
              </span>

              <h2>
                Feel Better, Naturally
              </h2>

            </div>


            <span className="recovery-count">
              {products.length} Products
            </span>

          </div>


          {loading ? (

            <div className="recovery-loading">

              <div className="recovery-spinner"></div>

              <p>
                Loading recovery essentials...
              </p>

            </div>


          ) : products.length === 0 ? (

            <div className="recovery-empty">

              <div>
                💧
              </div>

              <h3>
                No Recovery Products
              </h3>

              <p>
                Add products with the
                <strong> Recovery </strong>
                category from Admin Panel.
              </p>

            </div>


          ) : (

            <div className="recovery-product-grid">

              {products.map((product) => (

                <div
                  className="recovery-product-card"
                  key={product.id}
                >


                  {/* IMAGE */}

                  <div className="recovery-product-image">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    ) : (

                      <div className="recovery-product-icon">
                        {getProductIcon(
                          product.name
                        )}
                      </div>

                    )}

                  </div>


                  {/* CATEGORY */}

                  <span className="recovery-product-category">
                    Recovery
                  </span>


                  {/* NAME */}

                  <h3>
                    {product.name}
                  </h3>


                  {/* DESCRIPTION */}

                  <p className="recovery-product-description">

                    {product.description ||
                      "Fresh and refreshing recovery essential."}

                  </p>


                  {/* PRICE */}

                  <div className="recovery-product-bottom">

                    <div>

                      <span className="price-label">
                        Price
                      </span>

                      <strong>
                        ₹{product.price}
                      </strong>

                    </div>


                    <span className="stock-label">

                      {product.stock > 0
                        ? "In Stock"
                        : "Out of Stock"}

                    </span>

                  </div>


                  {/* BUTTON */}

                  <button
                    className="recovery-add-btn"

                    disabled={
                      product.stock <= 0 ||
                      addingId === product.id
                    }

                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >

                    <FaShoppingCart />

                    {addingId === product.id
                      ? "Adding..."
                      : product.stock <= 0
                      ? "Out of Stock"
                      : "Add to Cart"}

                  </button>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =====================================
            MORNING RECOVERY KIT
        ===================================== */}

        {!loading &&
          kitProducts.length > 0 && (

          <section className="kit-card">

            <div className="kit-content">

              <span className="kit-badge">
                🌿 BEST VALUE
              </span>


              <h2>
                Morning Recovery Kit
              </h2>


              <p className="kit-description">
                Everything you need for a
                refreshing start after a long night.
              </p>


              <div className="kit-products">

                {kitProducts.map(
                  (product) => (

                    <span key={product.id}>
                      ✓ {product.name}
                    </span>

                  )
                )}

              </div>


              <div className="kit-bottom">

                <div>

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹{kitPrice}
                  </strong>

                </div>


                <button
                  className="kit-button"
                  onClick={handleAddKit}
                  disabled={kitAdding}
                >

                  <FaShoppingCart />

                  {kitAdding
                    ? "Adding Kit..."
                    : "Add Complete Kit"}

                  <FaArrowRight />

                </button>

              </div>

            </div>

          </section>

        )}


        {/* =====================================
            LIVER COINS
        ===================================== */}

        <section className="reward-card">

          <div className="reward-icon">
            🪙
          </div>


          <div>

            <span className="small-label">
              LIVER COINS
            </span>

            <h3>
              Earn While You Shop
            </h3>

            <p>
              Recovery purchases count toward
              your regular Liver Coins balance.
              You currently earn
              <strong>
                {" "}1 coin for every ₹100 spent
              </strong>.
            </p>

          </div>

        </section>


      </div>

    </div>

  );

}


export default Recovery;