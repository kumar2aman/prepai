import Content from "./content";
import Progress from "./progress";
import Session from "./session";
import Sidebar from "./sidebar";
import Stats from "./stats";

function Dashboard() {
  return (
    <div className="flex min-h-screen overflow-hidden bg-black text-white">
      {/* Sidebar with fixed width */}
      <div className="w-64 h-full fixed left-0 top-0 border-r border-orange-300/20  z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 h-screen overflow-y-auto px-8 py-6 space-y-6  ">
        <Content />
        <Progress/>
         <Stats/>
         <Session/>
      </div>
    </div>
  );
}

export default Dashboard;
