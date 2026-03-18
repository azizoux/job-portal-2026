import React from "react";
import { assets } from "../assets/assets";

const EmptyStats = () => {
  return (
    <div className="w-full h-full my-20 flex justify-center items-center flex-col">
      <div>
        <img src={assets.emptyJob} className="w-30 h-30 text-primary" />
      </div>
      <p className="text-sm sm:text-xl mt-4">No Job to Manage</p>
    </div>
  );
};

export default EmptyStats;
