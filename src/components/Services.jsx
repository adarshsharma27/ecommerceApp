import React from "react";
import { NavLink } from "react-router-dom";
import data from "../utils/servicesData";

const Services = () => {
  return (
    <>
      <section className="bg-gray-100 text-gray-600 font-outfit dark:bg-slate-700">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-gray-800 dark:text-white">
              Trusted by eCommerce Businesses
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-base">
              Leverage our expert solutions to elevate your online store. From
              custom design to secure payments, we ensure your eCommerce
              platform thrives.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.map((services) => (
              <NavLink
                className="block rounded-xl border border-gray-800 dark:border-gray-400 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                to="/"
                key={services.id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-10 text-[#16a34a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>

                <h2 className="mt-4 text-xl font-bold text-gray-600 dark:text-white">
                  {services.heading}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {services.description}
                </p>
              </NavLink>
            ))}
          </div>

          <div className="mt-12 text-center">
            <NavLink
              to="/"
              className="inline-block rounded-full bg-[#198057] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#16a34a] focus:outline-none focus:ring focus:ring-[#16a34a"
            >
              Get Started Today
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
