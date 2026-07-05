import { Zap } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Zap size={20} className="text-white fill-white" />
              </div>
              <h1 className="text-2xl font-bold font-love tracking-wide text-white">
                Prep<span className="text-blue-400">AI</span>
              </h1>
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