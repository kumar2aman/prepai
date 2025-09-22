import { ArrowRight, Play, Star, Users, Zap } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

function Hero() {
  return (
    <section>
      <div className=" flex justify-center w-full mt-24 ">
        <div className=" flex flex-col  items-center  w-[64vw] h-[60vh]">
          <div className="mb-6 inline-flex items-center p-2  h-10 w-fit  bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full border border-blue-500/30">
            <Zap className="w-4 h-4 text-orange-400 mr-2" />
            <span className="text-sm text-gray-300">
              AI-Powered Interview Preparation
            </span>
          </div>

          <h1 className="text-7xl font-love  mb-6 leading-tight text-center">
            Master Your <span className="font-love bg-gradient-to-r from-[#FF512F]  to-[#F09819] bg-clip-text text-transparent">Interview Skills</span>
            <br />
            With AI
          </h1>
          <p className="text-xl font-open text-gray-300 mb-8 max-w-3xl mx-auto text-center">
              Experience realistic voice  interviews powered by advanced AI. 
              Get instant feedback, improve your performance, and land your dream job with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 mt-8">
            <Button size="xl" className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-8 py-4 text-lg">
              <Play className="w-5 h-5 mr-2 text-black" />
              Start Practice Interview
            </Button>
            <Button size="xl" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
              Watch Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full border-2 border-black flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
              ))}
            </div>
            <span>Trusted by 50,000+ professionals</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4,].map((i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2">4/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
