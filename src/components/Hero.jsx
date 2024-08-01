import React from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="dark:bg-slate-700">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 font-outfit">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl dark:text-white">
                About SabkaBazzar
              </h2>

              <p className="mt-4 text-gray-600 dark:text-gray-400 text-base">
                Welcome to SabkaBazzar, your go-to eCommerce app for a seamless
                and enjoyable shopping experience. Discover a wide range of
                quality products at unbeatable prices, all backed by our
                commitment to excellent customer service.
              </p>

              <NavLink
                to="/"
                className="mt-8 inline-block rounded-full bg-[#198057] px-12 py-3 text-sm font-base text-white transition hover:bg-[#16a34a] focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
