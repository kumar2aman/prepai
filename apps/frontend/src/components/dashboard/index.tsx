import { useEffect, useState } from "react";
import Content from "./content";
import Progress from "./progress";
import Session from "./session";
import Sidebar from "./sidebar";
import Stats from "./stats";
import axios from "axios";

function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
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

  console.log("Username:", username);

  return (
    <div className="flex flex-col md:flex-row text-white">
      {/* Sidebar */}
      <div className="md:w-64 h-full fixed md:relative top-0 left-0 z-10">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="md: w-full h-screen overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        <Content username={username}  />
        <Progress />
        <Stats />
        <Session />
      </div>
    </div>
  );
}

export default Dashboard;
