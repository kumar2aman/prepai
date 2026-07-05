"use client";
import React from "react";
import Background from "@/app/components/homePage/background";
import Navbar from "@/app/components/homePage/navbar";
import Pricing from "@/app/components/pricing";
import Footer from "@/app/components/homePage/footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <Background />
      <Navbar />
      <main className="relative z-10 pt-10">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
