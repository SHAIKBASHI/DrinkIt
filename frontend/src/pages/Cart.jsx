import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";

function Cart() {

  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
    loading
  } = useCart();


  if (loading) {
    return (
      <div className="cart-page">

        <h1>🛒 Shopping Cart</h1>

        <p>Loading cart...</p>

      </div>
    );
  }


  if (cartItems.length === 0) {
    return (
      <div className="cart-page">

        <h1>🛒 Shopping Cart</h1>

        <div className="empty-cart">

          <h2>Your cart is empty.</h2>

          <p>
            Add some products to continue shopping.
          </p>

          <button
            className="checkout-btn"
            onClick={() => navigate("/home")}
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="cart-page">

      <h1>🛒 Shopping Cart</h1>


      {cartItems.map((item) => (

        <div
          className="cart-item"
          key={item.id}
        >

          {/* PRODUCT IMAGE */}

          <div className="cart-image">

            {item.image ? (

              <img
                src={item.image}
                alt={item.productName}
                className="cart-product-image"
              />

            ) : (

              <span className="cart-no-image">
                🍺
              </span>

            )}

          </div>


          {/* PRODUCT INFORMATION */}

          <div className="cart-info">

            <h3>
              {item.productName}
            </h3>

            <h4>
              ₹{item.price}
            </h4>

            <p>
              Quantity: {item.quantity}
            </p>

          </div>


          {/* ACTIONS */}

          <div className="cart-actions">

            <div className="quantity-box">

              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
              >
                <FaMinus />
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQuantity(item.id)
                }
              >
                <FaPlus />
              </button>

            </div>


            <button
              className="delete-btn"
              onClick={() =>
                removeFromCart(item.id)
              }
            >
              <FaTrash />
            </button>

          </div>

        </div>

      ))}


      {/* CART SUMMARY */}

      <div className="cart-summary">

        <h2>
          Total Items : {totalItems}
        </h2>

        <h2>
          Total Price : ₹{totalPrice}
        </h2>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>

      </div>

    </div>
  );
}

export default Cart;