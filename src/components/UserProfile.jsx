import React, { useState, useEffect } from "react";
import { account } from "../conf/config";
import { LuPencilLine } from "react-icons/lu";

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

  const openModal = () => {
    setIsModalOpen(true);

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);

    document.body.style.overflow = "auto";
  };

  const handleSave = async () => {
    try {
      await account.updatePrefs({
        name,
        about,
        address,
      });
      getUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    console.log("Saving changes...");
    closeModal();
  };
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
                User Profile
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="bg-white rounded-xl card-shadow-custom w-full md:max-w-4xl">
              <div className="flex justify-between px-6 items-center py-6">
                <div className="flex flex-col">
                  <img
                    className="h-44 w-44 rounded-full mr-4 border-4  p-1 border-[#198057] "
                    src="images/avatar.svg"
                    alt="User"
                  />
                  <p className="font-bold text-gray-800 text-xl">
                    {userProfile.prefs?.name || userProfile.name}
                  </p>
                  <p className="font-semibold text-gray-600 text-medium">
                    {userProfile.email}
                  </p>
                </div>
                <LuPencilLine
                  onClick={openModal}
                  className=" text-[#16a34a] transition hover:scale-110  hover:text-[#16a34a] hover:cursor-pointer dark:text-white"
                  size={30}
                />
              </div>
              <div className="border-t border-gray-200">
                <div className="px-6 py-4">
                  <h2 className="text-gray-800 font-semibold text-lg mb-3">
                    About Me
                  </h2>
                  <p className="text-gray-600">{userProfile.prefs?.about}</p>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-6 py-4">
                  <h2 className="text-gray-800 font-semibold text-lg mb-3">
                    Contact Information
                  </h2>
                  <p className="text-gray-600">{userProfile.prefs?.address}</p>
                </div>
              </div>
              <div className="flex justify-center items-center py-4"></div>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 w-full">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white rounded-lg shadow-lg p-6 absolute  w-[60%]">
                  <h2 className="text-gray-800 font-semibold text-lg mb-3">
                    Edit Profile
                  </h2>
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
                      disabled={!name || !about || !address}
                    >
                      Save
                    </button>
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 px-12 py-3 rounded-full ml-2 focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:ring-opacity-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
