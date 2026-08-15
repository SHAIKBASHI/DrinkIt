import React, { useEffect, useState } from "react";

import {
  FaArrowRight
} from "react-icons/fa";

import {
  Link
} from "react-router-dom";

import ProductCard from "./ProductCard";

import {
  getRecommendedProducts
} from "../data/productService";

import "../styles/recommendedProducts.css";


function RecommendedProducts() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  // =========================================
  // LOAD RECOMMENDED PRODUCTS
  // =========================================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        const data =
          await getRecommendedProducts();

        setProducts(
          Array.isArray(data)
            ? data.slice(0, 4)
            : []
        );

      } catch (error) {

        console.error(
          "Error loading recommended products:",
          error
        );

        setProducts([]);

      } finally {

        setLoading(false);
      }
    };


    loadProducts();

  }, []);


  return (

    <section className="recommended-section">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="section-heading">

        <h2>
          ⭐ Recommended For You
        </h2>


        <Link
          to="/categories"
          className="view-all-btn"
        >

          <span>
            View All
          </span>

          <FaArrowRight />

        </Link>

      </div>


      {/* =====================================
          PRODUCTS
      ===================================== */}

      {loading ? (

        <p className="product-loading">
          Loading products...
        </p>

      ) : products.length === 0 ? (

        <p className="product-empty">
          No recommended products available.
        </p>

      ) : (

        <div className="recommended-grid">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      )}

    </section>
  );
}


export default RecommendedProducts;