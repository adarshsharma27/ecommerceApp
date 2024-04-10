import React, { useEffect, useState } from "react";
import conf, { databases } from "../conf/config";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../features/ProductsSlice";
import Rating from "./Rating";
const ProductDetails = () => {
  const cart = useSelector((state) => state.ProductsReducer.productsData);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const resp = await databases.getDocument(
          conf.databaseId,
          conf.collectionId,
          id
        );

        setProduct(resp);
      } catch (error) {}
    };
    getProduct();
  }, [id]);

  const addProducts = () => {
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
    } = product;
    dispatch(
      addToCart({
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
      })
    );
    toast.success("Product Added Successfully", {
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
  };
  const incrementProductQty = ($id) => {
    dispatch(incrementQuantity($id));
  };
  const decrementProductQty = ($id) => {
    dispatch(decrementQuantity($id));
  };
  return (
    <>
      <section className="text-gray-600 font-outfit overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={product.title}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <span className="whitespace-nowrap bg-[#16a34a] text-white px-3 py-1.5 text-xs font-medium rounded-full">
                {product.subCategory}
              </span>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <Rating rating={product.rating} />

              <p className="leading-relaxed">{product.description}</p>
              <div className="flex justify-between pt-4">
                <p className="mt-1.5 text-lg font-bold text-gray-700">
                  ${product.price}
                  <span className="line-through text-gray-500 font-bold px-1 text-lg">
                    ${product.oldPrice}
                  </span>
                </p>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              {/* <h2 className="font-medium text-lg">Quantity (2 Pc)</h2> */}
              <div className="flex gap-3 items-center py-4">
                <div className="p-2 border rounded-full flex gap-10 items-center px-5">
                  {cart[0]?.quantity ? (
                    <button
                      onClick={() => decrementProductQty(product.$id)}
                      className="cursor-pointer"
                    >
                      -
                    </button>
                  ) : (
                    ""
                  )}

                  <h2>
                    {cart[0]?.quantity ? cart[0]?.quantity : product.quantity}
                  </h2>
                  {cart[0]?.quantity ? (
                    <button
                      onClick={() => incrementProductQty(product.$id)}
                      className="cursor-pointer"
                    >
                      +
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <h2 className="text-2xl font-bold">
                  {cart[0]?.quantity
                    ? cart[0]?.quantity * cart[0]?.price
                    : product.price}
                </h2>
              </div>

              <button
                className=" mt-2 block w-full rounded-full bg-[#198057]  text-white px-12 py-3 text-sm font-medium transition hover:scale-105 hover:bg-[#16a34a] disabled:cursor-not-allowed disabled:opacity-60"
                onClick={addProducts}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
