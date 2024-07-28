import React from "react";
import {
  LuTrash2,
  LuPencilLine,
  LuPlusCircle,
  LuArrowDown,
  LuArrowUp,
  LuSearch,
} from "react-icons/lu";
import conf, { databases } from "../../conf/config";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
const DashBoardProducts = ({ allProducts, setUpdatedProducts }) => {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [showArrow, setShowArrow] = React.useState(true);
  const columns = [
    {
      header: "Img",
      accessorKey: "imageUrl",
      cell: function render(row) {
        return (
          <img
            src={row.getValue()}
            alt={row?.row.original?.title}
            className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        );
      },
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Description",
      accessorKey: "description",
      accessorFn: (row) => `${row.description.slice(0, 20)}...`,
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "OldPrice",
      accessorKey: "oldPrice",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Stock",
      accessorKey: "outOfStock",
      accessorFn: (row) =>
        row.outOfStock === true ? "Unavailable" : "Available",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "MainCategory",
      accessorKey: "mainCategory",
    },
    {
      header: "SubCategory",
      accessorKey: "subCategory",
    },
    {
      header: "Edit",
      accessorKey: "edit",
      enableSorting: false,
      cell: function render(row) {
        return (
          <NavLink to={`/updateproduct/${row?.row.original.$id}`}>
            <LuPencilLine
              className=" text-indigo-400 hover:text-[#16a34a] hover:cursor-pointer dark:text-white"
              size={30}
            />
          </NavLink>
        );
      },
    },
    {
      header: "History",
      accessorKey: "history",
      enableSorting: false,
      cell: function render(row) {
        console.log(row);
        return (
          <LuTrash2
            className="text-red-400 hover:text-[#16a34a] hover:cursor-pointer dark:text-white"
            size={30}
            onClick={() => deleteProduct(row?.row.original.$id)}
          />
        );
      },
    },
  ];
  const table = useReactTable({
    data: allProducts && allProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });
  const deleteProduct = async ($id) => {
    setUpdatedProducts(true);
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
      <div className="overflow-x-auto mt-2 overflow-y-scroll h-[80vh] container mx-auto rounded-lg border border-gray-200  dark:bg-[#313E51] dark:shadow-2xl card-shadow-custom dark:text-white">
        <form className="search w-[60%]  relative py-4 px-2">
          <input
            className="w-full rounded-lg  text-gray-700 border-gray-300 p-4 pe-12 text-base shadow-lg  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <div className="search-button absolute inset-y-8 end-4">
            <LuSearch size={26} />
          </div>
        </form>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-base  dark:bg-[#313E51] dark:divide-[#313E51] dark:text-white">
          <thead className="text-center bg-gray-100 dark:bg-[#313E51]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {showArrow && !header.column.getIsSorted() && (
                      <LuArrowDown size={20} />
                    )}
                    {{
                      asc: <LuArrowUp size={20} />,
                      desc: <LuArrowDown size={20} />,
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length === 0 ? (
              <td
                colspan="4"
                className="fs-5 py-2 text-center fw-bold text-danger"
                id="exampleModalLongTitle"
              >
                No Products
              </td>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} role="button">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-lg flex justify-end items-center py-3 px-3 cursor-pointer">
        <span className="pe-2">Row Per Page</span>{" "}
        <select
          className="border-2 border-gray-300 p-1"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span className="px-3">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>{" "}
        </span>
        <div
          className="page-item paginator "
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </div>{" "}
        <div
          className="page-item paginator  px-2"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </div>{" "}
        <div
          className="page-item paginator  px-2"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </div>{" "}
        <div
          className="page-item paginator"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </div>{" "}
      </div>
    </>
  );
};

export default DashBoardProducts;
