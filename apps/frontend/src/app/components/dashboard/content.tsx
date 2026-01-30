import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

function Content({ username }: any) {
  const router = useRouter();

  const logouthandler = async () => {
    try {
      await axios.post("http://localhost:3001/api/v1/auth/logout", null, {
        withCredentials: true,
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
        <div>
          <h2 className="text-3xl font-bold font-love tracking-wide text-white">
            Welcome back, <span className="gradient-blue bg-clip-text text-transparent">{username}</span>
          </h2>
          <p className="text-gray-400 mt-1 font-ubuntu text-sm">Ready to master your next interview?</p>
        </div>
        
        <Button
          onClick={logouthandler}
          variant="outline"
          className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-ubuntu"
        >
          <LogOut className="w-4 h-4 mr-2" /> Log Out
        </Button>
      </div>
    </div>
  );
}

export default Content;
