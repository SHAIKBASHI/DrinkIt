import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../data/productService";
import "../styles/beer.css";

function Beer() {

  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadBeers = async () => {

      try {

        setLoading(true);
        setError("");

        const data = await getProductsByCategory("Beer");

        setBeers(data);

      } catch (err) {

        console.error("Error loading beer products:", err);

        setError("Unable to load beer products.");

      } finally {

        setLoading(false);

      }
    };

    loadBeers();

  }, []);

  return (
    <div className="beer-page">

      <div className="beer-header">

        <h1>🍺 Beer Collection</h1>

        <p>
          Fresh • Chilled • Delivered in Minutes
        </p>

      </div>


      {loading && (
        <div className="loading-message">
          Loading beers...
        </div>
      )}


      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      {!loading && !error && (

        <div className="beer-grid">

          {beers.length > 0 ? (

            beers.map((beer) => (

              <ProductCard
                key={beer.id}
                product={beer}
              />

            ))

          ) : (

            <h2>No Beer Products Found</h2>

          )}

        </div>

      )}

    </div>
  );
}

export default Beer;