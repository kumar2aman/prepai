import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import HowItWorks from "./howItWorks";
import Features from "./features";

function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks/>
      <Features/>
    </>
  );
}

export default Homepage;
