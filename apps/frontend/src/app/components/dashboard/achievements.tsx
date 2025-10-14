import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Star, TicketCheck, Trophy } from "lucide-react";

function Achievements() {
  return (
    <Card className="w-full lg:w-[40%] py-6 px-6">
      <CardHeader className="flex justify-between items-center pr-6 mb-4">
        <CardTitle className="text-3xl font-ubuntu">Achievements</CardTitle>
      </CardHeader>

      <div className="pl-4 overflow-y-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {[Trophy, Star, TicketCheck].map((Icon, i) => (
            <div key={i} className="flex flex-col items-center">
              <Icon className="bg-teal-400 rounded-full w-16 h-16" />
              <p className="text-sm text-center mt-1">Trophy {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default Achievements;
