import Content from "./dashboard/content";
import Sidebar from "./dashboard/sidebar";

function Dashboard() {
  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>

        <div className="w-full mx-12">
          <Content />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
