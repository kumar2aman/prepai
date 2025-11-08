import Background from "./components/background";
import Homepage from "./components/homepage";


function page() {
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <Background />
        <Homepage />
      </div>
    </>
  );
}

export default page;
