import React from "react";
import { categoriesData } from "../utlis/categoriesData";
import { NavLink } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <section className="text-gray-600 font-outfit dark:bg-slate-700 overflow-hidden">
        <div className="container px-5 pt-8 mx-auto">
          <div className="flex justify-between gap-2 md:overflow-hidden overflow-x-scroll">
            {categoriesData.map((category) => (
              <div className="text-center  flex-none" key={category.id}>
              <NavLink to={`/category${category.link}`}>
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="md:h-[110px] md:w-[110px] w-[80px] h-[80px] rounded-full object-cover transition duration-500 group-hover:scale-105 border-4 p-1 border-[#198057]"
                  loading="lazy"
                />
                <h3 className="md:text-lg  text-sm font-bold text-gray-700">
                  {category.title}
                </h3>
              </NavLink>
              </div>

            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
