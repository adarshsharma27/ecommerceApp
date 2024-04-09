import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import conf, { Query, databases } from "../conf/config";
import toast from "react-hot-toast";
import Skeleton from "./Skeleton";
import { useParams, useLocation } from "react-router-dom";
const SubCategories = () => {
  const { id } = useParams();
  const pageUrl = useLocation();
  const [products, setProducts] = useState([]);

  const [subCategory, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      if (subCategory === "all") {
        try {
          const resp = await databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            [Query.equal("mainCategory", id)]
          );

          setProducts(resp?.documents);
        } catch (error) {}
      } else if (
        (id === "hoodies" && subCategory === "high") ||
        (id === "dresses" && subCategory === "high") ||
        (id === "suits" && subCategory === "high") ||
        (id === "shoes" && subCategory === "high") ||
        (id === "shirts" && subCategory === "high") ||
        (id === "jeans" && subCategory === "high") ||
        (id === "jackets" && subCategory === "high") ||
        (id === "bags" && subCategory === "high") ||
        (id === "headphones" && subCategory === "high") ||
        (id === "sarees" && subCategory === "high")
      ) {
        try {
          const resp = await databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            [Query.equal("mainCategory", id) && Query.greaterThan("price", 499)]
          );

          setProducts(resp?.documents);
        } catch (error) {}
      } else if (
        (id === "hoodies" && subCategory === "low") ||
        (id === "dresses" && subCategory === "low") ||
        (id === "suits" && subCategory === "low") ||
        (id === "shoes" && subCategory === "low") ||
        (id === "shirts" && subCategory === "low") ||
        (id === "jeans" && subCategory === "low") ||
        (id === "jackets" && subCategory === "low") ||
        (id === "bags" && subCategory === "low") ||
        (id === "headphones" && subCategory === "low") ||
        (id === "sarees" && subCategory === "low")
      ) {
        try {
          const resp = await databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            [Query.equal("mainCategory", id), Query.lessThan("price", 250)]
          );

          setProducts(resp?.documents);
        } catch (error) {}
      } else if (
        (id === "hoodies" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1")) ||
        (id === "dresses" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1")) ||
        (id === "suits" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1")) ||
        (id === "shoes" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1")) ||
        (id === "shirts" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1")) ||
        (id === "jeans" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1")) ||
        (id === "jackets" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1")) ||
        (id === "bags" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1")) ||
        (id === "headphones" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1")) ||
        (id === "sarees" &&
          (subCategory === "5" ||
            subCategory === "4" ||
            subCategory === "3" ||
            subCategory === "2" ||
            subCategory === "1"))
      ) {
        try {
          const resp = await databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            [
              Query.equal("mainCategory", id),
              Query.equal("rating", subCategory),
            ]
          );

          setProducts(resp?.documents);
        } catch (error) {}
      } else {
        try {
          const resp = await databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            [
              Query.equal("mainCategory", id),
              Query.equal("subCategory", subCategory),
            ]
          );

          setProducts(resp?.documents);
        } catch (error) {}
      }
    };
    pageUrl?.pathname.split("/")[1] !== `search` && getProducts();
  }, [subCategory]);

  const searchProducts = async () => {
    if (search === "") {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId,
          [Query.equal("mainCategory", id)]
        );

        setProducts(resp?.documents);
      } catch (error) {}
    } else if (search.length < 3) {
      toast.error("Search with more Characters", {
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
    } else if (search.length >= 3) {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId,
          [Query.equal("mainCategory", id), Query.equal("title", search)]
        );
        if (resp?.documents?.length === 0) {
          toast.error("No Search Results", {
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
          setProducts(resp?.documents);
        } else {
          setProducts(resp?.documents);
        }
      } catch (error) {}
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 md:gap-2  font-outfit dark:bg-slate-700">
        <div className="flex  flex-col justify-between md:border-e bg-white dark:bg-slate-700">
          <div className="px-3 md:py-6 pt-16 pb-2">
            <span className="grid h-10 w-32 place-content-center rounded-full bg-gray-100 dark:bg-slate-500 dark:text-white md:text-lg text-base  font-semibold text-gray-500">
              Filters
            </span>

            <ul className="mt-6 md:space-y-4 md:block flex flex-wrap justify-start content-center gap-2">
              <li
                className={
                  active && subCategory === "all"
                    ? "bg-[#16a34a] text-white hidden md:block rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                    : "hidden md:block rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white  cursor-pointer"
                }
                onClick={() => {
                  setCategory("all");
                  setActive(true);
                }}
              >
                {id?.charAt(0).toUpperCase() + id?.slice(1)}
              </li>
              <li
                className={
                  active && subCategory === "men"
                    ? "bg-[#16a34a] text-white hidden md:block rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                    : "hidden md:block rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white  cursor-pointer"
                }
                onClick={() => {
                  setCategory("men");
                  setActive(true);
                }}
              >
                Men
              </li>
              <li
                className={
                  active && subCategory === "women"
                    ? "bg-[#16a34a] text-white hidden md:block rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                    : "hidden md:block rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white  cursor-pointer"
                }
                onClick={() => {
                  setCategory("women");
                  setActive(true);
                }}
              >
                Women
              </li>

              <li
                className={
                  active && subCategory === "high"
                    ? "bg-[#16a34a] text-white hidden md:block rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                    : "hidden md:block rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white  cursor-pointer"
                }
                onClick={() => {
                  setCategory("high");
                  setActive(true);
                }}
              >
                High Price
              </li>
              <li
                className={
                  active && subCategory === "low"
                    ? "bg-[#16a34a] text-white hidden md:block rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                    : "hidden md:block rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white  cursor-pointer"
                }
                onClick={() => {
                  setCategory("low");
                  setActive(true);
                }}
              >
                Low Price
              </li>
              <li className="hidden md:flex items-center gap-1 rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white  cursor-pointer">
                Rating
                <ul className="flex flex-wrap gap-1">
                  <li
                    className={
                      active && subCategory === "5"
                        ? "bg-[#fbbe00] text-white hidden md:block rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                        : "hidden md:block rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-white  hover:bg-[#fbbe00] hover:text-white  cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("5");
                      setActive(true);
                    }}
                  >
                    5
                  </li>
                  <li
                    className={
                      active && subCategory === "4"
                        ? "bg-[#fbbe00] text-white hidden md:block rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                        : "hidden md:block rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-white  hover:bg-[#fbbe00] hover:text-white  cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("4");
                      setActive(true);
                    }}
                  >
                    4
                  </li>
                  <li
                    className={
                      active && subCategory === "3"
                        ? "bg-[#fbbe00] text-white hidden md:block rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                        : "hidden md:block rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-white  hover:bg-[#fbbe00] hover:text-white  cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("3");
                      setActive(true);
                    }}
                  >
                    3
                  </li>
                  <li
                    className={
                      active && subCategory === "2"
                        ? "bg-[#fbbe00] text-white hidden md:block rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                        : "hidden md:block rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-white  hover:bg-[#fbbe00] hover:text-white  cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("2");
                      setActive(true);
                    }}
                  >
                    2
                  </li>
                  <li
                    className={
                      active && subCategory === "1"
                        ? "bg-[#fbbe00] text-white hidden md:block rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-base font-semibold  cursor-pointer"
                        : "hidden md:block rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-base font-semibold text-white  hover:bg-[#fbbe00] hover:text-white  cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("1");
                      setActive(true);
                    }}
                  >
                    1
                  </li>
                </ul>
              </li>
              {/* Mobile filter start */}
              <li
                className={
                  active && subCategory === "all"
                    ? "bg-[#16a34a] text-white block md:hidden rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                    : "block md:hidden rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-[#16a34a] hover:text-white  cursor-pointer"
                }
                onClick={() => {
                  setCategory("all");
                  setActive(true);
                }}
              >
                All
              </li>
              <li
                className={
                  active && subCategory === "men"
                    ? "bg-[#16a34a] text-white block md:hidden rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                    : "block md:hidden rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white cursor-pointer"
                }
                onClick={() => {
                  setCategory("men");
                  setActive(true);
                }}
              >
                Men
              </li>

              <li
                className={
                  active && subCategory === "women"
                    ? "bg-[#16a34a] text-white block md:hidden rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                    : "block md:hidden rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white cursor-pointer"
                }
                onClick={() => {
                  setCategory("women");
                  setActive(true);
                }}
              >
                Women
              </li>

              <li
                className={
                  active && subCategory === "high"
                    ? "bg-[#16a34a] text-white block md:hidden rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                    : "block md:hidden rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white cursor-pointer"
                }
                onClick={() => {
                  setCategory("high");
                  setActive(true);
                }}
              >
                High Price
              </li>
              <li
                className={
                  active && subCategory === "low"
                    ? "bg-[#16a34a] text-white block md:hidden rounded-full  dark:bg-[#16a34a] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                    : "block md:hidden rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white cursor-pointer"
                }
                onClick={() => {
                  setCategory("low");
                  setActive(true);
                }}
              >
                Low Price
              </li>
              <li className="flex items-center gap-2  py-2 md:hidden rounded-full bg-gray-100 dark:bg-slate-600 dark:text-white  px-4 text-sm font-semibold text-gray-700  hover:bg-[#16a34a] hover:text-white cursor-pointer">
                Rating
                <ul className="flex flex-wrap gap-2">
                  <li
                    className={
                      active && subCategory === "5"
                        ? "bg-[#fbbe00] text-white block md:hidden rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                        : "block md:hidden rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-white  hover:bg-[#fbbe00] hover:text-white cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("5");
                      setActive(true);
                    }}
                  >
                    5
                  </li>
                  <li
                    className={
                      active && subCategory === "4"
                        ? "bg-[#fbbe00] text-white block md:hidden rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                        : "block md:hidden rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-white  hover:bg-[#fbbe00] hover:text-white cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("4");
                      setActive(true);
                    }}
                  >
                    4
                  </li>
                  <li
                    className={
                      active && subCategory === "3"
                        ? "bg-[#fbbe00] text-white block md:hidden rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                        : "block md:hidden rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-white  hover:bg-[#fbbe00] hover:text-white cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("3");
                      setActive(true);
                    }}
                  >
                    3
                  </li>
                  <li
                    className={
                      active && subCategory === "2"
                        ? "bg-[#fbbe00] text-white block md:hidden rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                        : "block md:hidden rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-white  hover:bg-[#fbbe00] hover:text-white cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("2");
                      setActive(true);
                    }}
                  >
                    2
                  </li>
                  <li
                    className={
                      active && subCategory === "1"
                        ? "bg-[#fbbe00] text-white block md:hidden rounded-full  dark:bg-[#fbbe00] dark:text-white  px-4 py-2 text-sm font-semibold  cursor-pointer"
                        : "block md:hidden rounded-full bg-yellow-500 dark:bg-slate-600 dark:text-white  px-4 py-2 text-sm font-semibold text-white  hover:bg-[#fbbe00] hover:text-white cursor-pointer"
                    }
                    onClick={() => {
                      setCategory("1");
                      setActive(true);
                    }}
                  >
                    1
                  </li>
                </ul>
              </li>
              {/* Mobile filter end */}
            </ul>
          </div>
        </div>
        <div className="container px-5 py-4 mx-auto font-montserrat col-span-3">
          <div className="card-shadow-custom p-6 rounded">
            <div className="relative">
              <input
                type="text"
                id="Search"
                placeholder="Search"
                className="w-full bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-[#16a34a] focus:bg-white focus:ring-1 focus:ring-[#16a34a] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-700 dark:text-white"
                onChange={(e) => setSearch(e.target.value)}
              />

              <span
                className="absolute inset-y-0 end-0 grid w-10 place-content-center"
                onClick={searchProducts}
              >
                <button
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
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-4">
            {products?.length === 0
              ? Array.from({ length: 10 }).map(() => <Skeleton />)
              : products?.map((products) => {
                  const {
                    $id,
                    title,
                    price,
                    oldPrice,
                    description,
                    subCategory,
                    image,
                    rating,
                    outOfStock,
                  } = products;
                  return (
                    <ProductCard
                      $id={$id}
                      title={title}
                      price={price}
                      oldPrice={oldPrice}
                      subCategory={subCategory}
                      description={description}
                      image={image}
                      rating={rating}
                      outOfStock={outOfStock}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategories;
