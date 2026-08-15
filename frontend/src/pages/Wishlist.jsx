import React, {
  useEffect,
  useState
} from "react";

import {
  FaHeart,
  FaTrash,
  FaShoppingCart
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import {
  getWishlist,
  removeFromWishlist
} from "../data/wishlistService";

import "../styles/wishlist.css";

function Wishlist() {

  const { user } = useAuth();

  const { addToCart } = useCart();

  const [wishlist, setWishlist] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const loadWishlist = async () => {

      if (!user || !user.userId) {

        setWishlist([]);
        setLoading(false);

        return;
      }


      try {

        setLoading(true);

        const data =
          await getWishlist(user.userId);

        setWishlist(data);

      } catch (error) {

        console.error(
          "Error loading wishlist:",
          error
        );

      } finally {

        setLoading(false);
      }
    };


    loadWishlist();

  }, [user]);


  const handleRemove = async (
    productId
  ) => {

    if (!user) {
      return;
    }


    try {

      await removeFromWishlist(
        user.userId,
        productId
      );

      setWishlist(
        wishlist.filter(
          item =>
            item.productId !== productId
        )
      );

    } catch (error) {

      console.error(
        "Error removing wishlist item:",
        error
      );

      alert(
        "Unable to remove product."
      );
    }
  };


  const handleAddToCart = async (
    item
  ) => {

    const product = {

      id: item.productId,

      name: item.productName,

      price: item.price,

      image: item.image,

      category: item.category
    };


    await addToCart(product);
  };


  if (!user) {

    return (

      <div className="wishlist-page">

        <div className="wishlist-empty">

          <FaHeart />

          <h2>
            Please login to view your wishlist
          </h2>

        </div>

      </div>
    );
  }


  return (

    <div className="wishlist-page">

      <div className="wishlist-header">

        <FaHeart />

        <div>

          <h1>
            My Wishlist
          </h1>

          <p>
            Your saved favorite products
          </p>

        </div>

      </div>


      {loading ? (

        <div className="wishlist-empty">

          <p>
            Loading wishlist...
          </p>

        </div>

      ) : wishlist.length === 0 ? (

        <div className="wishlist-empty">

          <FaHeart />

          <h2>
            Your wishlist is empty
          </h2>

          <p>
            Add products you love to your wishlist.
          </p>

        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlist.map(item => (

            <div
              className="wishlist-card"
              key={item.id}
            >

              <div className="wishlist-image">

                {item.image ? (

                  <img
                    src={item.image}
                    alt={item.productName}
                  />

                ) : (

                  <span>
                    No Image
                  </span>

                )}

              </div>


              <div className="wishlist-info">

                <h3>
                  {item.productName}
                </h3>

                <p>
                  {item.category}
                </p>

                <h4>
                  ₹{item.price}
                </h4>


                <div className="wishlist-actions">

                  <button
                    className="wishlist-cart-btn"
                    onClick={() =>
                      handleAddToCart(item)
                    }
                  >

                    <FaShoppingCart />

                    Add to Cart

                  </button>


                  <button
                    className="wishlist-delete-btn"
                    onClick={() =>
                      handleRemove(
                        item.productId
                      )
                    }
                  >

                    <FaTrash />

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;