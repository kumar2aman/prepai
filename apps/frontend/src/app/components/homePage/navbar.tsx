"use client"
import { Button } from '@/app/components/ui/button'

import { Zap, Github} from 'lucide-react'
import React from 'react'

function Navbar() {

const signinHandler = () => {
  window.location.href = 'auth/signin'
}

const signupHandler = () => {
  window.location.href = 'auth/signup'
}



  return (
    <>
      <a
        href="https://github.com/aman2dev/prepai"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-4 md:right-8 lg:right-12 z-50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors border border-white/10 hover:border-white/20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold shadow-lg hover:scale-[1.02] cursor-pointer"
      >
        <Github className="w-5 h-5 text-white" />
        <span>Star on GitHub</span>
      
      </a>

      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold font-love tracking-wide text-white">
            Prep<span className="text-blue-400">AI</span>
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="/#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="/#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
          <a href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
        
          <Button onClick={signinHandler} variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
            Sign In
          </Button>
          <Button onClick={signupHandler} className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
            Get Started
          </Button>
        </div>
      </nav>
    </>
  )
}

export default Navbar