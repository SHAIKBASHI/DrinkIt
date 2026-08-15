import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaShoppingBag,
  FaCoins,
  FaGift
} from "react-icons/fa";

import "../styles/notifications.css";

function Notifications() {

  const navigate = useNavigate();


  const notifications = [

    {
      id: 1,
      icon: <FaShoppingBag />,
      title: "Order Updates",
      message:
        "You will receive updates about your order status.",
      time: "Available"
    },

    {
      id: 2,
      icon: <FaCoins />,
      title: "Liver Coins",
      message:
        "Earn Liver Coins when you place orders.",
      time: "Rewards"
    },

    {
      id: 3,
      icon: <FaGift />,
      title: "Offers & Rewards",
      message:
        "New offers and rewards may appear here.",
      time: "Offers"
    }

  ];


  return (

    <div className="notifications-page">

      <div className="notifications-container">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/profile")
          }
        >
          ← Back
        </button>


        <h1>
          <FaBell />
          Notifications
        </h1>


        <div className="notifications-list">

          {notifications.map(
            (notification) => (

              <div
                className="notification-card"
                key={notification.id}
              >

                <div className="notification-icon">

                  {notification.icon}

                </div>


                <div className="notification-content">

                  <h3>
                    {notification.title}
                  </h3>

                  <p>
                    {notification.message}
                  </p>

                  <small>
                    {notification.time}
                  </small>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}

export default Notifications;