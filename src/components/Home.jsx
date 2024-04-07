import React from "react";
import AllProducts from "./AllProducts";
import PopularProducts from "./PopularProducts";
import Stats from "./Stats";
import BannerSlider from "./BannerSlider";
import BestSellers from "./BestSellers";
import Categories from "./Categories";

const Home = () => {
  return (
    <>
      <Categories/>
      <BannerSlider />
      <AllProducts />
      <BestSellers />
      <PopularProducts />
      <Stats />
    </>
  );
};

export default Home;
