// import React from "react";
// import {
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaCommentDots,
//   FaCheckCircle,
//   FaMotorcycle,
//   FaStore,
//   FaHome
// } from "react-icons/fa";
// import "../styles/tracking.css";

// function Tracking() {

//   const steps = [
//     {
//       id: 1,
//       title: "Order Confirmed",
//       icon: <FaCheckCircle />,
//       active: true
//     },
//     {
//       id: 2,
//       title: "Preparing Order",
//       icon: <FaStore />,
//       active: true
//     },
//     {
//       id: 3,
//       title: "Out For Delivery",
//       icon: <FaMotorcycle />,
//       active: true
//     },
//     {
//       id: 4,
//       title: "Delivered",
//       icon: <FaHome />,
//       active: false
//     }
//   ];

//   return (

//     <div className="container-custom">

//       <div className="tracking-page">

//         <div className="tracking-header">

//           <h2>🚚 Track Your Order</h2>

//           <p>
//             Estimated Arrival
//           </p>

//           <h1>18 mins</h1>

//         </div>

//         {/* Map */}

//         <div className="map-card">

//           <div className="map-placeholder">

//             <FaMapMarkerAlt />

//             <h3>Live Map</h3>

//             <p>
//               Google Maps will appear here.
//             </p>

//           </div>

//         </div>

//         {/* Rider */}

//         <div className="rider-card">

//           <img
//             src="https://via.placeholder.com/70"
//             alt="Delivery Boy"
//           />

//           <div className="rider-info">

//             <h3>Rahul Kumar</h3>

//             <p>Delivery Partner</p>

//             <small>⭐ 4.9 Rating</small>

//           </div>

//           <div className="contact-buttons">

//             <button>

//               <FaPhoneAlt />

//             </button>

//             <button>

//               <FaCommentDots />

//             </button>

//           </div>

//         </div>

//         {/* Timeline */}

//         <h3 className="section-title">

//           Order Status

//         </h3>

//         <div className="timeline">

//           {steps.map((step) => (

//             <div
//               className={
//                 step.active
//                   ? "timeline-item active"
//                   : "timeline-item"
//               }
//               key={step.id}
//             >

//               <div className="timeline-icon">

//                 {step.icon}

//               </div>

//               <div>

//                 <h4>{step.title}</h4>

//                 <small>

//                   {step.active
//                     ? "Completed"
//                     : "Pending"}

//                 </small>

//               </div>

//             </div>

//           ))}

//         </div>

//         {/* Address */}

//         <div className="address-card">

//           <h3>Delivery Address</h3>

//           <p>

//             45-10-12, MVP Colony,

//             Visakhapatnam,

//             Andhra Pradesh.

//           </p>

//         </div>

//         {/* Order */}

//         <div className="summary-card">

//           <h3>Order Summary</h3>

//           <div className="summary-row">

//             <span>Kingfisher Beer ×2</span>

//             <span>₹360</span>

//           </div>

//           <div className="summary-row">

//             <span>Black Dog Whisky</span>

//             <span>₹1250</span>

//           </div>

//           <div className="summary-row">

//             <span>Recovery Kit</span>

//             <span>₹249</span>

//           </div>

//           <hr />

//           <div className="summary-row total">

//             <span>Total</span>

//             <span>₹1859</span>

//           </div>

//         </div>

//       </div>

//     </div>

//   );
// }

// export default Tracking;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tracking.css";

function Tracking() {

  const navigate = useNavigate();

  const steps = [
    "Order Confirmed",
    "Preparing Your Order",
    "Packed",
    "Out For Delivery",
    "Delivered"
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentStep((prev) => {

        if (prev < steps.length - 1) {
          return prev + 1;
        }

        clearInterval(timer);
        return prev;

      });

    }, 3000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="tracking-page">

      <h1>Track Your Order</h1>

      <p className="tracking-subtitle">
        Estimated Delivery Time
      </p>

      <h2 className="delivery-time">
        15 Minutes
      </h2>

      <div className="tracking-container">

        {steps.map((step, index) => (

          <div
            key={index}
            className={`tracking-step ${
              index <= currentStep ? "active" : ""
            }`}
          >

            <div className="circle">
              {index + 1}
            </div>

            <div className="step-content">

              <h3>{step}</h3>

              {index === currentStep && (
                <p>Current Status</p>
              )}

            </div>

          </div>

        ))}

      </div>

      {currentStep === steps.length - 1 && (

        <button
          className="continue-btn"
          onClick={() => navigate("/home")}
        >
          Continue Shopping
        </button>

      )}

    </div>

  );

}

export default Tracking;