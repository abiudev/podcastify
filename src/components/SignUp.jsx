import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  twitterProvider,
  db,
  facebookProvider,
} from "../Firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignUp({ toggleView }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!name.trim()) {
      formErrors.name = "Name is required";
    }
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

  const handleRegistration = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user);
        navigate("/trending");

        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            username: name,
          });
        }
        toast.success("Registartion Successful!", { position: "top-center" });
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, { position: "top-center" });
      }
    }
  };
  const googleSignUp = async () => {
    try {
      const googleUser = await signInWithPopup(auth, googleProvider);
      const user = googleUser.user;
      if (user) {
        navigate("/trending");
      } else {
        toast.error("Unable to sign in. Please try again.");
      }
    } catch (error) {
      console.error("There was an Error", error);
    }
  };

  const xSignUp = async () => {
    try {
      const xUser = await signInWithPopup(auth, twitterProvider);
      const user = xUser.user;
      if (user) {
        navigate("/trending");
      } else {
        toast.error("Unable to sign in. Please try again.");
      }
    } catch (error) {
      console.error("There was an Error", error);
    }
  };

  const fbSignUp = async () => {
    try {
      const fbUser = await signInWithPopup(auth, facebookProvider);
      const user = fbUser.user;
      if (user) {
        navigate("/trending");
      } else {
        toast.error("Unable to sign in. Please try again.");
      }
    } catch (error) {
      console.error("There was an Error", error);
    }
  };

  return (
    <>
      <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className=" border-2 border-green-500 max-w-screen-lg bg-white  shadow sm:rounded-lg flex justify-center flex-1">
          <div className=" flex-1 bg-green-100 text-center hidden md:flex ">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/Podcast-SignUp.svg')`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-col items-center">
              <div className="text-center">
                <h1 className="font-roboto-condensed text-3xl xl:text-4xl font-extrabold text-green-700">
                  Sign up
                </h1>
                <p className="text-[16px] font-mukta text-green-500">
                  Your Podcastful Journey Starts Here!
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-green-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
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
                    className="mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-green-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleRegistration}
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
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 font-mukta text-s text-gray-700 text-center">
                    Already have an account?{" "}
                    <button
                      onClick={toggleView}
                      className="text-green-500 font-semibold"
                    >
                      Sign in
                    </button>
                  </p>
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      onClick={googleSignUp}
                      className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg"
                    >
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
                        onClick={fbSignUp}
                        loading="lazy"
                        src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                        alt="Facebook"
                      />
                    </button>
                    <button
                      onClick={xSignUp}
                      className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg"
                    >
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
