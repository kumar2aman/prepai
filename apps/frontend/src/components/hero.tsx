import { Zap } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <section>
      <div className=" flex justify-center w-full ">
        <div className=" flex flex-col  items-center  w-[64vw] h-[60vh]">
          <div className="mb-6 inline-flex items-center p-2  h-10 w-72  bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full border border-blue-500/30">
            <Zap className="w-4 h-4 text-orange-400 mr-2" />
            <span className="text-sm text-gray-300">
              AI-Powered Interview Preparation
            </span>
          </div>

          <h1 className="text-5xl font-love font-bold text-white">
            master your <span className="font-love">interview skills</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;
