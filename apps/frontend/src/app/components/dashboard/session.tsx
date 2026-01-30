import React from "react";
import { Card } from "../ui/card";
import Leadarboard from "./leadarboard";
import { ArrowUpRight, Calendar } from "lucide-react";


function Session() {
  const sessions = [
    { title: "React Senior Developer", date: "Jan 15, 2024", rating: "4.5" },
    { title: "System Design - Backend", date: "Jan 10, 2024", rating: "3.8" },
    { title: "Behavioral Interview", date: "Jan 05, 2024", rating: "4.2" },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Recent Sessions */}
      <Card className="w-full xl:w-2/3 p-0 rounded-2xl bg-white/5 border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5">
            <h3 className="text-xl font-bold font-love text-white tracking-wide">Recent Sessions</h3>
        </div>
        
        <div className="p-6 space-y-3">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex justify-between items-center cursor-pointer"
            >
              <div className="flex flex-col gap-1">
                <p className="font-bold text-white font-ubuntu group-hover:text-blue-300 transition-colors">{session.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={12} />
                    <span>{session.date}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400 uppercase font-bold">Score</span>
                      <span className="text-lg font-bold text-teal-400 font-love">{session.rating}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
                      <ArrowUpRight size={16} />
                  </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard - Assuming Leadarboard handles its own internal styling, if not we'd need to refactor it too, but sticking to provided scope */}
      <div className="w-full xl:w-1/3">
          <Leadarboard />
      </div>
    </div>
  );
}

export default Session;
