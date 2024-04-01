import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import conf, { Query, databases } from "../conf/config";
import Skeleton from "./Skeleton";

const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const resp = await databases.listDocuments(
          conf.databaseId,
          conf.collectionId,
          [Query.equal("category", "trending")]
        );

        setTrendingProducts(resp?.documents);
      } catch (error) {}
    };
    getAllProducts(trendingProducts);
  }, []);
  return (
    <>
      <section className="text-gray-600 font-outfit dark:bg-slate-700">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-[#16a34a]"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-outfit text-3xl mb-2 sm:mb-0 dark:text-white">
                Trending Products
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {trendingProducts?.length === 0
              ? Array.from({ length: 10 }).map(() => <Skeleton />)
              : trendingProducts?.map((trendingProducts) => {
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
                    quantity
                  } = trendingProducts;
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
                      quantity={quantity}
                    />
                  );
                })}
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingProducts;
