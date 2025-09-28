import React from "react";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "../ui/card";

function Progress() {
  return (
    <div className="grid grid-cols-2 mx-10">
      <Card className=" flex flex-col border border-orange-300 h-[40vh] text-white pt-6 pl-6 gap-12">
       <CardHeader className="flex  justify-between items-center w-auto">
  <CardTitle className="font-ubuntu text-xl">Your Progress</CardTitle>
  <CardAction className="w-20 h-20 border-6 border-orange-500 border-r-orange-300/40 rounded-full flex justify-center items-center text-2xl font-open font-semibold">85%</CardAction>
</CardHeader>
        <Card className="flex items-center justify-center border-orange-300 w-56 h-42">
    <CardTitle className="text-2xl font-ubuntu">Total Session</CardTitle>
           <CardDescription className="text-4xl font-bold font-open">12</CardDescription>
    
</Card>

      </Card>
     
    </div>
  );
}

export default Progress;
