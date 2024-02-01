import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

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
        <form className="absolute w-3/12 bg-opacity-80 rounded-md bg-black my-36 mx-auto right-0 left-0 text-white p-10">
          <h1 className="font-bold text-3xl py-4 ">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 my-2 w-full rounded-sm bg-gray-700 opacity-55 border border-white"
            />
          )}
          <input
            type="text"
            placeholder="Email address"
            className="p-2 my-2 w-full rounded-sm bg-gray-700 opacity-55 border border-white"
          />
          <input
            type="text"
            placeholder="Password"
            className="p-2 my-2 w-full rounded-sm bg-gray-700 opacity-55 border border-white"
          />
          <button className="p-2 my-4 bg-red-600  hover:bg-red-700 w-full rounded-sm">
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
