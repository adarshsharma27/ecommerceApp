import React from "react";
import AllProducts from "./AllProducts";
import PopularProducts from "./PopularProducts";
import Stats from "./Stats";
import BannerSlider from "./BannerSlider";

const Home = () => {
  return (
    <>
      <BannerSlider />
      <AllProducts />
      <PopularProducts />
      <Stats />
    </>
  );
};

export default Home;
