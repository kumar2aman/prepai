"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Lock,
  Clock,
  Laptop,
  Code2,
  Layers,
  Play,
  Home,
  Zap,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import axios from "axios";

function Sidebar() {
  const router = useRouter();
  const [sessionName, setSessionName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [interviewType, setInterviewType] = useState("frontend");
  const [duration, setDuration] = useState(2);

  const handleStart = () => {
    if (sessionName.trim()) {
      const query = new URLSearchParams({
        session: sessionName,
        type: interviewType,
        duration: duration.toString(),
      });
      router.push(`/chat?${query}`);
      setIsOpen(false);
      handelCreateSession();
    }
  };

  async function handelCreateSession() {
    const response = await axios
      .post(
        "http://localhost:3001/api/v1/session/createsession",
        {
          name: sessionName,
        },
        {
          withCredentials: true,
        },
      )
      .catch((err) => console.error("Error creating session:", err));
  }

  const interviewTypes = [
    {
      id: "frontend",
      label: "Frontend",
      icon: Laptop,
      color: "text-cyan-400",
      border: "border-cyan-500/50",
      bg: "bg-cyan-500/10",
    },
    {
      id: "backend",
      label: "Backend",
      icon: Code2,
      color: "text-orange-400",
      border: "border-orange-500/50",
      bg: "bg-orange-500/10",
    },
    {
      id: "fullstack",
      label: "Fullstack",
      icon: Layers,
      color: "text-purple-400",
      border: "border-purple-500/50",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="hidden md:block h-screen sticky top-0 border-r border-white/5 bg-black z-20">
      <aside className="w-72 h-full flex flex-col p-6 font-sans relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-blue-500/5 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 mb-12 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold font-love tracking-wide text-white">
            Prep<span className="text-blue-400">AI</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1 relative z-10">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600/10 to-transparent text-blue-400 rounded-r-xl transition-all font-semibold font-ubuntu">
            <Home size={20} />
            Dashboard
          </button>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium font-ubuntu group">
                <Zap
                  size={20}
                  className="group-hover:text-orange-400 transition-colors"
                />
                Practice
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-black/95 backdrop-blur-xl border-white/10 text-white shadow-2xl p-0 overflow-hidden rounded-2xl">
              <div className="absolute top-0 left-0 w-full h-1 " />
              <DialogHeader className="p-6 pb-2">
                <DialogTitle className="text-2xl font-bold font-ubuntu tracking-wide">
                  Start{" "}
                  <span className="gradient-blue bg-clip-text text-transparent">
                    New Session
                  </span>
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-6 p-6 pt-2">
                {/* Session Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-open">
                    Session Name
                  </label>
                  <Input
                    id="name"
                    placeholder="e.g., React Senior Dev Interview"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 focus-visible:border-blue-500 h-12"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                  />
                </div>

                {/* Interview Type Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-open">
                    Interview Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {interviewTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setInterviewType(type.id)}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                          interviewType === type.id
                            ? `${type.bg} ${type.border} ring-1 ring-offset-0 ring-blue-500/30`
                            : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <type.icon size={20} className={type.color} />
                        <span
                          className={`text-xs font-medium font-ubuntu ${interviewType === type.id ? "text-white" : "text-gray-400"}`}
                        >
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timer Section (Locked) */}
                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden">
                  <div className="flex justify-between items-center relative z-10">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider font-open">
                      <Clock size={14} className="text-blue-400" /> Duration
                    </label>
                    <span className="text-xs font-bold text-blue-400 font-ubuntu">
                      {duration} min
                    </span>
                  </div>

                  <div className="relative group z-10 my-2">
                    <input
                      type="range"
                      min="2"
                      max="15"
                      value={duration}
                      disabled
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-not-allowed opacity-50"
                    />
                  </div>

                  {/* Lock Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] z-20">
                    <div className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-orange-500/20 shadow-lg font-ubuntu">
                      <Lock size={10} />
                      Beta version (Locked to 2m)
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="p-6 pt-0">
                <Button
                  type="submit"
                  onClick={handleStart}
                  className={`w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-black border-0 shadow-lg shadow-blue-500/20 transition-all duration-300 font-ubuntu ${!sessionName.trim() ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"}`}
                  disabled={!sessionName.trim()}
                >
                  Start Practice <Play size={18} className="ml-2 fill-black" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium font-ubuntu group">
            <MessageSquare
              size={20}
              className="group-hover:text-purple-400 transition-colors"
            />
            Feedback
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium font-ubuntu group">
            <Settings
              size={20}
              className="group-hover:text-teal-400 transition-colors"
            />
            Settings
          </button>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-white/5 relative z-10">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-white transition-colors font-ubuntu">
            <HelpCircle size={16} />
            Help & Support
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
