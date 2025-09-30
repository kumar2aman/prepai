import React from 'react'

function Stats() {
  return (
    <div> 
        <div className="grid grid-cols-4 gap-6  mb-12 mt-12">
           
            <div className=" flex flex-col justify-center items-center gap-y-4 border border-orange-300/40 p-4 h-[16vh] t rounded-3xl">
              <p className="text-xl text-gray-400">Total Score</p>
              <p className="text-5xl font-bold">950</p>
            </div>
            <div className=" flex flex-col justify-center items-center gap-y-4 border border-orange-300/40 p-4 h-[16vh] t rounded-3xl">
              <p className="text-xl text-gray-400">Level</p>
              <p className="text-5xl font-bold text-orange-500">15</p>
            </div>
            <div className=" flex flex-col justify-center items-center gap-y-4 border border-orange-300/40 p-4 h-[16vh] t rounded-3xl">
              <p className="text-xl text-gray-400">Badges Earned</p>
              <p className="text-5xl font-bold">3</p>
            </div>
            <div className=" flex flex-col justify-center items-center gap-y-4 border border-orange-300/40 p-4 h-[16vh] t rounded-3xl">
              <p className="text-xl text-gray-400">Leaderboard Rank</p>
              <p className="text-5xl font-bold text-yellow-400">#3</p>
            </div>
          </div></div>
  )
}

export default Stats