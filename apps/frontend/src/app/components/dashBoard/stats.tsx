import React from 'react';
import { Card } from '../ui/card';
import { Users, Trophy, Star, TrendingUp } from 'lucide-react';
import { useDashboard } from '@/app/dashboard/dashboardProvider';

function Stats() {

const data = useDashboard()



  const stats = [
    { label: "Total Score", value:data.score, icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "Level", value: data.level, icon: Star, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { label: "Badges Earned", value: "3", icon: Trophy, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { label: "Global Rank", value: "#0", icon: Users, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <Card key={i} className={`flex flex-col justify-between p-5 h-32 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${stat.bg} ${stat.border}`}>
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-gray-400 font-ubuntu uppercase tracking-wider">{stat.label}</p>
            <div className={`p-2 rounded-lg ${stat.bg} border border-white/5`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div>
            <p className={`text-4xl font-bold font-love ${stat.color} drop-shadow-sm`}>{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default Stats;
