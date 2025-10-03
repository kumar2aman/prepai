import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

function Leadarboard() {
  const scorers = [
    { avatar: "1", name: "Aman", points: "1250" },
    { avatar: "2", name: "Ankit", points: "990" },
    { avatar: "3", name: "Adarsh", points: "870" },
    { avatar: "4", name: "Simran", points: "840" },
    { avatar: "5", name: "Karan", points: "780" },
  ];

  return (
    <Card className="w-full lg:w-1/3 h-full">
      <CardHeader className="text-2xl font-ubuntu font-semibold">Leaderboard</CardHeader>
      <CardContent className="overflow-y-auto max-h-[32vh] hide-scrollbar">
        {scorers.map((e, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center bg-teal-700 font-open text-white font-semibold text-lg py-2 px-4 mb-3 rounded-xl"
          >
            <h3 className="col-span-1 text-center">{e.avatar}</h3>
            <p className="col-span-2 text-center">{e.name}</p>
            <p className="col-span-1 text-right pr-2">{e.points} pts</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Leadarboard;
