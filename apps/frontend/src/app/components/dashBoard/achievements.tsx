import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Star, Trophy, Zap, MessageSquare, Flame, Sparkles } from "lucide-react";

function Achievements() {
  const badges = [
    {
      name: "Master",
      description: "Completed 10+ mock sessions",
      icon: Trophy,
      unlocked: false,
      bg: "bg-white/5 border border-white/5 opacity-40 hover:opacity-60",
      textColor: "text-gray-400 group-hover:text-white",
    },
    {
      name: "Rising Star",
      description: "Scored 4.5+ on verbal rizz",
      icon: Star,
      unlocked: false,
      bg: "bg-white/5 border border-white/5 opacity-40 hover:opacity-60",
      textColor: "text-gray-400 group-hover:text-white",
    },
    {
      name: "Speed Runner",
      description: "Completed in under 5 mins",
      icon: Zap,
      unlocked: false,
      bg: "bg-white/5 border border-white/5 opacity-40 hover:opacity-60",
      textColor: "text-gray-400 group-hover:text-white",
    },
    {
      name: "Chatty",
      description: "Spoke for over 10 mins",
      icon: MessageSquare,
      unlocked: false,
      bg: "bg-white/5 border border-white/5 opacity-40 hover:opacity-60",
      textColor: "text-gray-400 group-hover:text-white",
    },
    {
      name: "Roast Survivor",
      description: "Completed a hard level mock",
      icon: Flame,
      unlocked: false,
      bg: "bg-white/5 border border-white/5 opacity-40 hover:opacity-60",
      textColor: "text-gray-400 group-hover:text-white",
    },
  ];

  return (
    <Card className="w-full lg:w-[40%] rounded-2xl bg-white/5 border-white/10 overflow-hidden flex flex-col justify-between">
      <div>
        <CardHeader className="p-6 border-b border-white/5 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold font-love text-white tracking-wide">
            Achievements
          </CardTitle>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </CardHeader>

        <div className="p-6">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 gap-4">
            {badges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center gap-2 cursor-pointer relative"
                  title={badge.description}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${badge.bg}`}
                  >
                    <Icon className={`w-7 h-7 ${badge.textColor}`} />
                  </div>
                  <p className="text-[10px] font-semibold text-gray-400 group-hover:text-white transition-colors font-ubuntu text-center">
                    {badge.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Message for unlocking more badges */}
      <div className="p-6 pt-0 mt-auto">
        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-center">
          <p className="text-m font-medium font-open text-gray-300">
            🎯 Start giving mock interviews to unlock different badges!
          </p>
        </div>
      </div>
    </Card>
  );
}

export default Achievements;
