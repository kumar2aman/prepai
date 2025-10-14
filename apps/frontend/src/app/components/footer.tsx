import { Brain } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-blue bg-clip-text text-transparent">
                PrepAI
              </span>
            </div>
            
            <div className="text-gray-400 text-sm">
              © 2025 PrepAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer