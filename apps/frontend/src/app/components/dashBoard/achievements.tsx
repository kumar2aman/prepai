import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Star, TicketCheck, Trophy } from "lucide-react";

function Achievements() {
  return (
    <Card className="w-full lg:w-[40%] rounded-2xl bg-white/5 border-white/10 overflow-hidden">
      <CardHeader className="p-6 border-b border-white/5">
        <CardTitle className="text-xl font-bold font-love text-white tracking-wide">Achievements</CardTitle>
      </CardHeader>

      <div className="p-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {[Trophy, Star, TicketCheck].map((Icon, i) => (
            <div key={i} className="group flex flex-col items-center gap-2 cursor-pointer">
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                ${i === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/20' : 
                  i === 1 ? 'bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/20' :
                  'bg-white/10 border border-white/10 group-hover:bg-white/20'}
              `}>
                <Icon className={`w-8 h-8 ${i < 2 ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              </div>
              <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors font-ubuntu text-center">
                {i === 0 ? 'Master' : i === 1 ? 'Rising Star' : `Badge ${i + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default Achievements;
