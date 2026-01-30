import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Achievements from "./achievements";
import { Activity, Target, Zap } from "lucide-react";


function Progress() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 text-white mb-8">
      {/* Progress Section */}
      <Card className="flex flex-col w-full lg:w-[60%] rounded-2xl bg-white/5 border-white/10 overflow-hidden">
        <CardHeader className="p-6 pb-2 border-b border-white/5">
          <CardTitle className="text-3xl font-bold font-ubuntu tracking-wide">Your Progress</CardTitle>
        </CardHeader>

        <div className="p-6 flex flex-col md:flex-row gap-4">
          {[
            { title: "Total Sessions", value: "12", icon: Activity, color: "text-blue-400" },
            { title: "Accuracy", value: "84%", icon: Target, color: "text-teal-400" },
            { title: "Streak", value: "5 Days", icon: Zap, color: "text-orange-400" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className={`p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="text-center">
                  <p className="text-l font-bold text-gray-400 uppercase tracking-wider font-ubuntu mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold font-love ${stat.color} drop-shadow-sm `}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Achievements />
    </div>
  );
}

export default Progress;
