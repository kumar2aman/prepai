"use client";
import React, { useState } from "react";
import {
  User,
  Sliders,
  Bell,
  Shield,
  Zap,
  Check,
  RotateCcw,
  Sparkles,
  Laptop,
  Code2,
  Layers,
  Volume2,
  Key,
  Trash2,
  Save,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SettingsProps {
  username?: string;
}

export default function Settings({ username = "Developer" }: SettingsProps) {
  const [activeSection, setActiveSection] = useState<"profile" | "ai" | "notifications" | "security">("profile");

  // Profile settings state
  const [displayName, setDisplayName] = useState(username || "Developer");
  const [targetRole, setTargetRole] = useState("fullstack");
  const [expLevel, setExpLevel] = useState("mid");
  const [selectedTechs, setSelectedTechs] = useState<string[]>(["React", "TypeScript", "Node.js"]);

  // AI & Interview settings state
  const [interviewerPersona, setInterviewerPersona] = useState("mentor");
  const [voiceSpeed, setVoiceSpeed] = useState("1.0x");
  const [liveFeedback, setLiveFeedback] = useState(true);
  const [autoRecordAudio, setAutoRecordAudio] = useState(true);

  // Notification settings state
  const [emailReminders, setEmailReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [publicLeaderboard, setPublicLeaderboard] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  // Save status indicator
  const [isSaved, setIsSaved] = useState(false);

  const availableTechs = [
    "React", "Next.js", "TypeScript", "JavaScript", "Node.js", 
    "Express", "Python", "PostgreSQL", "MongoDB", "GraphQL", 
    "Docker", "AWS", "Tailwind CSS", "Go"
  ];

  const toggleTech = (tech: string) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter((t) => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    setDisplayName(username || "Developer");
    setTargetRole("fullstack");
    setExpLevel("mid");
    setSelectedTechs(["React", "TypeScript", "Node.js"]);
    setInterviewerPersona("mentor");
    setVoiceSpeed("1.0x");
    setLiveFeedback(true);
    setAutoRecordAudio(true);
    setEmailReminders(true);
    setWeeklyReports(true);
    setPublicLeaderboard(true);
    setSoundEffects(true);
  };

  const tabItems = [
    { id: "profile", label: "Profile & Tech Stack", icon: User, color: "text-blue-400" },
    { id: "ai", label: "AI Interviewer", icon: Zap, color: "text-purple-400" },
    { id: "notifications", label: "System & Alerts", icon: Bell, color: "text-teal-400" },
    { id: "security", label: "Account & Security", icon: Shield, color: "text-orange-400" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto px-4 md:px-6 py-6 font-ubuntu">
      {/* Settings Top Header Card */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Sliders size={22} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-love tracking-wide text-white">
                Dashboard <span className="gradient-blue bg-clip-text text-transparent">Settings</span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm font-ubuntu mt-0.5">
                Manage your developer profile, AI interviewer behavior, and account options.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all text-xs font-ubuntu cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reset
          </Button>

          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-black font-bold shadow-lg shadow-blue-500/20 text-xs font-ubuntu cursor-pointer transition-all duration-200 hover:scale-[1.02]"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 mr-1.5 stroke-[3]" /> Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1.5" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {isSaved && (
        <div className="flex items-center gap-3 bg-teal-500/10 border border-teal-500/30 text-teal-300 px-5 py-3 rounded-xl shadow-lg transition-all animate-fadeIn">
          <Sparkles className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="text-sm font-medium">Your settings have been saved successfully!</span>
        </div>
      )}

      {/* Top Horizontal Segmented Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 scrollbar-none">
        {tabItems.map((nav) => {
          const isActive = activeSection === nav.id;
          return (
            <button
              key={nav.id}
              onClick={() => setActiveSection(nav.id as any)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-1 justify-center cursor-pointer ${
                isActive
                  ? "bg-white/10 border border-white/15 text-white shadow-lg shadow-black/50"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <nav.icon className={`w-4 h-4 ${nav.color}`} />
              <span>{nav.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Section Panel */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
        {/* SECTION 1: PROFILE & TECH STACK */}
        {activeSection === "profile" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white font-ubuntu flex items-center gap-2">
                  <User className="text-blue-400" size={20} /> Developer Profile & Tech Stack
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-ubuntu">
                  Customize your name, target position, and primary technical skill set.
                </p>
              </div>
            </div>

            {/* Display Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Display Name / Username
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-black/40 border-white/10 text-white focus-visible:ring-blue-500 h-11"
                placeholder="Enter your name"
              />
            </div>

            {/* Target Role Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Target Interview Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "frontend", label: "Frontend Engineer", icon: Laptop, color: "text-cyan-400" },
                  { id: "backend", label: "Backend Engineer", icon: Code2, color: "text-orange-400" },
                  { id: "fullstack", label: "Fullstack Engineer", icon: Layers, color: "text-purple-400" },
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setTargetRole(role.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      targetRole === role.id
                        ? "bg-blue-500/10 border-blue-500/50 text-white ring-1 ring-blue-500/30 shadow-md"
                        : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <role.icon className={`w-5 h-5 ${role.color}`} />
                    <span className="text-xs font-medium">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "junior", label: "Junior (0-2 yrs)" },
                  { id: "mid", label: "Mid-Level (2-5 yrs)" },
                  { id: "senior", label: "Senior (5+ yrs)" },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setExpLevel(lvl.id)}
                    className={`py-3 px-3 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                      expLevel === lvl.id
                        ? "bg-teal-500/10 border-teal-500/50 text-teal-300 ring-1 ring-teal-500/30"
                        : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Primary Tech Stack Skills
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {availableTechs.map((tech) => {
                  const isSelected = selectedTechs.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-sm"
                          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
                      }`}
                    >
                      {isSelected ? `✓ ${tech}` : `+ ${tech}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: AI INTERVIEWER */}
        {activeSection === "ai" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white font-ubuntu flex items-center gap-2">
                <Zap className="text-purple-400" size={20} /> AI Interviewer Behavior
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-ubuntu">
                Adjust how PrepAI agent asks questions and conducts live practice sessions.
              </p>
            </div>

            {/* AI Persona */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Interviewer Style / Persona
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "strict", label: "Strict Tech Lead", desc: "Rigorous technical questioning & deep dives", color: "border-red-500/40 text-red-400" },
                  { id: "mentor", label: "Friendly Senior Mentor", desc: "Encouraging, hint-assisted guidance", color: "border-purple-500/40 text-purple-400" },
                  { id: "quizzer", label: "Fast-Paced Quizzer", desc: "Rapid-fire conceptual and syntax checks", color: "border-cyan-500/40 text-cyan-400" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setInterviewerPersona(p.id)}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      interviewerPersona === p.id
                        ? "bg-purple-500/10 border-purple-500/50 ring-1 ring-purple-500/30"
                        : "bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <span className={`text-xs font-bold ${p.color}`}>{p.label}</span>
                    <span className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Speed */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Volume2 size={14} className="text-purple-400" /> Speech & Audio Playback Speed
              </label>
              <div className="grid grid-cols-4 gap-3">
                {["0.8x", "1.0x", "1.25x", "1.5x"].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setVoiceSpeed(speed)}
                    className={`py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      voiceSpeed === speed
                        ? "bg-purple-500/20 border-purple-500/50 text-purple-300 ring-1 ring-purple-500/30"
                        : "bg-black/30 border-white/5 text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Real-Time Code Hints</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Receive hints when struggling with syntax or problem solving.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLiveFeedback(!liveFeedback)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    liveFeedback ? "bg-purple-600" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 left-0.5 ${
                      liveFeedback ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Auto-Record Voice Sessions</h4>
                  <p className="text-xs text-gray-400 mt-0.5 font-ubuntu">Record voice responses for post-interview communication feedback.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoRecordAudio(!autoRecordAudio)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    autoRecordAudio ? "bg-purple-600" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 left-0.5 ${
                      autoRecordAudio ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SYSTEM & ALERTS */}
        {activeSection === "notifications" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white font-ubuntu flex items-center gap-2">
                <Bell className="text-teal-400" size={20} /> System & Notification Preferences
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-ubuntu">
                Manage automated practice alerts, weekly performance summaries, and UI sounds.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Daily Streak Reminders</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Receive gentle email notifications to maintain your daily streak.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailReminders(!emailReminders)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    emailReminders ? "bg-teal-500" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 left-0.5 ${
                      emailReminders ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Weekly Performance Digest</h4>
                  <p className="text-xs text-gray-400 mt-0.5 font-ubuntu">Get an analytical overview of practice scores and progress.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setWeeklyReports(!weeklyReports)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    weeklyReports ? "bg-teal-500" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 left-0.5 ${
                      weeklyReports ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">Global Leaderboard Visibility</h4>
                  <p className="text-xs text-gray-400 mt-0.5 font-ubuntu">Allow your score rank and badges to appear on global leaderboards.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPublicLeaderboard(!publicLeaderboard)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    publicLeaderboard ? "bg-teal-500" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 left-0.5 ${
                      publicLeaderboard ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
                <div>
                  <h4 className="text-sm font-semibold text-white">UI Sound Effects</h4>
                  <p className="text-xs text-gray-400 mt-0.5 font-ubuntu">Play subtle audio cues during interview completion.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundEffects(!soundEffects)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    soundEffects ? "bg-teal-500" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 left-0.5 ${
                      soundEffects ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: ACCOUNT & SECURITY */}
        {activeSection === "security" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white font-ubuntu flex items-center gap-2">
                <Shield className="text-orange-400" size={20} /> Security & Account Credentials
              </h3>
              <p className="text-xs text-gray-400 mt-1 font-ubuntu">
                Update account password and manage practice history privacy.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Current Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  className="bg-black/40 border-white/10 text-white focus-visible:ring-orange-500 h-11"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="At least 8 characters"
                    className="bg-black/40 border-white/10 text-white focus-visible:ring-orange-500 h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Repeat new password"
                    className="bg-black/40 border-white/10 text-white focus-visible:ring-orange-500 h-11"
                  />
                </div>
              </div>

              <Button className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30 text-xs font-ubuntu cursor-pointer">
                <Key className="w-4 h-4 mr-2" /> Update Security Password
              </Button>
            </div>

            {/* Danger Zone */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider">
                Danger Zone
              </h4>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl bg-red-500/5 border border-red-500/20 gap-3">
                <div>
                  <span className="text-sm font-semibold text-white">Reset Practice Data & History</span>
                  <p className="text-xs text-gray-400 mt-0.5">Permanently clear past session history and score records.</p>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 text-xs font-ubuntu cursor-pointer whitespace-nowrap"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" /> Clear History
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
