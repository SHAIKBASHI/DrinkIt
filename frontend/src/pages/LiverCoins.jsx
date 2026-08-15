import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCoins,
  FaShoppingBag,
  FaGift
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { getOrdersByUser } from "../data/orderService";

import "../styles/liverCoins.css";

function LiverCoins() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    if (!user || !user.userId) {

      setLoading(false);

      return;

    }


    const loadOrders = async () => {

      try {

        const data =
          await getOrdersByUser(
            user.userId
          );

        setOrders(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(
          "Error loading coins:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadOrders();

  }, [user]);


  const totalSpent =
    orders.reduce(
      (total, order) =>
        total +
        Number(order.totalAmount || 0),
      0
    );


  const coins =
    Math.floor(totalSpent / 100);


  if (!user) {

    return (

      <div className="coins-page">

        <div className="coins-container">

          <div className="coins-empty">

            <FaCoins />

            <h2>
              Please Login
            </h2>

            <button
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

          </div>

        </div>

      </div>

    );

  }


  return (

    <div className="coins-page">

      <div className="coins-container">

        <div className="coins-header">

          <button
            className="back-btn"
            onClick={() =>
              navigate("/profile")
            }
          >
            ← Back
          </button>

          <h1>
            Liver Coins
          </h1>

        </div>


        {/* Balance */}

        <div className="coins-balance-card">

          <FaCoins />

          <p>
            Available Balance
          </p>

          <h2>
            {loading ? "..." : coins}
          </h2>

          <span>
            🪙 Liver Coins
          </span>

        </div>


        {/* How it works */}

        <div className="coins-info-card">

          <h2>
            How Liver Coins Work
          </h2>


          <div className="coin-rule">

            <FaShoppingBag />

            <div>

              <strong>
                Earn Coins
              </strong>

              <p>
                Earn 1 Liver Coin
                for every ₹100 spent
                on orders.
              </p>

            </div>

          </div>


          <div className="coin-rule">

            <FaGift />

            <div>

              <strong>
                Use Your Rewards
              </strong>

              <p>
                Your Liver Coins can
                be used for future
                rewards and offers.
              </p>

            </div>

          </div>

        </div>


        {/* Summary */}

        <div className="coins-summary">

          <div>

            <span>
              Total Orders
            </span>

            <strong>
              {orders.length}
            </strong>

          </div>


          <div>

            <span>
              Total Spent
            </span>

            <strong>
              ₹
              {totalSpent.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          <div>

            <span>
              Current Coins
            </span>

            <strong>
              {coins} 🪙
            </strong>

          </div>

        </div>


        <button
          className="coins-shop-btn"
          onClick={() =>
            navigate("/home")
          }
        >
          Continue Shopping
        </button>

      </div>

    </div>

  );

}

export default LiverCoins;