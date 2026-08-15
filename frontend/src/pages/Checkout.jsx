import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import { getUser } from "../data/authService";

import { getUserAddresses } from "../data/addressService";

import {
  placeOrder,
  addOrderItem
} from "../data/orderService";

import "../styles/checkout.css";


function Checkout() {

  const {
    cartItems,
    totalPrice,
    clearCartItems
  } = useCart();

  const navigate = useNavigate();


  const [addresses, setAddresses] =
    useState([]);

  const [selectedAddress, setSelectedAddress] =
    useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [loading, setLoading] =
    useState(false);


  // =========================================================
  // PRICE CALCULATION
  // =========================================================

  const deliveryCharge = 40;

  const gst =
    Math.round(totalPrice * 0.05);

  const grandTotal =
    totalPrice +
    deliveryCharge +
    gst;


  // =========================================================
  // LOAD ADDRESSES
  // =========================================================

  useEffect(() => {

    const loadAddresses = async () => {

      const user = getUser();

      if (!user || !user.userId) {

        alert("Please login first.");

        navigate("/login");

        return;
      }


      try {

        const data =
          await getUserAddresses(
            user.userId
          );

        setAddresses(
          Array.isArray(data)
            ? data
            : []
        );


        // Select default address
        const defaultAddress =
          data.find(
            (address) =>
              address.defaultAddress === true
          );


        if (defaultAddress) {

          setSelectedAddress(
            defaultAddress
          );

        } else if (data.length > 0) {

          setSelectedAddress(
            data[0]
          );

        }

      } catch (error) {

        console.error(
          "Error loading addresses:",
          error
        );

      }

    };


    loadAddresses();

  }, [navigate]);


  // =========================================================
  // PLACE ORDER
  // =========================================================

  const handlePlaceOrder = async () => {

    if (cartItems.length === 0) {

      alert(
        "Your cart is empty."
      );

      return;
    }


    if (!selectedAddress) {

      alert(
        "Please select a delivery address."
      );

      return;
    }


    const user = getUser();


    if (!user || !user.userId) {

      alert(
        "Please login first."
      );

      navigate("/login");

      return;
    }


    try {

      setLoading(true);


      // =====================================================
      // STEP 1: CREATE ORDER
      // =====================================================

      const orderData = {

        userId: user.userId,

        addressId: selectedAddress.id,

        totalAmount: grandTotal,

        status: "PLACED"

      };


      console.log(
        "Creating order:",
        orderData
      );


      const order =
        await placeOrder(
          orderData
        );


      console.log(
        "Order created:",
        order
      );


      // =====================================================
      // STEP 2: ADD ORDER ITEMS
      // =====================================================

      for (
        const item of cartItems
      ) {

        const orderItem = {

          orderId: order.id,

          productId:
            item.productId,

          productName:
            item.productName,

          price:
            item.price,

          quantity:
            item.quantity,

          totalPrice:
            item.price *
            item.quantity

        };


        console.log(
          "Adding order item:",
          orderItem
        );


        await addOrderItem(
          orderItem
        );

      }


      // =====================================================
      // STEP 3: CLEAR CART
      // =====================================================

      await clearCartItems();


      // =====================================================
      // STEP 4: SAVE ORDER ID
      // =====================================================

      localStorage.setItem(
        "lastOrderId",
        order.id
      );


      // =====================================================
      // STEP 5: SUCCESS PAGE
      // =====================================================

      navigate(
        "/order-success"
      );


    } catch (error) {

      console.error(
        "Error placing order:",
        error
      );


      console.error(
        "Status:",
        error.response?.status
      );


      console.error(
        "Response:",
        error.response?.data
      );


      alert(
        "Unable to place order. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="checkout-page">


      {/* =====================================================
          PAGE TITLE
      ===================================================== */}

      <h1>
        Checkout
      </h1>


      {/* =====================================================
          DELIVERY ADDRESS
      ===================================================== */}

      <div className="checkout-card">

        <h2>
          Delivery Address
        </h2>


        {addresses.length === 0 ? (

          <div>

            <p>
              No delivery address found.
            </p>


            <button
              onClick={() =>
                navigate("/addresses")
              }
            >
              Add Address
            </button>

          </div>

        ) : (

          addresses.map(
            (address) => (

              <label
                key={address.id}
                className="checkout-address-option"
              >

                <input
                  type="radio"
                  name="address"

                  checked={
                    selectedAddress?.id ===
                    address.id
                  }

                  onChange={() =>
                    setSelectedAddress(
                      address
                    )
                  }
                />


                <strong>
                  {address.fullName}
                </strong>


                <br />


                <span>

                  {address.houseNo},{" "}

                  {address.street},{" "}

                  {address.city},{" "}

                  {address.state} -{" "}

                  {address.pincode}

                </span>


                <br />


                <span>

                  Mobile:{" "}

                  {address.mobile}

                </span>

              </label>

            )
          )

        )}

      </div>


      {/* =====================================================
          ORDER SUMMARY
      ===================================================== */}

      <div className="checkout-card">

        <h2>
          Order Summary
        </h2>


        {cartItems.length === 0 ? (

          <p>
            Your cart is empty.
          </p>

        ) : (

          cartItems.map(
            (item) => (

              <div
                className="checkout-item"
                key={item.id}
              >


                {/* ==========================================
                    PRODUCT IMAGE + DETAILS
                ========================================== */}

                <div className="checkout-product-info">


                  {item.image ? (

                    <img
                      src={item.image}
                      alt={item.productName}
                      className="checkout-product-image"
                    />

                  ) : (

                    <div className="checkout-image-placeholder">
                      🥤
                    </div>

                  )}


                  <span>
                    {item.productName}
                    {" "}
                    ×
                    {" "}
                    {item.quantity}
                  </span>


                </div>


                {/* ==========================================
                    PRODUCT PRICE
                ========================================== */}

                <span>

                  ₹
                  {item.price *
                    item.quantity}

                </span>


              </div>

            )
          )

        )}

      </div>


      {/* =====================================================
          PAYMENT METHOD
      ===================================================== */}

      <div className="checkout-card">

        <h2>
          Payment Method
        </h2>


        {/* CASH ON DELIVERY */}

        <label>

          <input
            type="radio"

            value="cod"

            checked={
              paymentMethod === "cod"
            }

            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          />

          <span>
            Cash On Delivery
          </span>

        </label>


        {/* UPI */}

        <label>

          <input
            type="radio"

            value="upi"

            checked={
              paymentMethod === "upi"
            }

            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          />

          <span>
            UPI
          </span>

        </label>


        {/* CARD */}

        <label>

          <input
            type="radio"

            value="card"

            checked={
              paymentMethod === "card"
            }

            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          />

          <span>
            Credit / Debit Card
          </span>

        </label>


      </div>


      {/* =====================================================
          PRICE SUMMARY
      ===================================================== */}

      <div className="checkout-total">


        {/* ITEMS TOTAL */}

        <div>

          <span>
            Items Total
          </span>

          <span>
            ₹{totalPrice}
          </span>

        </div>


        {/* DELIVERY */}

        <div>

          <span>
            Delivery Charge
          </span>

          <span>
            ₹{deliveryCharge}
          </span>

        </div>


        {/* GST */}

        <div>

          <span>
            GST
          </span>

          <span>
            ₹{gst}
          </span>

        </div>


        <hr />


        {/* GRAND TOTAL */}

        <div className="grand-total">

          <strong>
            Total
          </strong>

          <strong>
            ₹{grandTotal}
          </strong>

        </div>


      </div>


      {/* =====================================================
          PLACE ORDER
      ===================================================== */}

      <button
        className="place-order-btn"

        onClick={
          handlePlaceOrder
        }

        disabled={loading}
      >

        {loading
          ? "Placing Order..."
          : "Place Order"}

      </button>


    </div>

  );

}


export default Checkout;