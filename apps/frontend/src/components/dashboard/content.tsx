import { Download, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Progress from "./progress";

function Content() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between   items-start mt-4 mb-6 px-4 text-white">
        <h2 className="text-2xl font-bold">Welcome back, Alex</h2>
        <div>
          <Button className="bg-orange-400">Alex</Button>
        </div>
      </div>
      <Progress/>
    </>
  );
}

export default Content;
