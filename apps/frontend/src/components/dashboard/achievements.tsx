import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Trophy } from "lucide-react";

function Achievements() {
  return (
    <Card className=" border border-orange-300/40 h-[40vh] w-[32vw] py-6 px-6  ">
      {/* Header */}
      <div>
        <CardHeader className="flex justify-between items-center pr-6">
          <CardTitle className="font-ubuntu text-xl">Achievements</CardTitle>
        </CardHeader>
      </div>
      <div className="pl-6 h-full">
        <div className="grid grid-cols-4">
          <Trophy />
          <Trophy />
          <Trophy />
          <Trophy />
          <Trophy />
          <Trophy />
        </div>
      </div>
    </Card>
  );
}

export default Achievements;
