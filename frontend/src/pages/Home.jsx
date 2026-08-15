import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TrendingProducts from "../components/TrendingProducts";
import OfferBanner from "../components/OfferBanner";
import RecoveryBanner from "../components/RecoveryBanner";
import RecommendedProducts from "../components/RecommendedProducts";

function Home() {
  return (
    <div className="container-custom">

      <Hero />

      <Categories />

      <TrendingProducts />

      <OfferBanner />

      <RecoveryBanner />

      <RecommendedProducts />

    </div>
  );
}

export default Home;