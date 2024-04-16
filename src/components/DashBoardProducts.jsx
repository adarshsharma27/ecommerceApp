import React from "react";
import { LuTrash2, LuPencilLine, LuPlusCircle } from "react-icons/lu";
import conf, { databases } from "../conf/config";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
const DashBoardProducts = ({ allProducts }) => {
  const deleteProduct = async ($id) => {
    try {
      await databases.deleteDocument(conf.databaseId, conf.collectionId, $id);
      toast.success("Product Deleted Successfully", {
        duration: 4000,
        position: "bottom-right",
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
    } catch (error) {
      toast.error(error.message, {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#fff",
          color: "#252525",
          padding: "20px",
          fontWeight: "700",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          borderBottom: "3px solid #F17171",
          borderRadius: "3px",
          fontFamily: "Outfit, sans-serif",
        },
      });
    }
  };
  return (
    <>
      <div className="overflow-x-auto overflow-y-scroll h-[80vh] container my-6 mx-auto rounded-lg border border-gray-200  dark:bg-[#313E51] dark:shadow-2xl card-shadow-custom dark:text-white">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-medium  dark:bg-[#313E51] dark:divide-[#313E51] dark:text-white">
          <thead className="text-center bg-gray-100 dark:bg-[#313E51] ">
            <tr>
              <th className="whitespace-nowrap  px-2 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                Img
              </th>
              <th className="whitespace-nowrap px-2 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                Title
              </th>
              <th className="whitespace-nowrap px-2 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                Description
              </th>

              <th className="whitespace-nowrap px-2 py-2  text-lg font-semibold text-gray-900 dark:text-white">
                Price
              </th>
              <th className="whitespace-nowrap  px-2 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                OldPrice
              </th>
              <th className="whitespace-nowrap  px-2 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                Quantity
              </th>
              <th className="whitespace-nowrap  px-2 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                Stock
              </th>
              <th className="whitespace-nowrap px-2 py-2  text-lg font-semibold text-gray-900 dark:text-white">
                Category
              </th>
              <th className="whitespace-nowrap px-2 py-2  text-lg font-semibold text-gray-900 dark:text-white">
                MainCategory
              </th>
              <th
                colspan="2"
                className="whitespace-nowrap  px-2 py-2 text-lg font-semibold text-gray-900 dark:text-white"
              >
                SubCategory
              </th>
              <th className="whitespace-nowrap text-center  py-2 text-lg font-semibold text-gray-900 dark:text-white">
                <NavLink to="/addproducts">
                  <LuPlusCircle
                    className="text-[#198057] hover:text-[#16a34a] hover:cursor-pointer dark:text-white"
                    size={30}
                  />
                </NavLink>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {allProducts?.map((elements) => (
              <tr
                className="even:bg-gray-50 dark:bg-slate-600 text-center"
                key={elements.$id}
              >
                <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-white">
                  <img
                    src={elements.imageUrl}
                    alt={elements.title}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </td>
                <td className="whitespace-nowrap  px-2 py-2 font-medium text-gray-900 dark:text-white">
                  {elements.title}
                </td>
                <td className="whitespace-rap   py-2 font-sm text-gray-900 dark:text-white">
                  {elements.description?.slice(0,20)}..
                </td>
                <td className="whitespace-nowrap  px-2 py-2 text-gray-700 dark:text-white text-transform: capitalize">
                  {elements.price}
                </td>
                <td className="whitespace-nowrap  px-2 py-2 text-gray-700 dark:text-white">
                  {elements.oldPrice}
                </td>
                <td className="whitespace-nowrap  px-2 py-2 text-gray-700 dark:text-white">
                  {elements.quantity}
                </td>
                <td className="whitespace-nowrap  px-2 py-2 text-gray-700 dark:text-white">
                  {elements.outOfStock === true ? "Unavailable" : "Available"}
                </td>
                <td className="whitespace-nowrap  px-2 py-2 text-gray-700 dark:text-white">
                  {elements.category}
                </td>
                <td className="whitespace-nowrap  px-2 py-2 text-gray-700 dark:text-white">
                  {elements.mainCategory}
                </td>
                <td className="whitespace-nowrap  px-2 py-2 text-gray-700 dark:text-white">
                  {elements.subCategory}
                </td>
                <td className="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-white">
                <NavLink to ={`/updateproduct/${elements.$id}`}>
                  <LuPencilLine
                    className=" text-indigo-400 hover:text-[#16a34a] hover:cursor-pointer dark:text-white"
                    size={30}
                    
                  />
                  </NavLink>
                </td>
                <td className="whitespace-nowrap px-2 py-2 text-gray-700 dark:text-white">
                  <LuTrash2
                    className="text-red-400 hover:text-[#16a34a] hover:cursor-pointer dark:text-white"
                    size={30}
                    onClick={() => deleteProduct(elements.$id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashBoardProducts;
