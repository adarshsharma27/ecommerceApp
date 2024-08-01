import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  resetCart,
} from "../features/ProductsSlice";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.ProductsReducer.productsData);
  const [total, setTotal] = useState("");
  useEffect(() => {
    let price = 0;
    cart.map((products) => (price += products.quantity * products.price));
    setTotal(price);
  }, [cart]);
  const resetProducts = () => {
    dispatch(resetCart());
  };
  const removeProducts = ($id) => {
    dispatch(removeFromCart($id));
  };
  const incrementProductQty = ($id) => {
    dispatch(incrementQuantity($id));
  };
  const decrementProductQty = ($id) => {
    dispatch(decrementQuantity($id));
  };
  return (
    <>
      <section>
        <div className="container-fluid px-4 py-8 medium:px-6 medium:py-12 lg:px-8 font-outfit dark:bg-slate-700">
          <div className="mx-auto container">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 medium:text-3xl dark:text-white">
                Your Cart
              </h1>
            </header>
            {cart.length !== 0 ? (
              <div className="pt-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-3">
                <ul className="space-y-4 col-span-3">
                  {cart.map((products) => (
                    <li
                      className="flex md:flex-row md:items-center md:justify-between flex-col items-start md:gap-4 gap-1"
                      key={products.$id}
                    >
                      <img
                        src={products.image}
                        alt=""
                        className="w-40 object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {products.title}
                        </h3>
                      </div>
                      <span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-200">
                        {products.price}
                      </span>

                      <div className="flex gap-3 items-center py-4">
                        <div className="p-2 border rounded-full flex gap-10 items-center px-5">
                          <button
                            onClick={() => decrementProductQty(products.$id)}
                            className="cursor-pointer dark:text-gray-200"
                          >
                            -
                          </button>
                          <h2 className="dark:text-gray-200">
                            {products.quantity}
                          </h2>
                          <button
                            onClick={() => incrementProductQty(products.$id)}
                            className="cursor-pointer dark:text-gray-200"
                          >
                            +
                          </button>
                        </div>
                        <h2 className="text-2xl font-bold dark:text-gray-200">
                          {products.quantity * products.price}
                        </h2>
                      </div>
                      <div className="">
                        <button
                          className="text-gray-600 transition hover:text-red-600 cursor-pointer dark:text-white"
                          onClick={() => removeProducts(products.$id)}
                        >
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-7 w-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}

                  {cart.length !== 0 && (
                    <button
                      className="my-4 transition text-white bg-red-500 px-12 py-3  rounded-full hover:bg-red-600"
                      onClick={resetProducts}
                    >
                      Rest Cart
                    </button>
                  )}
                </ul>

                <div className="px-4 w-full md:border-l-2 border-l-0 h-full border-gray-100 ">
                  <h1 className="text-xl font-bold text-gray-900 medium:text-3xl py-4 dark:text-white">
                    Cart Totals
                  </h1>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-700 medium:text-2xl  py-1 dark:text-gray-200">
                      SubTotal:
                      <span className="text-gray-600 px-4 dark:text-white">
                        {total}
                      </span>
                    </h2>
                    <h2 className="text-xl font-bold text-gray-700 medium:text-2xl dark:text-gray-200">
                      Shipping:
                      <span className="text-gray-600  px-4 dark:text-gray-200">
                        Free
                      </span>
                    </h2>
                    <div className="border-t-2 w-full border-gray-400 py-4">
                      <h2 className="text-xl font-bold text-gray-900 medium:text-3xl flex justify-between dark:text-gray-200">
                        Total:
                        <span className="text-gray-600 dark:text-white">
                          {total}
                        </span>
                      </h2>
                    </div>

                    <div className="flex">
                      <NavLink
                        to="/checkout"
                        className="block rounded-full border border-[#198057] bg-[#198057]  px-12 py-3 text-base text-gray-100 transition hover:bg-[#16a34a]"
                      >
                        Proceed To Checkout
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-8 grid grid-cols-1">
                <h2
                  className="text-xl  text-center font-bold text-gray-600 dark:text-white"
                  Your
                  Cart
                  Is
                  Empty
                >
                  Your Cart is Empty{" "}
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
