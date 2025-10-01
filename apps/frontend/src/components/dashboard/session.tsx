import React from "react";
import { Card } from "../ui/card";
import Leadarboard from "./leadarboard";

function Session() {
  return (
    <div className="flex justify-between ">
      <Card className=" p-6 border rounded-xl w-[60vw] h-[40vh] ">
        <div className="mb-10">
          <h3 className="text-3xl font-semibold mb-6">Recent Sessions</h3>
          <div className="space-y-3">
            {[
              {
                title: "Software Engineering",
                date: "Jan 15, 2024",
                rating: 4.5,
              },
              {
                title: "Product Management",
                date: "Jan 10, 2024",
                rating: 3.8,
              },
              { title: "Data Science", date: "Jan 05, 2024", rating: 4.2 },
            ].map((session, index) => (
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
        </div>
      </Card>

      <Leadarboard />
    </div>
  );
}

export default Session;
