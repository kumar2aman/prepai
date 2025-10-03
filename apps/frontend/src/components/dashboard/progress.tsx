import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Achievements from "./achievements";


function Progress() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 text-white">
      {/* Progress Section */}
      <Card className="flex flex-col w-full lg:w-[60%] py-6 px-6 gap-12">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-3xl font-ubuntu">Your Progress</CardTitle>
          <div className="w-20 h-20 border-4 border-orange-500 border-r-orange-300/40 rounded-full flex justify-center items-center text-2xl font-semibold">
            85%
          </div>
        </CardHeader>

        <div className="flex flex-col md:flex-row gap-6 px-2">
          {[
            { title: "Total Sessions", value: "12" },
            { title: "Accuracy", value: "84%", color: "text-teal-400" },
            { title: "Streak", value: "5 Days" },
          ].map((stat, i) => (
            <Card key={i} className="flex flex-col items-center justify-center bg-[#090c14] border border-orange-300/40 w-full md:w-1/3 h-40 p-4">
              <CardTitle className="text-xl text-gray-400">{stat.title}</CardTitle>
              <CardDescription className={`text-4xl font-bold ${stat.color || ''}`}>{stat.value}</CardDescription>
            </Card>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Achievements />
    </div>
  );
}

export default Progress;
