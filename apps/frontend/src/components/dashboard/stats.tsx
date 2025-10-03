import React from 'react';
import { Card } from '../ui/card';

function Stats() {
  const stats = [
    { label: "Total Score", value: "950" },
    { label: "Level", value: "15", color: "text-orange-500" },
    { label: "Badges Earned", value: "3" },
    { label: "Leaderboard Rank", value: "#3", color: "text-yellow-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mt-12">
      {stats.map((stat, i) => (
        <Card key={i} className="flex flex-col justify-center items-center gap-y-4 p-4 h-32 rounded-3xl">
          <p className="text-xl text-gray-400">{stat.label}</p>
          <p className={`text-4xl font-bold ${stat.color || ''}`}>{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}

export default Stats;
