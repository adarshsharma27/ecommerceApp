import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  RiEyeOffFill,
  RiEyeFill,
  RiUser6Fill,
  RiRecordMailFill,
  RiLockPasswordFill,
} from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import conf, { ID, account, databases } from "../conf/config";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (password === "") {
      setShowPassword(false);
    }
  }, [password]);
  const SignUp = async () => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    let nameReg = /^[A-Za-z]*$/;
    if (
      !name ||
      !nameReg.test(name) ||
      name.trim().length < 2 ||
      name.trim().length > 50
    ) {
      setNameErr(true);
      setEmailErr(false);
      setPasswordErr(false);
    } else if (!emailRegex.test(email)) {
      setEmailErr(true);
      setNameErr(false);
      setPasswordErr(false);
    } else if (!password || password.trim().length <= 8) {
      setPasswordErr(true);
      setNameErr(false);
      setEmailErr(false);
    } else {
      try {
        const response = await account.create(
          ID.unique(),
          email,
          password,
          name
        );
        setName("");
        setEmail("");
        setPassword("");
        toast.success("SignUp Successfully", {
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
        if (response) {
          await databases.createDocument(
            conf.databaseId,
            conf.usersCollectionId,
            response?.$id,
            {
              name,
              email,
            }
          );
        }
        navigate("/login");
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
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:px-16 lg:py-4 p-4 font-outfit">
        <div className="rounded-lg ">
          <img
            alt="profileLinks"
            src="images/login.avif"
            className="object-cover w-full lg:h-[495px] h-full rounded-lg "
          />
        </div>
        <div>
          <div className="p-6 rounded-lg card-shadow-custom col-span-1">
            <div className="mx-auto max-w-lg text-left">
              <h1 className="text-2xl font-bold sm:text-2xl">Sign Up!</h1>

              <p className="mt-2 text-gray-500">Welcome to sabkaBazzar!</p>
            </div>
            <div className="mx-auto mb-0 mt-4 max-w-lg space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <div className="relative my-2">
                  <input
                    type="text"
                    className="w-full rounded-full  text-gray-700 border-gray-200 p-4 pe-12 text-sm shadow-md  outline-none focus:ring-1 focus:ring-[#16a34a]"
                    placeholder="Please Enter Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <RiUser6Fill size={20} className="text-[#16a34a]" />
                  </span>
                </div>
                {nameErr && (
                  <div className="pt-2">
                    <span className="text-red-400 text-base font-semibold">
                    Please Enter Name
                    </span>
                  </div>
                )}

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
                {emailErr && (
                  <div className="pt-2">
                    <span className="text-red-400 text-base font-semibold">
                      Please Enter Email
                    </span>
                  </div>
                )}
                <label
                  htmlFor="Password"
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
                {passwordErr && (
                  <div className="pt-2">
                    <span className="text-red-400 text-base font-semibold">
                      Please Enter Password
                    </span>
                  </div>
                )}
              </div>

              <div className="">
                <button
                  className="inline-flex w-full justify-center items-center gap-2 rounded-full border border-[#198057] bg-[#198057] px-12 py-3 text-white hover:bg-transparent hover:text-[#16a34a] focus:outline-none focus:ring active:text-[#16a34a]"
                  onClick={SignUp}
                >
                  <span className="text-medium font-medium"> SignUp </span>

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

                <p className="text-md text-center pt-2 text-gray-700">
                  Already have an account?
                  <NavLink
                    className="text-blue-500 font-bold text-md hover:text-[#16a34a]"
                    to="/login"
                  >
                    {" "}
                    LogIn
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
