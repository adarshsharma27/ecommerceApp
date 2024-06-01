import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { LuAlignRight, LuX } from "react-icons/lu";
import { FaOpencart } from "react-icons/fa6";
import conf, { account } from "../conf/config";
import { logOut } from "../features/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
const Header = ({ addDarkMode, darkMode }) => {
  const [open, setOpen] = useState(false);
  const userDetails = useSelector(
    (state) => state.AuthenticationReducer.userData
  );
  const cart = useSelector((state) => state.ProductsReducer.productsData);
  const dispatch = useDispatch();
  const LogOut = async () => {
    await account.deleteSession("current");
    dispatch(logOut(null));
    setOpen(!open);
  };
  const toggleNavigation = () => {
    setOpen(!open);
  };
  return (
    <>
      <header className="text-gray-600 font-outfit bg-gray-100  dark:bg-[#2D3949]">
        {/* Desktop Navigation start */}
        <div className="hidden container mx-auto md:flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex font-outfit font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <FaOpencart size={40} className="text-[#16a34a]" />
            <span className="text-xl font-bold text-[#198057]">
              sabkaBazzar
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
              to="/trending"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              Trending
            </NavLink>
            <NavLink
              to="/popular"
              className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
            >
              Popular
            </NavLink>
            {userDetails?.userId === conf.adminUserId &&
              userDetails?.providerUid === conf.adminUserEmail && (
                <NavLink
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                  to="/dashboard"
                >
                  DashBoard
                </NavLink>
              )}
            {userDetails ? (
              <>
                <NavLink
                  to={`/wishlist/${userDetails?.userId}`}
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                >
                  WishList
                </NavLink>
                <NavLink
                  to="/login"
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                  onClick={LogOut}
                >
                  LogOut
                </NavLink>
                <Link
                  to="/userprofile"
                  className="mr-5 hover:text-gray-900 dark:text-white font-semibold"
                >
                  <div className="w-8 h-8 text-white flex justify-center items-center bg-[#16a34a] rounded-full text-center font-bold">
                    {userDetails?.providerUid?.slice(0, 1)?.toUpperCase()}
                  </div>
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </nav>

          <Link to="/cart">
            <h2 className="flex gap-2 items-center text-lg pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-basket h-7 w-7 dark:text-white"
              >
                <path d="m15 11-1 9"></path>
                <path d="m19 11-4-7"></path>
                <path d="M2 11h20"></path>
                <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"></path>
                <path d="M4.5 15.5h15"></path>
                <path d="m5 11 4-7"></path>
                <path d="m9 11 1 9"></path>
              </svg>
              <span className="bg-[#198057] text-white  px-2 rounded-full">
                {cart?.length}
              </span>
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
          <button
            className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none text-base mt-2 md:mt-0"
            onClick={() => {
              addDarkMode();
            }}
          >
            {darkMode ? (
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                  className="fill-sky-400/20"
                ></path>
                <path
                  d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                  className="fill-sky-500"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                  className="fill-sky-500"
                ></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  className="stroke-slate-400 dark:stroke-slate-500"
                ></path>
                <path
                  d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                  className="stroke-slate-400 dark:stroke-slate-500"
                ></path>
              </svg>
            )}
          </button>
        </div>
        {/* Desktop Navigation end */}
        {/* Mobile Navigation start */}
        <div className="md:hidden container mx-auto flex flex-wrap px-4 pt-3 flex-col">
          <div className="fixed top-0 left-0 right-0 z-30 container mx-auto flex flex-wrap px-4 pt-3 flex-col bg-gray-100 dark:bg-slate-600 ">
            <div className="flex justify-between z-30 text-gray-600 dark:text-white">
              <Link
                to="/"
                className="flex font-outfit font-medium items-center text-gray-900 mb-4 md:mb-0"
              >
                <FaOpencart size={40} className="text-[#16a34a]" />
                <span className="text-xl font-bold text-[#198057]">
                  sabkaBazzar
                </span>
              </Link>

              <div className="flex gap-2">
                <Link to="/cart">
                  <h2 className="flex gap-1 items-center text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                    <span className="bg-[#198057] text-white text-center h-7 w-7  rounded-full">
                      {cart?.length}
                    </span>
                  </h2>
                </Link>
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
              className="hover:text-[#16a34a] dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-[#16a34a]  font-semibold"
              onClick={() => toggleNavigation()}
            >
              Home
            </NavLink>

            <NavLink
              to="/aboutus"
              className="hover:text-[#16a34a] dark:text-white  py-2 border-b-2 w-10/12 border-gray-500  hover:border-[#16a34a]  font-semibold"
              onClick={() => toggleNavigation()}
            >
              About Us
            </NavLink>

            <NavLink
              to="/allproducts"
              className="hover:text-[#16a34a] dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-[#16a34a]  font-semibold"
              onClick={() => toggleNavigation()}
            >
              All Products
            </NavLink>

            <NavLink
              to="/bestsellers"
              className="hover:text-[#16a34a] dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-[#16a34a]  font-semibold"
              onClick={() => toggleNavigation()}
            >
              Best Sellers
            </NavLink>

            {userDetails ? (
              <>
                <NavLink
                  to={`/wishlist/${userDetails?.userId}`}
                  className="hover:text-[#16a34a] dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-[#16a34a]  font-semibold"
                  onClick={() => toggleNavigation()}
                >
                  WishList
                </NavLink>
                <NavLink
                  to="/login"
                  className="hover:text-[#16a34a] dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-[#16a34a]  font-semibold"
                  onClick={() => toggleNavigation()}
                >
                  LogOut
                </NavLink>
                <Link
                  to="/userprofile"
                  className="hover:text-[#16a34a] dark:text-white py-2 border-b-2 w-10/12 border-gray-500  hover:border-[#16a34a]  font-semibold"
                  onClick={() => toggleNavigation()}
                >
                  <div className="w-8 h-8 mx-auto text-white flex justify-center items-center bg-[#16a34a] rounded-full text-center font-bold">
                    {userDetails?.providerUid?.slice(0, 1)?.toUpperCase()}
                  </div>
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to="/signUp"
                  className="hover:text-[#16a34a] dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-[#16a34a]  font-semibold"
                  onClick={() => toggleNavigation()}
                >
                  SignUp
                </NavLink>

                <NavLink
                  to="/login"
                  className="hover:text-[#16a34a] dark:text-white py-2 border-b-2 w-10/12 border-gray-500 hover:border-[#16a34a]  font-semibold"
                  onClick={() => toggleNavigation()}
                >
                  Login
                </NavLink>
              </>
            )}

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
            <button
              className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none text-base mt-2 md:mt-0"
              onClick={() => {
                addDarkMode();
              }}
            >
              {darkMode ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                    className="fill-sky-400/20"
                  ></path>
                  <path
                    d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                    className="fill-sky-500"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                    className="fill-sky-500"
                  ></path>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    className="stroke-slate-400 dark:stroke-slate-500"
                  ></path>
                  <path
                    d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                    className="stroke-slate-400 dark:stroke-slate-500"
                  ></path>
                </svg>
              )}
            </button>
          </nav>
        </div>
        {/* mobile navigation end */}
      </header>
    </>
  );
};

export default Header;
