import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Crown, Medal, Trophy } from "lucide-react";

function Leadarboard() {
  const scorers = [
    { rank: 1, name: "Aman", points: "1250", avatarColor: "bg-yellow-500" },
    { rank: 2, name: "Ankit", points: "990", avatarColor: "bg-gray-400" },
    { rank: 3, name: "Adarsh", points: "870", avatarColor: "bg-orange-500" },
    { rank: 4, name: "Simran", points: "840", avatarColor: "bg-blue-500" },
    { rank: 5, name: "Karan", points: "780", avatarColor: "bg-purple-500" },
  ];

  return (
    <div className="relative w-full h-full">
        {/* Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-2xl border border-white/10">
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 shadow-2xl backdrop-blur-md flex flex-col items-center gap-2 transform hover:scale-105 transition-transform duration-300">
                <Crown size={32} className="text-yellow-400 fill-yellow-400/20 animate-pulse" />
                <h3 className="text-2xl font-bold font-love tracking-wider text-white text-center">
                    Leaderboard <br />
                    <span className="gradient-blue bg-clip-text text-transparent">Coming Soon</span>
                </h3>
                <p className="text-xs text-gray-400 font-ubuntu">Compete with top developers globally</p>
            </div>
        </div>

        {/* Blurred Content */}
        <Card className="w-full h-full rounded-2xl bg-white/5 border-white/10 overflow-hidden flex flex-col blur-[4px] pointer-events-none opacity-50 select-none">
          <CardHeader className="p-6 pb-4 border-b border-white/5 flex flex-row items-center justify-between">
            <h3 className="text-xl font-bold font-love text-white tracking-wide">Top Performers</h3>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-y-auto hide-scrollbar">
            <div className="flex flex-col p-4 gap-2">
              {scorers.map((user, index) => (
                <div
                  key={index}
                  className={`
                    group flex items-center justify-between p-3 rounded-xl transition-all duration-300
                    ${index === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20' : 
                      index === 1 ? 'bg-gradient-to-r from-gray-400/10 to-transparent border border-gray-400/20' :
                      index === 2 ? 'bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20' :
                      'bg-white/5 border border-white/5 hover:bg-white/10'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank / Avatar */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${user.avatarColor}`}>
                        {user.name[0]}
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2">
                            {index === 0 && <Crown size={16} className="text-yellow-400 fill-yellow-400 drop-shadow-md" />}
                            {index === 1 && <Medal size={16} className="text-gray-300 fill-gray-300 drop-shadow-md" />}
                            {index === 2 && <Medal size={16} className="text-orange-400 fill-orange-400 drop-shadow-md" />}
                        </div>
                      )}
                    </div>

                    {/* Name & Rank Label */}
                    <div className="flex flex-col">
                        <span className={`font-bold font-ubuntu ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>
                            {user.name}
                        </span>
                        <span className="text-xs text-gray-400 font-ubuntu">Rank #{user.rank}</span>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                      <span className={`text-sm font-bold font-love ${
                          index === 0 ? 'text-yellow-400' : 
                          index === 1 ? 'text-gray-300' : 
                          index === 2 ? 'text-orange-400' : 'text-blue-300'
                      }`}>
                          {user.points} <span className="text-xs opacity-70">pts</span>
                      </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

export default Leadarboard;
