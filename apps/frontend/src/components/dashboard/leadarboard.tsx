import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

function Leadarboard() {
  const scorers = [
    {
      avatar: "1",
      name: "Aman",
      points: "1250",
    },
    {
      avatar: "2",
      name: "Ankit",
      points: "990",
    },
    {
      avatar: "3",
      name: "Adarsh",
      points: "1",
    },
    {
      avatar: "3",
      name: "Adarsh",
      points: "1",
    },
    {
      avatar: "3",
      name: "Adarsh",
      points: "1",
    },
    {
      avatar: "3",
      name: "Adarsh",
      points: "1",
    },
  ];

  return (
    <div>
      <Card className=" w-[20vw] h-[40vh]">
        <CardHeader className="text-3xl font-ubuntu font-semibold">Leadarboard</CardHeader>
        <CardContent className="overflow-y-auto hide-scrollbar ">
          {scorers.map((e) => (
            <div key={e.avatar} className="">
              <div
               
                className=" grid grid-cols-4  w-full h-16  text-center  items-center bg-teal-700 font-open font-semibold   text-l py-1 mb-4 rounded-xl"
              >
                <h3 className="col-span-1 text-center  ">{e.avatar}</h3>

                <p className="col-span-2">{e.name}</p>

                {/* Column 3: Points (Takes 1/4 of the space) */}
                <p className="col-span-1 text-right pr-4 ">{e.points} pts</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Leadarboard;
