import React from "react";
import AllProducts from "./AllProducts";
import PopularProducts from "./PopularProducts";
import Stats from "./Stats";
import BannerSlider from "./BannerSlider";
import BestSellers from "./BestSellers";

const Home = () => {
  return (
    <>
      <BannerSlider />
      <AllProducts />
      <BestSellers />
      <PopularProducts />
      <Stats />
    </>
  );
};

export default Home;
