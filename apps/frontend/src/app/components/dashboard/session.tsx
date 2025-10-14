import React from "react";
import { Card } from "../ui/card";
import Leadarboard from "./leadarboard";


function Session() {
  const sessions = [
    { title: "Software Engineering", date: "Jan 15, 2024", rating: 4.5 },
    { title: "Product Management", date: "Jan 10, 2024", rating: 3.8 },
    { title: "Data Science", date: "Jan 05, 2024", rating: 4.2 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Recent Sessions */}
      <Card className="w-full lg:w-2/3 p-6 rounded-xl">
        <h3 className="text-3xl font-semibold mb-6">Recent Sessions</h3>
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="bg-[#0c111b] p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{session.title}</p>
                <p className="text-sm text-gray-400">{session.date}</p>
              </div>
              <p className="text-orange-400 font-bold">{session.rating}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard */}
      <Leadarboard />
    </div>
  );
}

export default Session;
