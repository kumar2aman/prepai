import React from 'react'
import { getStartedData } from '@/app/lib/getStartedData'

function GetStarted() {


    const data = getStartedData
  return (
    <section id="how-it-works" className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Started in{' '}
            <span className="gradient-blue  bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.map((step, index) => (
            <div key={index} className="text-center relative">
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent" />
              )}
              
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 gradient-orange  rounded-full flex items-center justify-center text-2xl  font-bold">
                {step.step}
              </div>
              
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-cyan-400">
                  {step.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-ubuntu font-semibold mb-3 text-white">{step.title}</h3>
              <p className="text-gray-300 font-open font-semibold">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
  )
}

export default GetStarted