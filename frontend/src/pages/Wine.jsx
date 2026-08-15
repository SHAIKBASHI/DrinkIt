import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../data/productService";
import "../styles/category.css";

function Wine() {

  const [wineProducts, setWineProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadProducts = async () => {

      try {
        const data = await getProductsByCategory("Wine");
        setWineProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load wine products.");
      } finally {
        setLoading(false);
      }

    };

    loadProducts();

  }, []);

  return (
    <div className="category-page">

      <div className="category-header">

        <h1>🍷 Wine Collection</h1>

        <p>
          Premium Red, White & Sparkling Wines
        </p>

      </div>

      {loading && <h2>Loading Wine...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error && (
        <div className="category-grid">

          {wineProducts.length > 0 ? (

            wineProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))

          ) : (

            <h2>No Wine Available</h2>

          )}

        </div>
      )}

    </div>
  );
}

export default Wine;