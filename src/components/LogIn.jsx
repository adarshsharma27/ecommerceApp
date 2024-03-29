import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  RiEyeOffFill,
  RiEyeFill,
  RiLockPasswordFill,
  RiRecordMailFill,
} from "react-icons/ri";
import conf, { account } from "../conf/config";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../features/AuthenticationSlice";

const LogIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (password === "") {
      setShowPassword(false);
    }
  }, [password]);
  const LogIn = async () => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailErr(true);
      setPasswordErr(false);
    } else if (!password || password.trim().length <= 8) {
      setPasswordErr(true);
      setEmailErr(false);
    } else {
      try {
        const userData = await account.createEmailSession(email, password);
        dispatch(logIn(userData));
        toast.success("LoggedIn Successfully", {
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
        setEmail("");
        setPassword("");
        navigate("/");
        if (
          userData.userId === conf.adminUserId &&
          userData.providerUid === conf.adminUserEmail
        ) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
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
  const loginAsGuest = async () => {
    setEmail(conf.guestUserEmail);
    setPassword(conf.guestUserPassword);
    try {
      const userData = await account.createEmailSession(
        conf.guestUserEmail,
        conf.guestUserPassword
      );
      dispatch(logIn(userData));
      toast.success("LoggedIn Successfully", {
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
      setEmail("");
      setPassword("");
      navigate("/");
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
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2  lg:px-16 lg:py-16 p-4 font-outfit">
        <div className="">
          <img
            alt="profileLinks"
            src="images/login.avif"
            className="object-cover w-full  lg:h-[470px]  h-full rounded-lg "
          />
        </div>
        <div>
          <div className="p-6 rounded-lg card-shadow-custom">
            <div className="mx-auto max-w-lg text-left">
              <h1 className="text-2xl font-bold sm:text-2xl">Login!</h1>

              <p className="mt-2 text-gray-500">LogIn to sabkaBazzar!</p>
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
                {emailErr && (
                  <div className="pt-2">
                    <span className="text-red-400 text-base font-semibold">
                      Please Enter Email
                    </span>
                  </div>
                )}
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
                {passwordErr && (
                  <div className="pt-2">
                    <span className="text-red-400 text-base font-semibold">
                      Please Enter Password
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="inline-flex w-full justify-center items-center gap-2 rounded-full border border-[#198057] bg-[#198057] px-12 py-3 text-white hover:bg-transparent hover:text-[#16a34a] focus:outline-none focus:ring active:text-[#16a34a]"
                  onClick={LogIn}
                >
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
              <div className="">
                <button
                  className="inline-flex w-full justify-center items-center gap-2 rounded-full border border-gray-700 bg-gray-700 px-8 py-3 text-white hover:bg-transparent hover:text-gray-900 focus:outline-none focus:ring active:text-gray-500"
                  onClick={loginAsGuest}
                >
                  <span className="text-md font-medium">LogIn As Guest</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 rtl:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <p className="text-md text-center pt-2 text-gray-700">
                  Don't have an account?
                  <NavLink
                    className="text-blue-500 font-bold text-md hover:text-[#16a34a]"
                    to="/signup"
                  >
                    {" "}
                    Create Account
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

export default LogIn;
