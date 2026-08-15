import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaQuestionCircle,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaCreditCard,
  FaPhone
} from "react-icons/fa";

import "../styles/helpSupport.css";

function HelpSupport() {

  const navigate = useNavigate();


  const faqs = [

    {
      icon: <FaShoppingBag />,
      question:
        "Where can I check my orders?",
      answer:
        "Open Profile and select My Orders to view your previous orders."
    },

    {
      icon: <FaMapMarkerAlt />,
      question:
        "How can I manage my address?",
      answer:
        "Open Profile → Saved Addresses to add, update or delete delivery addresses."
    },

    {
      icon: <FaCreditCard />,
      question:
        "What payment methods are available?",
      answer:
        "Checkout currently supports Cash on Delivery, UPI and Credit/Debit Card selection."
    },

    {
      icon: <FaQuestionCircle />,
      question:
        "Why can't I place my order?",
      answer:
        "Make sure you are logged in, have items in your cart and have selected a delivery address."
    }

  ];


  return (

    <div className="help-page">

      <div className="help-container">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/profile")
          }
        >
          ← Back
        </button>


        <h1>
          <FaQuestionCircle />
          Help & Support
        </h1>


        <div className="help-card">

          <h2>
            Frequently Asked Questions
          </h2>


          {faqs.map(
            (faq, index) => (

              <div
                className="faq-item"
                key={index}
              >

                <div className="faq-icon">

                  {faq.icon}

                </div>


                <div>

                  <h3>
                    {faq.question}
                  </h3>

                  <p>
                    {faq.answer}
                  </p>

                </div>

              </div>

            )
          )}

        </div>


        <div className="contact-card">

          <FaPhone />

          <div>

            <h2>
              Need More Help?
            </h2>

            <p>
              Contact DrinkIt support for
              assistance with your account,
              orders or delivery.
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default HelpSupport;