import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { LuAlignRight, LuX } from "react-icons/lu";
const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleNavigation = () => {
    setOpen(!open);
  };
  return (
    <>
      <header className="text-gray-600 font-outfit bg-gray-100 dark:bg-slate-700">
        {/* Desktop Navigation start */}
        <div className="hidden container mx-auto md:flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex font-outfit font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img src="../images/logo.png" width="40px" />
            <span className="ml-2 text-xl font-bold text-purple-500">
              E-commerce
            </span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <NavLink
              to="/"
              className="mr-5 hover:text-gray-900 dark:text-white  font-semibold"
            >
              Home
            </NavLink>

            <NavLink
              to="/aboutus"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              About Us
            </NavLink>

            <NavLink
              to="/allProducts"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              All Products
            </NavLink>

            <NavLink
              to="/bestsellers"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              Best Sellers
            </NavLink>

            <NavLink
              to="/login"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
              onClick={""}
            >
              LogOut
            </NavLink>

            <NavLink
              to="/signUp"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              SignUp
            </NavLink>

            <NavLink
              to="/login"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              Login
            </NavLink>
          </nav>
          <Link
            to="/cart"
          >
            <h2 className="flex gap-2 items-center text-lg pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-shopping-basket h-7 w-7"
              >
                <path d="m15 11-1 9"></path>
                <path d="m19 11-4-7"></path>
                <path d="M2 11h20"></path>
                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"></path>
                <path d="M4.5 15.5h15"></path>
                <path d="m5 11 4-7"></path>
                <path d="m9 11 1 9"></path>
              </svg>
              <span className="bg-[#198057] text-white  px-2 rounded-full">0</span>
            </h2>
          </Link>
          <Link
            to="/search"
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
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Link>
        </div>
        {/* Desktop Navigation end */}
        {/* Mobile Navigation start */}
        <div className="md:hidden container mx-auto flex flex-wrap px-4 pt-3 flex-col">
          <div className="fixed top-0 left-0 right-0 z-30 container mx-auto flex flex-wrap px-4 pt-3 flex-col bg-gray-100 dark:bg-slate-600 ">
            <div className="flex justify-between z-30 text-gray-600 dark:text-white">
              <NavLink
                to="/"
                className="flex font-outfit font-medium items-center  mb-4 md:mb-0"
              >
                <img src="../images/logo.png" width="30px" />
                <span className="ml-2 text-xl font-bold text-purple-500">
                  DesiBlogs
                </span>
              </NavLink>
              <div>
                {open === true ? (
                  <LuX
                    className="text-2xl"
                    onClick={() => toggleNavigation()}
                  />
                ) : (
                  <LuAlignRight
                    className="text-2xl"
                    onClick={() => toggleNavigation()}
                  />
                )}
              </div>
            </div>
          </div>

          <nav
            className={
              open === true
                ? "text-center z-20 mx-auto flex flex-col  justify-center  bg-gray-100 text-gray-600 dark:bg-slate-600 w-full h-screen items-center text-base gap-2 fixed top-0 left-0 transition-all duration-1000 ease-in-out "
                : "text-center z-20 mx-auto flex flex-col  justify-center  bg-gray-100 text-gray-600 dark:bg-slate-600 w-full h-screen items-center text-base gap-2 fixed top-0  left-[-500px] transition-all duration-1000 ease-in-out "
            }
          >
            <NavLink
              to="/"
              className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-purple-500  font-semibold"
              onClick={() => toggleNavigation()}
            >
              Home
            </NavLink>

            <NavLink
              to="/aboutus"
              className="hover:text-purple-500 dark:text-white  py-2 border-b-2 w-10/12 border-gray-500  hover:border-purple-500  font-semibold"
              onClick={() => toggleNavigation()}
            >
              About Us
            </NavLink>

            <NavLink
              to="/All Products"
              className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-purple-500  font-semibold"
              onClick={() => toggleNavigation()}
            >
              All Products
            </NavLink>

            <NavLink
              to={""}
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              Best Sellers
            </NavLink>

            <NavLink
              to="/login"
              className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-purple-500  font-semibold"
              onClick={""}
            >
              LogOut
            </NavLink>
            <Link
              to="/All Products"
              className="hover:text-purple-500 flex justify-center items-center	 dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-purple-500  font-semibold"
              onClick={() => toggleNavigation()}
            ></Link>

            <NavLink
              to="/signUp"
              className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-purple-500  font-semibold"
            >
              SignUp
            </NavLink>

            <NavLink
              to="/login"
              className="hover:text-purple-500 dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-purple-500  font-semibold"
            >
              Login
            </NavLink>

            <Link
              to="/search"
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
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Link>
          </nav>
        </div>
        {/* mobile navigation end */}
      </header>
    </>
  );
};

export default Header;
