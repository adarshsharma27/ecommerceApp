import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import conf, { Query, databases } from "../conf/config";
import ProductCard from "./ProductCard";
const WishListProduct = () => {
  const [products, setProducts] = useState();
  const { userId } = useParams();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const promise = await databases.listDocuments(
          conf.databaseId,
          conf.wishListCollectionId,
          [Query.equal("userId", userId)]
        );
        setProducts(promise?.documents);
      } catch (error) {}
    };
    getProducts();
  }, []);

  const filteredBlogs = Array.from(new Set(products?.map((a) => a.id))).map(
    (id) => {
      return products?.find((a) => a.id === id);
    }
  );

  return (
    <>
      <section className="text-gray-600 font-outfit dark:bg-slate-700">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded overflow-hidden">
              <div className="w-24 h-full bg-[#16a34a]"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-outfit text-3xl mb-2 sm:mb-0 dark:text-white">
                WishList Products
              </h1>
            </div>
          </div>
          <div
            className={
              filteredBlogs?.length === 0
                ? "grid  gap-4 place-content-center"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            }
          >
            {filteredBlogs?.length !== 0 ? (
              filteredBlogs?.map((whishListProducts) => {
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
                  quantity,
                } = whishListProducts;
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
              })
            ) : (
              <>
                <div className="text-center">
                  <h4 className="text-gray-900 font-bold  pb-4 font-outfit text-3xl mb-2 sm:mb-0 dark:text-white">
                    No Products
                  </h4>
                  <img
                    className="w-3/5 mx-auto"
                    alt="noWishList"
                    src="/images/wishlist.svg"
                    loading="lazy"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WishListProduct;
