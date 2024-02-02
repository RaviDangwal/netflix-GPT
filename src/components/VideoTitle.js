import { Info, Play } from "lucide-react";
import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[24%] px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/2">{overview}</p>
      <div className="">
        <button className="bg-white text-black py-2 px-10  rounded-lg text-lg hover:bg-opacity-50">
          <span className="flex justify-evenly">
            <Play color="#000000" /> Play
          </span>
        </button>
        <button className=" mx-2 bg-white text-black py-2 px-10  rounded-lg text-lg hover:bg-opacity-50 ">
          <span className="flex justify-evenly">
            <Info color="#000000" /> More Info
          </span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
