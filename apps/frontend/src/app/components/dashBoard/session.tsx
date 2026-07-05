import "dotenv/config";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Leadarboard from "./leadarboard";
import { Calendar, Trophy, Target, Activity, Award, Sparkles, ArrowUpRight } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Session {
  id: string;
  name: string;
  createdAt: string;
  score: number;
  level: number;
  accuracy: number;
  streak: number;
  progress: string;
}

function Session() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/session/getsession`,
          {
            withCredentials: true,
          },
        );
        setSessions(response.data);
        console.log("Sessions:", response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    setIsDetailOpen(true);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Recent Sessions */}
      <Card className="w-full xl:w-2/3 p-0 rounded-2xl bg-white/5 border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-xl font-bold font-love text-white tracking-wide">
            Recent Sessions
          </h3>
        </div>

        <div className="p-6 space-y-3">
          {sessions.length === 0 ? (
            <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/10 text-center">
              <p className="text-m font-medium font-open text-gray-300">
                🎙️ Start giving mock interviews to see your session reports!
              </p>
            </div>
          ) : (
            sessions.map((session, index) => (
              <div
                key={session.id || index}
                onClick={() => handleSessionClick(session)}
                className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex justify-between items-center cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-white font-ubuntu group-hover:text-blue-300 transition-colors">
                    {session.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={12} />
                    <span>
                      {new Date(session.createdAt).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 uppercase font-bold">
                      Score
                    </span>
                    <span className="text-lg font-bold text-teal-400 font-love">
                      {session.score || 0}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Leaderboard */}
      <div className="w-full xl:w-1/3">
        <Leadarboard />
      </div>

      {/* Session Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[500px] bg-black/95 backdrop-blur-xl border-white/10 text-white shadow-2xl p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-bold font-ubuntu tracking-wide flex items-center gap-2">
              <Sparkles className="text-yellow-400 animate-pulse" size={24} />
              Session Details
            </DialogTitle>
            <p className="text-sm text-gray-400">
              Performance report for this practice session
            </p>
          </DialogHeader>

          {selectedSession && (
            <div className="p-6 pt-2 space-y-6">
              {/* Header Info Card */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <h4 className="text-lg font-bold text-white font-ubuntu">
                  {selectedSession.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar size={12} />
                  <span>
                    {new Date(selectedSession.createdAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Score */}
                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-teal-500/20 transition-all duration-300">
                  <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform">
                    <Trophy size={64} className="text-teal-400" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                    <Trophy size={14} /> Score
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    {selectedSession.score || 0}
                  </div>
                </div>

                {/* Level */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-blue-500/20 transition-all duration-300">
                  <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform">
                    <Award size={64} className="text-blue-400" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                    <Award size={14} /> Level
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    {selectedSession.level || 0}
                  </div>
                </div>

                {/* Accuracy */}
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-purple-500/20 transition-all duration-300">
                  <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform">
                    <Target size={64} className="text-purple-400" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
                    <Target size={14} /> Accuracy
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    {selectedSession.accuracy || 0}%
                  </div>
                </div>

                {/* Streak */}
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex flex-col justify-between h-28 relative overflow-hidden group hover:bg-orange-500/20 transition-all duration-300">
                  <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform">
                    <Activity size={64} className="text-orange-400" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                    <Activity size={14} /> Streak
                  </div>
                  <div className="text-3xl font-extrabold text-white mt-2">
                    {selectedSession.streak || 0}
                  </div>
                </div>
              </div>

              {/* Progress Category */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Category / Progress
                  </span>
                  <p className="text-sm font-medium text-white capitalize">
                    {selectedSession.progress || "0"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    selectedSession.progress?.toLowerCase() === "expert"
                      ? "bg-purple-500/10 border-purple-500/50 text-purple-400"
                      : selectedSession.progress?.toLowerCase() === "advanced"
                      ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                      : "bg-teal-500/10 border-teal-500/50 text-teal-400"
                  }`}
                >
                  {selectedSession.progress || "Starter"}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Session;
