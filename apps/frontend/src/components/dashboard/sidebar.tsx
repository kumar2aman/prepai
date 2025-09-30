import React from 'react'

function Sidebar() {
  return (
     <div className="border-r  border-orange-400/40">
        <aside className="w-60 min-h-screen text-white p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-blue bg-clip-text text-transparent  mb-8">PrepAI</h1>
            <nav className="space-y-4">
              <button className="w-full text-left px-4 py-2 gradient-orange  rounded-md font-semibold">Dashboard</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md">Practice</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md">Feedback</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md">Settings</button>
            </nav>
          </div>
          <button className="text-sm text-gray-400 hover:text-white">Help</button>
        </aside>
        </div>
  )

}

export default Sidebar