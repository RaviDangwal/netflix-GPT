import React from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="bg-black grid grid-cols-12 rounded-lg bg-opacity-75">
        <input
          className="p-4 m-4 col-span-10"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="col-span-2 m-4 py-2 px-4 bg-red-600 rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
