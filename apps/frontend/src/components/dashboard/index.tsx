import Content from "./content";
import Progress from "./progress";
import Session from "./session";
import Sidebar from "./sidebar";
import Stats from "./stats";


function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row text-white">
      {/* Sidebar */}
      <div className="md:w-64 h-full fixed md:relative top-0 left-0 z-10">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="md: w-full h-screen overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        <Content />
        <Progress />
        <Stats />
        <Session />
      </div>
    </div>
  );
}

export default Dashboard;
