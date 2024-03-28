import React from "react";
import ProductCard from "./ProductCard";

const Search = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 md:gap-4  font-outfit dark:bg-slate-700">
        <div className="flex  flex-col justify-between md:border-e bg-white dark:bg-slate-700">
          <div className="px-4 md:py-6 pt-16 pb-2">
            <span className="grid h-10 w-32 place-content-center rounded-full bg-gray-100 dark:bg-slate-500 dark:text-white md:text-lg text-base  font-semibold text-gray-500">
              Filters
            </span>

            <ul className="mt-6 md:space-y-4 md:block flex flex-wrap justify-start content-center gap-2">
              <li className="hidden md:block rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white  cursor-pointer">
                All Products
              </li>
              <li className="hidden md:block rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white  cursor-pointer">
                BestSellers
              </li>
              <li className="hidden md:block rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white  cursor-pointer">
                New Products
              </li>

              {/* Mobile filter start */}
              <li className="block md:hidden rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-[#16a34a] hover:text-white  cursor-pointer">
                All Products
              </li>
              <li className="block md:hidden rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-[#16a34a] hover:text-white  cursor-pointer">
                Best Sellers
              </li>
              <li className="block md:hidden rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-[#16a34a] hover:text-white  cursor-pointer">
                New Products
              </li>

              {/* Mobile filter end */}
            </ul>
          </div>
        </div>
        <div className="container px-5 py-4 mx-auto font-montserrat col-span-3">
          <div className="card-shadow-custom p-6 rounded">
            <div className="relative">
              <input
                type="text"
                id="Search"
                placeholder="Search"
                className="w-full bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-[#16a34a] focus:bg-white focus:ring-1 focus:ring-[#16a34a] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
              />

              <span
                className="absolute inset-y-0 end-0 grid w-10 place-content-center"
                onClick={""}
              >
                <button
                  type="button"
                  className="text-gray-600 dark:text-white hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
