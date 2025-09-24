import { features } from "@/lib/featuresData";
import React from "react";
import { Card, CardContent } from "./ui/card";

function Features() {
  const featureData = features;

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <div className="flex flex-col justify-center items-center w-full mt-24 ">
        <h1 className="font-ubuntu font-medium text-center text-6xl mb-12">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#5433FF] via-[#20BDFF] to-[#A5FECB] text-transparent bg-clip-text">
            PrepAi
          </span>
        </h1>
        <p className="font-open text-l text-center mb-12">
          Our AI interviewer provides the most realistic practice experience
          with advanced <br />
          features designed to help you succeed.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {featureData.map((feature, index) => (
            <Card
              key={index}
              className=" bg-gray-900/50 border-gray-800 hover:bg-gray-900/80 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-l font-ubuntu font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="font-open text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
