import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../data/productService";
import "../styles/category.css";

function Whisky() {

  const [whiskyProducts, setWhiskyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadProducts = async () => {

      try {
        const data = await getProductsByCategory("Whisky");
        setWhiskyProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load whisky products.");
      } finally {
        setLoading(false);
      }

    };

    loadProducts();

  }, []);

  return (
    <div className="category-page">

      <div className="category-header">

        <h1>🥃 Whisky Collection</h1>

        <p>Premium Whiskies Delivered in Minutes</p>

      </div>

      {loading && <h2>Loading Whisky...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error && (
        <div className="category-grid">

          {whiskyProducts.length > 0 ? (

            whiskyProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))

          ) : (

            <h2>No Whisky Available</h2>

          )}

        </div>
      )}

    </div>
  );
}

export default Whisky;