import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../data/productService";
import "../styles/beer.css";

function Brandy() {

  const [brandies, setBrandies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadProducts = async () => {

      try {
        const data = await getProductsByCategory("Brandy");
        setBrandies(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load brandy products.");
      } finally {
        setLoading(false);
      }

    };

    loadProducts();

  }, []);

  return (
    <div className="beer-page">

      <div className="beer-header">

        <h1>🍾 Brandy Collection</h1>

        <p>
          Rich Taste & Premium Quality
        </p>

      </div>

      {loading && <h2>Loading Brandy...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error && (
        <div className="beer-grid">

          {brandies.length > 0 ? (

            brandies.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))

          ) : (

            <h2>No Brandy Available</h2>

          )}

        </div>
      )}

    </div>
  );
}

export default Brandy;