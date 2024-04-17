import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { addToCart } from "../features/ProductsSlice";
import toast from "react-hot-toast";
import Rating from "./Rating";
import conf, { ID, databases } from "../conf/config";

const ProductCard = ({
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
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageUrl = useLocation();
  const [wishList, setWishList] = useState();
  const userDetails = useSelector(
    (state) => state.AuthenticationReducer.userData
  );
  useEffect(() => {
    if (pageUrl?.pathname.split("/")[1] === `wishlist`) setWishList(true);
    else setWishList(false);
  }, [pageUrl]);
  const addProducts = () => {
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
  const addToWishList = async () => {
    try {
      const response = await databases.createDocument(
        conf.databaseId,
        conf.wishListCollectionId,
        ID.unique(),
        {
          id: $id,
          title,
          price,
          oldPrice,
          description,
          subCategory,
          image,
          rating,
          outOfStock,
          quantity,
          userId: userDetails?.userId,
        }
      );
      toast.success("Product Added to WhishList", {
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

      navigate(`/wishlist/${userDetails?.userId}/${$id}`);
    } catch (error) {
      toast.error("Product Already In WhishList", {
        duration: 4000,
        position: "bottom-right",
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
  const removeFromWishList = async () => {
    try {
      await databases.deleteDocument(
        conf.databaseId,
        conf.wishListCollectionId,
        $id
      );
      toast.success("Product Removed from WhishList", {
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
    navigate("/");
  };
  return (
    <div
      className="group relative block overflow-hidden font-outfit card-shadow-custom rounded-md"
      key={$id}
    >
      {wishList ? (
        <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-[#198057] hover:scale-101 ">
          <span className="sr-only">Wishlist</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#16a34a"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 hover:scale-105"
            onClick={() => removeFromWishList()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      ) : (
        <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-[#198057] ">
          <span className="sr-only">Wishlist</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
            onClick={() => addToWishList()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      )}

      <NavLink to={`/productDetails/${$id}`}>
        <img
          src={image}
          alt={title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      </NavLink>

      <div className="relative  bg-white p-6">
        <div className="flex justify-between items-center">
          <span className="whitespace-nowrap bg-[#16a34a] text-white px-3 py-1.5 text-xs font-medium rounded-full">
            {subCategory}
          </span>
          <Rating rating={rating} />
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>

        <p className="mt-1.5 text-lg font-bold text-gray-700">
          ${price}
          <span className="line-through text-gray-500 font-bold px-1 text-lg">
            ${oldPrice}
          </span>
        </p>
        <div className="mt-4">
          <button
            className="block w-full rounded-full bg-[#198057]  text-white px-12 py-3 text-sm font-medium transition hover:scale-105 hover:bg-[#16a34a] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={outOfStock === "true" ? true : false}
            onClick={addProducts}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
