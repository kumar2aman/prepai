import { Download, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Progress from "./progress";
import { useRouter } from "next/navigation";

function Content({username}:any) {

const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

const logouthandler = () => {
  localStorage.clear();
  router.push("/");
};



console.log("username", username);
  return (
    <>
      <div className="flex justify-between   items-start mt-4 mb-6 px-4 text-white">
        <h2 className="text-2xl font-bold">Welcome back, {username}</h2>
        <div>
          <Button onClick={logouthandler} className="bg-orange-400 cursor-pointer">log out</Button>
        </div>
      </div>
     
    </>
  );
}

export default Content;
