import React from "react";

const DashBoardProducts = ({ allProducts }) => {
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
              <th className="whitespace-nowrap  px-2 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                Email
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
              <th className="whitespace-nowrap  px-2 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                SubCategory
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {allProducts?.map((elements) => (
              <tr
                className="even:bg-gray-50 dark:bg-slate-600 text-center"
                key={elements.$id}
              >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  <img
                    src={elements.image}
                    alt={elements.title}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  {elements.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white text-transform: capitalize">
                  {elements.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.oldPrice}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.quantity}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.outOfStock === true ? "Unavailable" : "Available"}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.category}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.mainCategory}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.subCategory}
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
