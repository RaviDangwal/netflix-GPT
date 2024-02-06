import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptResults } from "../utils/store/gptSlice";

const GPTSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
    // console.log(json);
  };

  const handleGptSerachClick = async () => {
    console.log(searchText.current.value);
    const getQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query :" +
      searchText.current.value +
      ". Only give me names of 5 movies,comma seperated like the exapmle results given ahead. Example Results: Gadar,Sholay,Don,Golmaal,Koi Mil Gaya and more";
    //make api call to openAI and get movie results

    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: getQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResult.choices?.[0]?.message.content);
    const gptMovies = gptResult.choices?.[0]?.message.content.split(",");

    ///For each movie i will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    //[Promise,Promise,Promise,Promise,Promise,]
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[45%] md:pt-[10%] flex justify-evenly">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg bg-opacity-75"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9 md:col-span-10"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 md:col-span-2 m-4 py-2 px-4 bg-red-600 rounded-lg"
          onClick={handleGptSerachClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
