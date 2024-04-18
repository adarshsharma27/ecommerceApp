import React, { useState, useEffect } from "react";
import conf, { account, storage, ID } from "../conf/config";
import { LuPencilLine, LuX } from "react-icons/lu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const getUserProfile = async () => {
    try {
      const resp = await account.get();
      setUserProfile(resp);
      setAbout(resp.prefs?.name);
      setName(resp.prefs?.about);
      setAddress(resp.prefs?.address);
      setImageUrl(resp.prefs?.imageUrl);
      console.log(resp);
      setHideFileUpload(false);
    } catch (error) {}
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  const [userProfile, setUserProfile] = useState([]);
  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const [address, setAddress] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [hideFileUpload, setHideFileUpload] = useState(true);
  const [imageFileUpload, setImageFileUpload] = useState(true);
  const [createDisable, setCreateDisable] = useState(false);
  const [uploadFileId, setUploadFileId] = useState();

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
    } else if (imageSize > 2000000) {
      toast.error("Please Upload File Size less then 2MB", {
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
            console.log(error); // Failure
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
            console.log(error); // Failure
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
          console.log(error); // Failure
        }
      );
    }
  };
  const deleteImage = async () => {
    setImageUrl("");
    const promise = storage.deleteFile(
      conf.bucketId,
      userProfile.prefs?.uploadFileId
    );
    await account.updatePrefs({
      name: name,
      about: about,
      address: address,
      uploadFileId,
      imageUrl: "",
    });
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
        toast.error(error, {
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
        }); // Failure
      }
    );
  };
  const handleSave = async () => {
    try {
      await account.updatePrefs({
        name,
        about,
        address,
        imageUrl,
        uploadFileId,
      });
      getUserProfile();
      toast.success("Profile Updated Successfully", {
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
      navigate("/userprofile");
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
      <section className="text-gray-600 font-outfit dark:bg-slate-700">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col">
            <div className="h-1 bg-gray-200 rounded">
              <div className="w-24 h-full bg-[#16a34a]"></div>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col py-6">
              <h1 className="sm:w-2/5 text-gray-900 font-bold font-outfit text-3xl mb-2 sm:mb-0 dark:text-white">
                User Profile
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className=" flex items-center justify-center z-50 w-full">
              <div className=" bg-black opacity-50"></div>
              <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <h2 className="text-gray-800 font-semibold text-lg mb-3">
                  Edit Profile
                </h2>
                {hideFileUpload && (
                  <div className="p-2 w-full">
                    <div className="relative">
                      <span className="leading-7  text-base font-semibold text-gray-600 dark:text-gray-200">
                        Profile Image
                      </span>

                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-20 h-20 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-100 bg-opacity-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-gray-100 dark:border-white dark:hover:border-purple-600 dark:hover:bg-slate-600"
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
                    {/* {imageErr && (
                    <div className="pt-2">
                      <span className="text-red-400 text-base font-semibold">
                        Please Upload Image
                      </span>
                    </div>
                  )}  */}
                  </div>
                )}

                {imageUrl && (
                  <>
                    <div className="p-2 flex items-center justify-start">
                      <div className="relative   border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-100 bg-opacity-50 dark:hover:bg-bray-800 dark:bg-slate-700  dark:border-white">
                        <img
                          src={imageUrl}
                          className="relative h-60 rounded-full"
                        />
                        <LuX
                          size={40}
                          className="bg-[#198057] text-white p-1 hover:bg-red-400 transition hover:scale-110  hover:cursor-pointer dark:text-white absolute top-6 right-6"
                          onClick={() => deleteImage()}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-full border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                    value={name}
                    placeholder="Please Enter Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-full border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                    value={userProfile.email}
                    placeholder="Please Enter Email"
                    disabled={true}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    About Me:
                  </label>
                  <textarea
                    className="w-full rounded-3xl  border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                    value={about}
                    placeholder="Please Enter Bio"
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address:
                  </label>
                  <textarea
                    className="w-full rounded-3xl  border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                    value={address}
                    placeholder="Please Enter Address"
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end py-2">
                  <button
                    onClick={handleSave}
                    className="bg-[#198057]  cursor-pointer hover:bg-[#16a34a] text-white px-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!name || createDisable || !about || !address}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateUserProfile;
