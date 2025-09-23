import React from "react";

function Features() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full mt-24">
        <h1 className="font-ubuntu font-medium text-6xl mb-12">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#5433FF] via-[#20BDFF] to-[#A5FECB] text-transparent bg-clip-text">
            PrepAi
          </span>
        </h1>
        <p className="font-open text-l text-center">
          Our AI interviewer provides the most realistic practice experience
          with advanced <br />
          features designed to help you succeed.
        </p>
      </div>
    </div>
  );
}

export default Features;
