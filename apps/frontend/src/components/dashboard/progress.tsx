import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Achievements from "./achievements";
import { Star, TicketCheck, Trophy } from "lucide-react";
import Stats from "./stats";

function Progress() {
  return (
    <>
    
    <div className="flex items-start gap-x-6 text-white ">
      {/* Progress Card (60vw) */}
      <Card className="flex flex-col  border-orange-300/40 h-[40vh] w-[60vw] py-6 px-6 gap-12 ">
        {/* Header */}
        <CardHeader className="flex justify-between items-center pr-6">
          <CardTitle className="font-ubuntu text-3xl ">Your Progress</CardTitle>
          {/* Circular Progress Indicator */}
          <div className="w-20 h-20 border-4 border-orange-500 border-r-orange-300/40 rounded-full flex justify-center items-center text-2xl font-open font-semibold">
            85%
          </div>
        </CardHeader>

        {/* Stats */}
        <div className="flex gap-x-7 px-4">
          <Card className="flex flex-col items-center justify-center bg-[#090c14] border border-orange-300/40 w-56 h-40 p-4">
            <CardTitle className="text-xl font-ubuntu text-gray-400">Total Sessions</CardTitle>
            <CardDescription className="text-4xl font-bold">12</CardDescription>
          </Card>

          <Card className="flex flex-col items-center justify-center bg-[#090c14] border border-orange-300/40 w-56 h-40 p-4">
            <CardTitle className="text-xl font-ubuntu text-gray-400">Accuracy</CardTitle>
            <CardDescription className="text-4xl text-teal-400 font-bold">
              84%
            </CardDescription>
          </Card>

          <Card className="flex flex-col items-center justify-center bg-[#090c14] border border-orange-300/40 w-56 h-40 p-4">
            <CardTitle className="text-xl font-ubuntu text-gray-400">Streak</CardTitle>
            <CardDescription className="text-4xl font-bold">
              5 Days
            </CardDescription>
          </Card>
        </div>
      </Card>

      {/* Achievements Card (40vw) */}
      <Achievements />

    </div>

    
    </>
  );
}

export default Progress
