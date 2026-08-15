import React, { useEffect, useState } from "react";

import {
  FaArrowRight
} from "react-icons/fa";

import {
  Link
} from "react-router-dom";

import ProductCard from "./ProductCard";

import {
  getTrendingProducts
} from "../data/productService";

import "../styles/trendingProducts.css";


function TrendingProducts() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  // =========================================
  // LOAD TRENDING PRODUCTS
  // =========================================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        const data =
          await getTrendingProducts();

        setProducts(
          Array.isArray(data)
            ? data.slice(0, 4)
            : []
        );

      } catch (error) {

        console.error(
          "Error loading trending products:",
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

    <section className="trending-section">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="section-heading">

        <h2>
          🔥 Trending Products
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
          No trending products available.
        </p>

      ) : (

        <div className="trending-grid">

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


export default TrendingProducts;