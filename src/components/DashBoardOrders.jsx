import React from "react";

const DashBoardOrders = ({ allOrders }) => {
 
  return (
    <>
      <div className="overflow-x-auto overflow-y-scroll h-[80vh] container my-6 mx-auto rounded-lg border border-gray-200  dark:bg-[#313E51] dark:shadow-2xl card-shadow-custom dark:text-white">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-medium  dark:bg-[#313E51] dark:divide-[#313E51] dark:text-white">
          <thead className="text-center bg-gray-100 dark:bg-[#313E51] ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-semibold text-gray-900 dark:text-white">
                orderId
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-semibold text-gray-900 dark:text-white">
                userId
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-lg font-semibold text-gray-900 dark:text-white">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-semibold text-gray-900 dark:text-white">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-semibold text-gray-900 dark:text-white">
                Mobile No.
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-semibold text-gray-900 dark:text-white">
                PinCode
              </th>
              <th className="whitespace-nowrap px-4 py-2  text-lg font-semibold text-gray-900 dark:text-white">
                Address
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {allOrders?.map((elements) => (
              <tr
                className="even:bg-gray-50 dark:bg-slate-600 text-center"
                key={elements.$id}
              >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  {elements.$id}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  {elements.userId}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white text-transform: capitalize">
                  {elements.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.mobileNo}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.pinCode}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">
                  {elements.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashBoardOrders;
