import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = () => {
  return (
    <>
      <NavLink
        to={"/cart"}
        className="group relative block overflow-hidden font-outfit card-shadow-custom rounded-md"
      >
        <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
          <span className="sr-only">Wishlist</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
        <NavLink to={"/productDetails/1"}>
          <img
            src="https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHNoaXJ0fGVufDB8fDB8fHww"
            alt=""
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
        </NavLink>

        <div className="relative  bg-white p-6">
          <span className="whitespace-nowrap bg-[#16a34a] text-white px-3 py-1.5 text-xs font-medium rounded-full">
            {" "}
            New{" "}
          </span>

          <h3 className="mt-4 text-lg font-medium text-gray-900">Robot Toy</h3>

          <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

          <form className="mt-4">
            <button className="block w-full rounded-full bg-[#198057]  text-white px-12 py-3 text-sm font-medium transition hover:scale-105 hover:bg-[#16a34a]">
              Add to Cart
            </button>
          </form>
        </div>
      </NavLink>
    </>
  );
};

export default ProductCard;
