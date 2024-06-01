import React from "react";

const Stats = () => {
  return (
    <>
      <section className="bg-white font-outfit dark:bg-slate-700">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              Trusted by eCommerce Businesses
            </h2>

            <p className="mt-4 text-gray-500 sm:text-xl dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              dolores laborum labore provident impedit esse recusandae facere
              libero harum sequi.
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center card-shadow-custom">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Total Sales
                </dt>

                <dd className="text-4xl font-extrabold text-[#16a34a] md:text-5xl dark:text-white">
                  $4.8m
                </dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center card-shadow-custom">
                <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                  Official Addons
                </dt>

                <dd className="text-4xl font-extrabold text-[#16a34a] md:text-5xl dark:text-white">
                  24
                </dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center card-shadow-custom">
                <dt className="order-last text-lg font-medium text-gray-500 dark:text-white">
                  Total Addons
                </dt>

                <dd className="text-4xl font-extrabold text-[#16a34a] md:text-5xl dark:text-gray-400">
                  86
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
