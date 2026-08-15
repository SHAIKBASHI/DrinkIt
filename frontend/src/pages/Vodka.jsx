import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../data/productService";
import "../styles/category.css";

function Vodka() {

  const [vodkaProducts, setVodkaProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadProducts = async () => {

      try {
        const data = await getProductsByCategory("Vodka");
        setVodkaProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load vodka products.");
      } finally {
        setLoading(false);
      }

    };

    loadProducts();

  }, []);

  return (
    <div className="category-page">

      <div className="category-header">

        <h1>🍸 Vodka Collection</h1>

        <p>
          Smooth & Premium Vodka Selection
        </p>

      </div>

      {loading && <h2>Loading Vodka...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error && (
        <div className="category-grid">

          {vodkaProducts.length > 0 ? (

            vodkaProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))

          ) : (

            <h2>No Vodka Available</h2>

          )}

        </div>
      )}

    </div>
  );
}

export default Vodka;