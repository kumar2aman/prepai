import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Star, TicketCheck, Trophy } from "lucide-react";

function Achievements() {
  return (
    <Card className="border border-orange-300/40 h-[40vh] w-[40vw] py-6 px-6 ">
      {/* Header */}
      <CardHeader className="flex justify-between items-center pr-6 mb-4">
        <CardTitle className="font-ubuntu text-3xl">Achievements</CardTitle>
      </CardHeader>

      {/* Trophy Grid */}
      <div className="pl-6 h-full overflow-y-auto">
        <div className="grid grid-cols-5 gap-2">
          {/* Example Trophies */}
          <div>
            <Trophy className=" bg-teal-400 rounded-full w-20 h-20" />
            <p>Top scorer</p>
          </div>

          <Star className=" bg-teal-400 rounded-full w-20 h-20" />
          <TicketCheck className=" bg-teal-400 rounded-full w-20 h-20" />
        </div>
      </div>
    </Card>
  );
}

export default Achievements;
