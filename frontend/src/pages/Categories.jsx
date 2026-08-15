import React from "react";
import { Link } from "react-router-dom";

import {
  FaBeer,
  FaWineBottle,
  FaGlassWhiskey,
  FaCocktail,
  FaIceCream,
  FaHamburger,
  FaTint,
  FaArrowRight
} from "react-icons/fa";

import "../styles/categories.css";

function Categories() {

  const categories = [
    {
      id: 1,
      name: "Beer",
      icon: <FaBeer />,
      color: "#F8E16C",
      path: "/category/beer"
    },
    {
      id: 2,
      name: "Whisky",
      icon: <FaGlassWhiskey />,
      color: "#D7A86E",
      path: "/category/whisky"
    },
    {
      id: 3,
      name: "Wine",
      icon: <FaWineBottle />,
      color: "#D96C8D",
      path: "/category/wine"
    },
    {
      id: 4,
      name: "Vodka",
      icon: <FaCocktail />,
      color: "#B7E4F9",
      path: "/category/vodka"
    },
    {
      id: 5,
      name: "Rum",
      icon: <FaGlassWhiskey />,
      color: "#8D6E63",
      path: "/category/rum"
    },
    {
      id: 6,
      name: "Ice Cubes",
      icon: <FaIceCream />,
      color: "#E3F2FD",
      path: "/category/ice"
    },
    {
      id: 7,
      name: "Snacks",
      icon: <FaHamburger />,
      color: "#FFE0B2",
      path: "/category/snacks"
    },
    {
      id: 8,
      name: "Recovery",
      icon: <FaTint />,
      color: "#C8E6C9",
      path: "/recovery"
    }
  ];

  return (
    <div className="categories-page">

      <div className="categories-page-header">

        <h1>Browse Categories</h1>

        <p>
          Choose your favourite drinks & essentials.
        </p>

      </div>


      <div className="categories-page-grid">

        {categories.map((item) => (

          <Link
            key={item.id}
            to={item.path}
            className="categories-page-link"
          >

            <div
              className="categories-page-box"
              style={{ background: item.color }}
            >

              <div className="categories-page-icon">
                {item.icon}
              </div>

              <h3>
                {item.name}
              </h3>

              <FaArrowRight className="categories-page-arrow" />

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Categories;