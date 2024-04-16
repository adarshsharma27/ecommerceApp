import React, { useState, useEffect } from "react";
import DashBoardCharts from "./DashBoardCharts";
import DashBoardTable from "./DashBoardTable";
import { FaUsers, FaIdCardClip, FaCartArrowDown } from "react-icons/fa6";
import conf, { databases } from "../conf/config";
import DashBoardOrders from "./DashBoardOrders";
import DashBoardProducts from "./DashBoardProducts";
import { NavLink } from "react-router-dom";
import { LuPlusCircle } from "react-icons/lu";
const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.usersCollectionId
        );
        setUsers(resp?.total);
        setAllUsers(resp?.documents);
      } catch (error) {}
    };
    getUsers();
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId
        );

        setProducts(resp?.total);
        setAllProducts(resp?.documents);
      } catch (error) {}
    };
    getProducts();
  }, [updatedProducts]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.ordersCollectionId
        );

        setOrders(resp?.total);
        setAllOrders(resp?.documents);
      } catch (error) {}
    };
    getOrders();
  }, []);
  return (
    <>
      <section className="text-gray-600 font-outfit  dark:bg-[#313E51]">
        <div className="container px-5  mx-auto">
          <div className="flex flex-col">
            <div className="flex flex-wrap sm:flex-row flex-col py-6">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl mb-2 sm:mb-0 dark:text-white">
                DashBoard
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            <div className="py-6 sm:mb-0 mb-6 card-shadow-custom rounded-lg flex flex-wrap gap-2  items-center flex-col dark:shadow-2xl">
              <div className="">
                <FaUsers
                  size={50}
                  className="text-indigo-600 hover:text-green-400 hover:cursor-pointer dark:text-sky-500"
                />
              </div>
              <h2 className="text-6xl  font-bold font-montserrat text-gray-900 dark:text-white capitalize">
                {users}
              </h2>

              <p className="text-xl font-bold leading-relaxed  text-gray-600  dark:text-gray-300 capitalize">
                Total Users
              </p>
            </div>
            <div className="py-6 sm:mb-0 mb-6 card-shadow-custom rounded-lg flex flex-wrap gap-2  items-center flex-col dark:shadow-2xl">
              <div className="">
                <FaIdCardClip
                  size={50}
                  className="text-slate-400  hover:text-green-400 hover:cursor-pointer dark:text-sky-500"
                />
              </div>
              <h2 className="text-6xl font-bold font-montserrat text-gray-900 dark:text-white capitalize">
                {products}
              </h2>

              <p className="text-xl font-bold leading-relaxed text-gray-600 dark:text-gray-300 capitalize">
                Total Products
              </p>
            </div>
            <div className="py-6 sm:mb-0 mb-6 card-shadow-custom rounded-lg flex flex-wrap gap-2  items-center flex-col dark:shadow-2xl">
              <div className="">
                <FaCartArrowDown
                  size={50}
                  className="text-[#198057]  hover:text-green-400 hover:cursor-pointer dark:text-sky-500"
                />
              </div>
              <h2 className="text-6xl font-bold font-montserrat text-gray-900 dark:text-white capitalize">
                {orders}
              </h2>

              <p className="text-xl font-bold leading-relaxed text-gray-600 dark:text-gray-300 capitalize">
                Total Orders
              </p>
            </div>
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col pt-6">
            <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl  sm:mb-0 dark:text-white">
              Users Details
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <DashBoardCharts
              users={users}
              products={products}
              orders={orders}
            />
            <DashBoardTable users={allUsers} />
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col pt-6">
            <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl  sm:mb-0 dark:text-white">
              Order Details
            </h1>
          </div>
          <DashBoardOrders allOrders={allOrders} />
          <div className="flex flex-wrap items-start justify-between sm:flex-row flex-col pt-6">
            <h1 className="sm:w-2/5 text-gray-900 font-bold font-montserrat text-3xl  sm:mb-0 dark:text-white">
              Products Details
            </h1>
            <NavLink
              to="/addproducts"
              className="flex justify-center items-center gap-1 font-bold  transition hover:scale-105"
            >
              AddProducts{" "}
              <LuPlusCircle
                className="text-[#198057] hover:text-[#16a34a] hover:cursor-pointer dark:text-white"
                size={30}
              />
            </NavLink>
          </div>
          <DashBoardProducts
            allProducts={allProducts}
            setUpdatedProducts={setUpdatedProducts}
          />
        </div>
      </section>
    </>
  );
};

export default DashBoard;
