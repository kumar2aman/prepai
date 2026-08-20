import "dotenv/config";
import { useEffect, useState } from "react";
import Content from "./content";
import Progress from "./progress";
import Session from "./session";
import Sidebar from "./sidebar";
import Stats from "./stats";
import Settings from "./settings";
import axios from "axios";
import { DashboardData } from "@/app/dashboard/dashboardProvider";
import { Home, Settings as SettingsIcon, Zap } from "lucide-react";

interface DashboardProp {
  data: DashboardData;
}

function Dashboard({ data }: DashboardProp) {
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`,
          {
            withCredentials: true,
          }
        );

        console.log("User data:", response.data);

        if (response.status === 200) {
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    userData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row text-white min-h-screen">
      {/* Mobile Header (visible only on mobile) */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black/90 border-b border-white/10 sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="font-bold font-love text-lg">Prep<span className="text-blue-400">AI</span></span>
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-ubuntu transition-all ${
              activeTab === "dashboard"
                ? "bg-blue-600/30 text-blue-400 font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Home size={14} />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-ubuntu transition-all ${
              activeTab === "settings"
                ? "bg-teal-600/30 text-teal-400 font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <SettingsIcon size={14} />
            Settings
          </button>
        </div>
      </div>

      {/* Sidebar (Desktop) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content */}
      <div className="w-full h-screen overflow-y-auto px-4 md:px-8 py-6 space-y-6 flex-1">
        {activeTab === "dashboard" ? (
          <>
            <Content username={username} />
            <Progress data={data} />
            <Stats />
            <Session />
          </>
        ) : (
          <Settings username={username} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
