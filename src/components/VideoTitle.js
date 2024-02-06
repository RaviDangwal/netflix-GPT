import { Info, Play } from "lucide-react";
import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[24%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2">{overview}</p>
      <div className="my-2 md:my-0">
        <button className="bg-white text-black py-1 md:py-2 px-4 md:px-10  rounded-lg text-lg hover:bg-opacity-50">
          <span className="flex justify-evenly">
            <Play color="#000000" /> Play
          </span>
        </button>
        <button className=" hidden md:inline-block mx-2 bg-white text-black py-2 px-10  rounded-lg text-lg hover:bg-opacity-50 ">
          <span className="flex justify-evenly">
            <Info color="#000000" /> More Info
          </span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
