import React, { useState, useEffect } from "react";
import { account } from "../conf/config";
import { LuPencilLine } from "react-icons/lu";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const getUserProfile = async () => {
    try {
      const resp = await account.get();
      setUserProfile(resp);
      console.log(resp);
    } catch (error) {}
  };
  useEffect(() => {
    getUserProfile();
  }, []);

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
            <div className="bg-white rounded-xl card-shadow-custom w-full md:max-w-4xl dark:bg-[#3C4D67]">
              <div className="flex justify-between px-6 items-center py-6">
                <div className="flex flex-col">
                  <img
                    className="h-44 w-44 rounded-full mr-4 border-4  p-1 border-[#198057]  "
                    src={userProfile.prefs?.imageUrl || "images/avatar.svg"}
                    alt="User"
                  />
                  <p className="font-bold text-gray-800 text-xl dark:text-white">
                    {userProfile.prefs?.name || userProfile.name}
                  </p>
                  <p className="font-semibold text-gray-600 text-base dark:text-gray-400">
                    {userProfile.email}
                  </p>
                </div>
                <Link to="/update/userprofile">
                  <LuPencilLine
                    className=" text-[#16a34a] transition hover:scale-110  hover:text-[#16a34a] hover:cursor-pointer dark:text-white"
                    size={30}
                  />
                </Link>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-6 py-4">
                  <h2 className="text-gray-800 font-semibold text-lg mb-3 dark:text-white">
                    About Me
                  </h2>
                  <p className="text-gray-600 text-base dark:text-gray-400">
                    {userProfile.prefs?.about}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-6 py-4">
                  <h2 className="text-gray-800 font-semibold text-lg mb-3 dark:text-white">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {userProfile.prefs?.address}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center py-4"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
