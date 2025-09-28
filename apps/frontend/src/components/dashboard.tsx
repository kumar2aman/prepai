import Content from "./dashboard/content";
import Sidebar from "./dashboard/sidebar";
import Progress from "./dashboard/progress";

function Dashboard() {
  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>

        <div className="w-full mx-4">
          <Content />
          <Progress/>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
