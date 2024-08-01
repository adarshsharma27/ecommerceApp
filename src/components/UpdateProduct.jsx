import { React, useEffect, useId, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LuX } from "react-icons/lu";
import conf, { ID, databases, storage } from "../conf/config";

const UpdateProduct = () => {
  const uId = useId();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const [uploadFileId, setUploadFileId] = useState();
  const [hideFileUpload, setHideFileUpload] = useState(false);
  const [imageFileUpload, setImageFileUpload] = useState(false);
  const [createDisable, setCreateDisable] = useState(false);
  const [titleErr, setTitleErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [imageErr, setImageErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [loader, setLoader] = useState(true);
  const productHandle = (e) => {
    setProduct({
      ...product,
      imageUrl,
      uploadFileId,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const getBlog = async () => {
      try {
        const resp = await databases.getDocument(
          conf.databaseId,
          conf.collectionId,
          id
        );
        setProduct(resp);
        setImageUrl(resp?.imageUrl);
        setUploadFileId(resp?.uploadFileId);
        setCreateDisable(false);
        setLoader(false);
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };
    getBlog();
  }, []);
  const updateBlog = async () => {
    if (
      !product.title ||
      product.title.trim() === "" ||
      product.title.length >= 50
    ) {
      setTitleErr(true);
      setCategoryErr(false);
      setImageErr(false);
      setDescriptionErr(false);
      window.scrollTo(0, 0);
    } else if (!product.category || product.category === "") {
      setCategoryErr(true);
      setTitleErr(false);
      setImageErr(false);
      setDescriptionErr(false);
      window.scrollTo(0, 0);
    } else if (!imageUrl || imageUrl.trim() === "") {
      setImageErr(true);
      setTitleErr(false);
      setCategoryErr(false);
      setDescriptionErr(false);
      window.scrollTo(0, 0);
    } else if (
      !product.description ||
      product.description.trim() === "" ||
      product.description.length >= 500
    ) {
      setDescriptionErr(true);
      setTitleErr(false);
      setCategoryErr(false);
      setImageErr(false);
    } else {
      try {
        await databases.updateDocument(conf.databaseId, conf.collectionId, id, {
          title: product.title,
          category: product.category,
          mainCategory: product.mainCategory,
          subCategory: product.subCategory,
          rating: product.rating,
          oldPrice: Number(product.oldPrice),
          price: Number(product.price),
          outOfStock: product.outOfStock,
          quantity: product.quantity,
          description: product.description,
          imageUrl: imageUrl,
          uploadFileId: uploadFileId,
        });
        toast.success("Blog Updated Successfully", {
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
        navigate("/");
      } catch (error) {
        toast.error(error.message, {
          duration: 4000,
          position: "bottom-right",
          style: {
            background: "#fff",
            color: "#252525",
            padding: "20px",
            fontWeight: "700",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            borderBottom: "3px solid #F17171",
            borderRadius: "3px",
            fontFamily: "Outfit, sans-serif",
          },
        });
      }
    }
  };
  const handleImage = (e) => {
    const image = e.target.files[0];
    const imageType = image?.type.split("/")[1];
    const imageSize = image?.size;
    setCreateDisable(true);
    if (
      imageType != "jpeg" &&
      imageType != "jpg" &&
      imageType != "jpeg" &&
      imageType != "gif"
    ) {
      toast.error("Please Upload PNG, JPG or GIF  Format", {
        duration: 4000,
        position: "bottom-right",
        style: {
          background: "#fff",
          color: "#252525",
          padding: "20px",
          fontWeight: "700",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          borderBottom: "3px solid #F17171",
          borderRadius: "3px",
          fontFamily: "Outfit, sans-serif",
        },
      });
    } else if (imageSize > 2000000) {
      toast.error("Please Upload File Size less then 2MB", {
        duration: 4000,
        position: "bottom-right",
        style: {
          background: "#fff",
          color: "#252525",
          padding: "20px",
          fontWeight: "700",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          borderBottom: "3px solid #F17171",
          borderRadius: "3px",
          fontFamily: "Outfit, sans-serif",
        },
      });
    } else {
      if (imageFileUpload) {
        const promise = storage.createFile(conf.bucketId, ID.unique(), image);
        promise.then(
          function (response) {
            const fileId = response.$id;
            if (fileId) {
              const imgUrl = storage.getFilePreview(conf.bucketId, fileId);
              if (imgUrl?.href) {
                setImageUrl(imgUrl?.href);
                setCreateDisable(false);
                setUploadFileId(fileId);
                setHideFileUpload(false);
              }
            }
          },
          function (error) {
            toast.error(error.message, {
              duration: 4000,
              position: "bottom-right",
              style: {
                background: "#fff",
                color: "#252525",
                padding: "20px",
                fontWeight: "700",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                borderBottom: "3px solid #F17171",
                borderRadius: "3px",
                fontFamily: "Outfit, sans-serif",
              },
            });
          }
        );
      } else {
        const promise = storage.updateFile(conf.bucketId, ID.unique(), image);
        promise.then(
          function (response) {
            const fileId = response.$id;
            if (fileId) {
              const imgUrl = storage.getFilePreview(conf.bucketId, fileId);
              if (imgUrl?.href) {
                setImageUrl(imgUrl?.href);
                setCreateDisable(false);
                setUploadFileId(fileId);
                setHideFileUpload(false);
              }
            }
          },
          function (error) {
            toast.error(error.message, {
              duration: 4000,
              position: "bottom-right",
              style: {
                background: "#fff",
                color: "#252525",
                padding: "20px",
                fontWeight: "700",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                borderBottom: "3px solid #F17171",
                borderRadius: "3px",
                fontFamily: "Outfit, sans-serif",
              },
            });
          }
        );
      }
      const promise = storage.updateFile(conf.bucketId, ID.unique(), image);
      promise.then(
        function (response) {
          const fileId = response.$id;
          if (fileId) {
            const imgUrl = storage.getFilePreview(conf.bucketId, fileId);
            if (imgUrl?.href) {
              setImageUrl(imgUrl?.href);
              setCreateDisable(false);
              setUploadFileId(fileId);
              setHideFileUpload(false);
            }
          }
        },
        function (error) {
          toast.error(error.message, {
            duration: 4000,
            position: "bottom-right",
            style: {
              background: "#fff",
              color: "#252525",
              padding: "20px",
              fontWeight: "700",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              borderBottom: "3px solid #F17171",
              borderRadius: "3px",
              fontFamily: "Outfit, sans-serif",
            },
          });
        }
      );
    }
  };
  const deleteImage = () => {
    setImageUrl("");
    const promise = storage.deleteFile(conf.bucketId, uploadFileId);
    promise.then(
      function () {
        toast.success("Image Deleted Successfully", {
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
        setHideFileUpload(true);
        setImageFileUpload(true);
      },
      function (error) {
        toast.error(error.message, {
          duration: 4000,
          position: "bottom-right",
          style: {
            background: "#fff",
            color: "#252525",
            padding: "20px",
            fontWeight: "700",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            borderBottom: "3px solid #F17171",
            borderRadius: "3px",
            fontFamily: "Outfit, sans-serif",
          },
        });
      }
    );
  };
  return (
    <>
      <section className="text-gray-600 font-outfit relative dark:bg-slate-700">
        {loader ? (
          <h2>Loading</h2>
        ) : (
          /* <Loader /> */

          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-col text-center w-full py-6">
              <h1 className="base:text-3xl text-3xl font-bold font-outfit text-gray-900 dark:text-white">
                Add Products
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base  dark:text-gray-400"></p>
            </div>
            <div className="lg:w-full md:w-full bg-gray-30 mx-auto card-shadow-custom p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor={uId}
                      className="leading-7 pb-2 text-base font-semibold text-gray-600  dark:text-gray-200"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id={uId}
                      name="title"
                      className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
                      placeholder="Please Enter Title"
                      value={product?.title}
                      onChange={productHandle}
                    />
                    {titleErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Enter Title
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor={uId}
                      className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                    >
                      Category
                    </label>
                    <select
                      id={uId}
                      className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
                      name="category"
                      onChange={productHandle}
                    >
                      <option value={product?.category}>
                        {product?.category}
                      </option>
                      <option value="">Please Select Category</option>
                      <option value="trending">Trending</option>
                      <option value="popular">Featured</option>
                    </select>
                    {categoryErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Select Category
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor={uId}
                      className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                    >
                      Main Category
                    </label>
                    <select
                      id={uId}
                      className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
                      name="mainCategory"
                      onChange={productHandle}
                    >
                      <option value={product?.mainCategory}>
                        {product?.mainCategory}
                      </option>
                      <option value="">Please Select Category</option>
                      <option value="hoodies">Hoodies</option>
                      <option value="suits">Suits</option>
                    </select>
                    {categoryErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Select Category
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor={uId}
                      className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                    >
                      Sub Category
                    </label>
                    <select
                      id={uId}
                      className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
                      name="subCategory"
                      onChange={productHandle}
                    >
                      <option value={product?.subCategory}>
                        {product?.subCategory}
                      </option>
                      <option value="">Please Select Category</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="high">HighPrice</option>
                      <option value="low">LowPrice</option>
                    </select>
                    {categoryErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Select Category
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor={uId}
                      className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                    >
                      Stock Availability
                    </label>
                    <select
                      id={uId}
                      className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
                      name="outOfStock"
                      onChange={productHandle}
                    >
                      <option
                        value={
                          product.outOfStock === true
                            ? "Unavailable"
                            : "Available"
                        }
                      >
                        {product.outOfStock === true
                          ? "Unavailable"
                          : "Available"}
                      </option>
                      <option value="">Please Select Stock</option>
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                    {categoryErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Select Category
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor={uId}
                      className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                    >
                      Rating
                    </label>
                    <select
                      id={uId}
                      className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
                      name="rating"
                      onChange={productHandle}
                    >
                      <option value={product?.rating}>{product?.rating}</option>
                      <option value="">Please Select Rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {categoryErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Select Category
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor={uId}
                      className="leading-7 pb-2 text-base font-semibold text-gray-600  dark:text-gray-200"
                    >
                      Old Price
                    </label>
                    <input
                      type="text"
                      id={uId}
                      name="oldPrice"
                      className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
                      placeholder="Please Enter Title"
                      value={product?.oldPrice}
                      onChange={productHandle}
                    />
                    {titleErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Enter Title
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor={uId}
                      className="leading-7 pb-2 text-base font-semibold text-gray-600  dark:text-gray-200"
                    >
                      New Price
                    </label>
                    <input
                      type="text"
                      id={uId}
                      name="price"
                      className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
                      placeholder="Please Enter Title"
                      value={product?.price}
                      onChange={productHandle}
                    />
                    {titleErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Enter Title
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor={uId}
                      className="leading-7 pb-2 text-base font-semibold text-gray-600  dark:text-gray-200"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      id={uId}
                      name="quantity"
                      className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white "
                      placeholder="Please Enter Title"
                      value={product?.quantity}
                      onChange={productHandle}
                    />
                    {titleErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Enter Title
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor={uId}
                    className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200"
                  >
                    Description
                  </label>
                  <textarea
                    id={uId}
                    name="description"
                    className="w-full rounded-3xl  h-32  text-gray-700 border-gray-200 p-4 pe-12 text-base shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a] dark:bg-[#3C4D67] dark:text-white"
                    data-gramm="false"
                    wt-ignore-input="true"
                    placeholder="Please Enter Description"
                    value={product?.description}
                    onChange={productHandle}
                  ></textarea>
                  {descriptionErr && (
                    <div className="pt-2">
                      <span className="text-red-400 text-base font-semibold">
                        Please Enter Description
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -m-2">
                {hideFileUpload && (
                  <div className="p-2 w-full">
                    <div className="relative">
                      <span className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200">
                        Upload File
                      </span>

                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-3xl cursor-pointer bg-gray-100 bg-opacity-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-white dark:hover:border-purple-600 dark:hover:bg-slate-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-10 h-10 mb-4 leading-7  text-base font-semibold text-[#198057]  dark:text-gray-200 "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2  text-base  text-center md:text-lg text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              or
                              <span className="text-[#16a34a] text-md md:text-2xl font-bold">
                                Drag
                              </span>
                              and
                              <span className="text-[#16a34a] text-md md:text-2xl font-bold">
                                Drop
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG or GIF (MAX-2MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            id="file-upload"
                            name="file"
                            className="hidden"
                            onChange={handleImage}
                          />
                        </label>
                      </div>
                    </div>
                    {imageErr && (
                      <div className="pt-2">
                        <span className="text-red-400 text-base font-semibold">
                          Please Upload Image
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {imageUrl && (
                  <>
                    <div className="p-2 w-full">
                      <div className="relative flex flex-col items-center justify-center p-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 bg-opacity-50 dark:hover:bg-bray-800 dark:bg-slate-700  dark:border-white">
                        <img src={imageUrl} className="relative" loading="lazy" />
                        <LuX
                          size={40}
                          className="bg-[#198057] text-white p-1 hover:bg-red-400 transition hover:scale-110  hover:cursor-pointer dark:text-white absolute top-6 right-6"
                          onClick={() => deleteImage()}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="py-4 w-full">
                  <button
                    className="flex md:w-80 mx-auto text-lg justify-center items-center gap-2 rounded-full border border-[#198057] bg-[#198057] px-12 py-3 text-white hover:bg-transparent hover:text-[#16a34a] focus:outline-none focus:ring active:text-[#16a34a] disabled:opacity-80 disabled:cursor-not-allowed"
                    onClick={updateBlog}
                    disabled={createDisable}
                  >
                    Update Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default UpdateProduct;
