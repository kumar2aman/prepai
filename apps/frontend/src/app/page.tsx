import Background from "./components/homePage/background";
import Homepage from "./components/homePage/homepage";


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
