import React, { useEffect, useState } from "react";
import {
  RiEyeOffFill,
  RiEyeFill,
  RiLockPasswordFill,
  RiRecordMailFill,
} from "react-icons/ri";

const LogIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (password === "") {
      setShowPassword(false);
    }
  }, [password]);
  return (
    <>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2  lg:px-16 lg:py-16 p-4 font-outfit">
        <div className="">
          <img
            alt="profileLinks"
            src="images/login.avif"
            className="object-cover w-full  lg:h-[368px]  h-full rounded-lg "
          />
        </div>
        <div>
          <div className="p-6 rounded-lg card-shadow-custom">
            <div className="mx-auto max-w-lg text-left">
              <h1 className="text-2xl font-bold sm:text-2xl">Login!</h1>

              <p className="mt-2 text-gray-500">LogIn to SimpleShare!</p>
            </div>
            <div className="mx-auto mb-0 mt-4 max-w-lg space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <div className="relative my-2">
                  <input
                    type="email"
                    className="w-full rounded-full border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                    placeholder="Please Enter Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <RiRecordMailFill size={20} className="text-[#16a34a]" />
                  </span>
                </div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <div className="relative my-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-full border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                    placeholder="Please Enter Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {!password && (
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <RiLockPasswordFill
                        size={20}
                        className="text-[#16a34a]"
                      />
                    </span>
                  )}
                  {password && (
                    <span
                      className="absolute inset-y-0 end-0 grid place-content-center px-4 hover:cursor-pointer"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword == true ? (
                        <RiEyeOffFill size={20} className="text-[#16a34a]" />
                      ) : (
                        <RiEyeFill size={20} className="text-[#16a34a]" />
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button className="inline-flex items-center gap-2 rounded-full border border-[#198057] bg-[#198057] px-12 py-3 text-white hover:bg-transparent hover:text-[#16a34a] focus:outline-none focus:ring active:text-indigo-500">
                  <span className="text-medium font-medium"> LogIn </span>

                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
