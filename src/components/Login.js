import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //validate the from data

    const message = checkValidData(
      email.current.value,
      password.current.value,
      name.current.value
    );
    console.log(message);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: "name.current.value",
            photoURL: "https://avatars.githubusercontent.com/u/141614366?v=4",
          })
            .then(() => {
              // Profile updated!
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //signin logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          console.log(user);
          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/4da5d2b1-1b22-498d-90c0-4d86701dffcc/98a1cb1e-5a1d-4b98-a46f-995272b632dd/IN-en-20240129-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="bg"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute w-3/12 bg-opacity-80 rounded-md bg-black my-36 mx-auto right-0 left-0 text-white p-10"
        >
          <h1 className="font-bold text-3xl py-4 ">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className=" p-2 my-2 w-full rounded-sm bg-gray-700  border border-white"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email address"
            className=" p-2 my-2 w-full rounded-sm bg-gray-700  border border-white"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className=" p-2 my-2 w-full rounded-sm bg-gray-700  border border-white"
          />
          <p className="text-red-600 font-bold text-lg  py-2">{errorMessage}</p>
          <button
            className="p-2 my-4 bg-red-600  hover:bg-red-700 w-full rounded-sm"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to netflix? Sign Up Now"
              : "Already a User! Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
