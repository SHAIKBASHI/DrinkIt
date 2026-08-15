import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  FaBeer,
  FaWineBottle,
  FaGlassWhiskey,
  FaCocktail,
  FaIceCream,
  FaHamburger,
  FaTint
} from "react-icons/fa";

import "../styles/homeCategories.css";

function Categories() {

  const categories = [
    {
      id: 1,
      name: "Beer",
      icon: <FaBeer />,
      color: "#FFF3CD",
      path: "/category/beer"
    },
    {
      id: 2,
      name: "Whisky",
      icon: <FaGlassWhiskey />,
      color: "#FFE5B4",
      path: "/category/whisky"
    },
    {
      id: 3,
      name: "Wine",
      icon: <FaWineBottle />,
      color: "#F8D7DA",
      path: "/category/wine"
    },
    {
      id: 4,
      name: "Vodka",
      icon: <FaCocktail />,
      color: "#E3F2FD",
      path: "/category/vodka"
    },
    {
      id: 5,
      name: "Rum",
      icon: <FaGlassWhiskey />,
      color: "#E8F5E9",
      path: "/category/rum"
    },
    {
      id: 6,
      name: "Ice Cubes",
      icon: <FaIceCream />,
      color: "#E1F5FE",
      path: "/category/ice"
    },
    {
      id: 7,
      name: "Snacks",
      icon: <FaHamburger />,
      color: "#FFF8E1",
      path: "/category/snacks"
    },
    {
      id: 8,
      name: "Recovery",
      icon: <FaTint />,
      color: "#E8F5E9",
      path: "/recovery"
    }
  ];

  return (
    <section className="home-categories-section">

      <div className="home-categories-heading">

        <h2>Categories</h2>

       <Link
  to="/categories"
  className="home-categories-view-all"
>
  View All
  <FaArrowRight />
</Link>

      </div>

      <div className="home-categories-grid">

        {categories.map((item) => (

          <Link
            to={item.path}
            key={item.id}
            className="home-category-link"
          >

            <div
              className="home-category-box"
              style={{ background: item.color }}
            >

              <div className="home-category-icon">
                {item.icon}
              </div>

              <h4>{item.name}</h4>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default Categories;