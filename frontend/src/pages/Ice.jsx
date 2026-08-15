import React, { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import {
  getProductsByCategory
} from "../data/productService";

import "../styles/category.css";


function Ice() {

  const [iceProducts, setIceProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadIceProducts = async () => {

      try {

        setLoading(true);

        const data =
          await getProductsByCategory("Ice");

        setIceProducts(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(
          "Error loading Ice products:",
          error
        );

        setIceProducts([]);

      } finally {

        setLoading(false);

      }

    };


    loadIceProducts();

  }, []);


  return (

    <div className="category-page">

      <div className="category-header">

        <h1>🧊 Ice Collection</h1>

        <p>
          Fresh Ice Cubes Delivered Fast
        </p>

      </div>


      <div className="category-grid">

        {loading ? (

          <h2>
            Loading Ice Products...
          </h2>

        ) : iceProducts.length > 0 ? (

          iceProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))

        ) : (

          <h2>
            No Ice Products Available
          </h2>

        )}

      </div>

    </div>

  );

}


export default Ice;