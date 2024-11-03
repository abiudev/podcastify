import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignIn({ toggleView }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email format";
    }
    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }
    return formErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        if (user) {
          navigate("/profile");
        } else {
          toast.error("Unable to sign in. Please try again.");
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Oops! check your credentials ", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="border-2 border-green-500 max-w-screen-lg bg-white  shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-green-100 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/Podcast-SignIn.svg')`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-3xl xl:text-4xl font-roboto-condensed font-extrabold text-green-700">
                  Sign In
                </h1>
                <p className="text-[16px] font-mukta text-green-500">
                  Your Podcastful Journey Continues
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}

                  <button
                    className="mt-5 tracking-wide font-semibold bg-green-500 text-gray-700 w-full py-4 rounded-lg hover:bg-green-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleLogin}
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign In</span>
                  </button>
                  <p className="mt-6 font-mukta text-s text-gray-700 text-center">
                    Don't have an account?{" "}
                    <button
                      onClick={toggleView}
                      className="text-green-500 font-semibold"
                    >
                      Sign Up
                    </button>
                  </p>
                  <div className="flex justify-center items-center space-x-4">
                    <button className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                      <img
                        className="w-6 h-6"
                        loading="lazy"
                        src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                        alt="Google"
                      />
                    </button>

                    <button className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                      <img
                        className="w-6 h-6"
                        loading="lazy"
                        src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                        alt="Facebook"
                      />
                    </button>
                    <button className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg">
                      <img
                        className="w-6 h-6"
                        loading="lazy"
                        src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
                        alt="Twitter"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />;
    </>
  );
}
