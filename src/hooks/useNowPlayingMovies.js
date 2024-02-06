import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/store/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const useNowPLayingMovies = () => {
  const dispatch = useDispatch();

  //memoization
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    //memoization
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowPLayingMovies;
