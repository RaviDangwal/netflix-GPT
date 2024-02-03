import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/store/userSlice";
import { LOGO, SUPPORTED_LANGUAGE } from "../utils/constants";
import { toggleGptSearchView } from "../utils/store/gptSlice";
import { changelanguage } from "../utils/store/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    //Toggle GPT search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changelanguage(e.target.value));
    // console.log();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //sign in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when comp unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between w-screen absolute px-8 py-4 bg-gradient-to-b from-black z-10">
      <img className=" w-52 " src={LOGO} alt="Logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className=" bg-gray-900 text-white p-3.5 mx-4 mb-6 rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className="p-3.5 mx-4 mb-6 bg-red-600 rounded-lg text-white font-bold"
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="w-12 h-12 mx-2"
            src={user?.photoURL}
            alt="USer-logo"
          />
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
