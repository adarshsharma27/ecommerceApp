import React from "react";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  return (
    <>
      <section className="text-gray-600 font-outfit dark:bg-slate-700">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-[#16a34a]"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-outfit text-3xl mb-2 sm:mb-0 dark:text-white">
                Popular Products
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularProducts;
