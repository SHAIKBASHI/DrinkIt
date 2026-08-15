import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaThLarge,
  FaShoppingCart,
  FaGift,
  FaUser
} from "react-icons/fa";

import "../styles/bottomnav.css";

function BottomNav() {
  return (
    <nav className="bottom-nav">

      <NavLink to="/home" className="nav-item">
        <FaHome />
        <span>Home</span>
      </NavLink>

      <NavLink to="/categories" className="nav-item">
        <FaThLarge />
        <span>Categories</span>
      </NavLink>

      <NavLink to="/cart" className="nav-item">
        <FaShoppingCart />
        <span>Cart</span>
      </NavLink>

      <NavLink to="/rewards" className="nav-item">
        <FaGift />
        <span>Rewards</span>
      </NavLink>

      <NavLink to="/profile" className="nav-item">
        <FaUser />
        <span>Profile</span>
      </NavLink>

    </nav>
  );
}

export default BottomNav;