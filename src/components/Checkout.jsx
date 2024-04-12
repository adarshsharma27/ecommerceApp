import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../features/ProductsSlice";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import conf, { ID, databases } from "../conf/config";
import toast from "react-hot-toast";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState();
  const [pinCode, setPinCode] = useState();
  const [address, setAddress] = useState();
  const cart = useSelector((state) => state.ProductsReducer.productsData);
  const [total, setTotal] = useState("");
  useEffect(() => {
    let price = 0;
    cart.map((products) => (price += products.quantity * products.price));
    setTotal(price);
  }, [cart]);

  const addOrders = async () => {
    try {
      await databases.createDocument(
        conf.databaseId,
        "6617c156ae6c441afbb6",
        ID.unique(),
        {
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          mobileNo: localStorage.getItem("mobileNo"),
          pinCode: localStorage.getItem("pinCode"),
          address: localStorage.getItem("address"),
          total,
        }
      );
      toast.success("Order Created Successfully", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#fff",
          color: "#252525",
          padding: "20px",
          fontWeight: "700",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          borderBottom: "3px solid #4F46E5",
          borderRadius: "3px",
          fontFamily: "Outfit, sans-serif",
        },
      });
      dispatch(resetCart());
      navigate("/");
      localStorage.clear();
    } catch (error) {}
  };
  return (
    <>
      <section>
        <div className="container px-4 py-8 medium:px-6 medium:py-12 lg:px-8 font-outfit">
          <div className="mx-auto container">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 medium:text-3xl">
                Checkout
              </h1>
            </header>
            {cart.length !== 0 ? (
              <div className="pt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                <div className="rounded-l  md:col-span-2 lg:p-12">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="sr-only" for="name">
                        Name
                      </label>
                      <input
                        className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                        placeholder="Name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          localStorage.setItem("name", e.target.value);
                        }}
                      />
                      <label className="sr-only" for="email">
                        Email
                      </label>
                      <input
                        className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                        placeholder="Email address"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          localStorage.setItem("email", e.target.value);
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="sr-only" for="phone">
                          Phone
                        </label>
                        <input
                          className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                          placeholder="Phone Number"
                          type="tel"
                          id="phone"
                          value={mobileNo}
                          onChange={(e) => {
                            setMobileNo(e.target.value);
                            localStorage.setItem("mobileNo", e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <label className="sr-only" for="email">
                          PinCode
                        </label>
                        <input
                          className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                          placeholder="PinCode"
                          type="text"
                          id="pinCode"
                          value={pinCode}
                          onChange={(e) => {
                            setPinCode(e.target.value);
                            localStorage.setItem("pinCode", e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="sr-only" for="message">
                        Address
                      </label>

                      <textarea
                        className="w-full rounded-3xl text-gray-700 border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                        placeholder="Address"
                        rows="8"
                        id="message"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          localStorage.setItem("address", e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="px-4 w-full md:border-l-2 border-l-0 h-full border-gray-100 ">
                  <h1 className="text-xl font-bold text-gray-900 medium:text-3xl py-4">
                    Cart Totals
                  </h1>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-700 medium:text-2xl  py-1">
                      SubTotal:
                      <span className="text-gray-600 px-4">{total}</span>
                    </h2>
                    <h2 className="text-xl font-bold text-gray-700 medium:text-2xl">
                      Shipping:<span className="text-gray-600  px-4">Free</span>
                    </h2>
                    <div className="border-t-2 w-full border-gray-400 py-4">
                      <h2 className="text-xl font-bold text-gray-900 medium:text-3xl flex justify-between">
                        Total:<span className="text-gray-600">{total}</span>
                      </h2>
                    </div>

                    <div className="flex">
                      {total !== "" && (
                        <PayPalButtons
                          style={{
                            layout: "horizontal",
                            color: "blue",
                            shape: "pill",
                          }}
                          className="block rounded-full border border-[#0070ba] bg-[#0070ba]  px-12 py-3 text-medium text-gray-100 transition hover:bg-[#0070ba]"
                          disabled={
                            !total ||
                            !name ||
                            !email ||
                            !mobileNo ||
                            !pinCode ||
                            !address
                          }
                          onApprove={addOrders}
                          createOrder={(data, action) => {
                            return action.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: total,
                                    currency_code: "USD",
                                  },
                                },
                              ],
                            });
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-8 grid grid-cols-1">
                <h2
                  className="text-xl  text-center font-bold text-gray-600"
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

export default Checkout;
