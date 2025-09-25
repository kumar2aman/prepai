import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import HowItWorks from "./howItWorks";
import Features from "./features";
import GetStarted from "./getStarted";

function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks/>
      <Features/>
      <GetStarted/>
    </>
  );
}

export default Homepage;
