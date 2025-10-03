"use client";

import Dashboard from "@/components/dashboard";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Main Dashboard */}
      <Dashboard />

      {/* Decorative Blur Elements */}
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-600 blur-3xl opacity-30 rounded-full z-0" />
      <div className="absolute top-0 left-0 w-48 h-48 bg-green-600 blur-3xl opacity-20 rounded-full z-0" />
    </div>
  );
}

export default Page;
