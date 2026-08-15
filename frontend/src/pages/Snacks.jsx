import React, { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import {
  getProductsByCategory
} from "../data/productService";

import "../styles/category.css";


function Snacks() {

  const [snackProducts, setSnackProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadSnackProducts = async () => {

      try {

        setLoading(true);

        const data =
          await getProductsByCategory("Snacks");

        setSnackProducts(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(
          "Error loading Snack products:",
          error
        );

        setSnackProducts([]);

      } finally {

        setLoading(false);

      }

    };


    loadSnackProducts();

  }, []);


  return (

    <div className="category-page">

      <div className="category-header">

        <h1>🍟 Snacks Collection</h1>

        <p>
          Perfect Snacks for Every Drink
        </p>

      </div>


      <div className="category-grid">

        {loading ? (

          <h2>
            Loading Snack Products...
          </h2>

        ) : snackProducts.length > 0 ? (

          snackProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))

        ) : (

          <h2>
            No Snacks Available
          </h2>

        )}

      </div>

    </div>

  );

}


export default Snacks;