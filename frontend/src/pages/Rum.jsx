import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../data/productService";
import "../styles/beer.css";

function Rum() {

  const [rums, setRums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadProducts = async () => {

      try {
        const data = await getProductsByCategory("Rum");
        setRums(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load rum products.");
      } finally {
        setLoading(false);
      }

    };

    loadProducts();

  }, []);

  return (
    <div className="beer-page">

      <div className="beer-header">

        <h1>🥃 Rum Collection</h1>

        <p>
          Finest Rum For Every Occasion
        </p>

      </div>

      {loading && <h2>Loading Rum...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error && (
        <div className="beer-grid">

          {rums.length > 0 ? (

            rums.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))

          ) : (

            <h2>No Rum Available</h2>

          )}

        </div>
      )}

    </div>
  );
}

export default Rum;