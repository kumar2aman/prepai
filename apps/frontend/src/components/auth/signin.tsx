import { KeyRound } from 'lucide-react'
import React from 'react'

function Signin() {
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#000428] via-black to-[#37051a] opacity-50 z-0"></div>
        <main className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl">
         
          <div className="bg-[#1e1e1e] bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
             Welcome Back
            </h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 font-bold text-black bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Hop In
              </button>
            </form>

            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-600" />
              <span className="mx-4 text-sm text-gray-400">
                Or continue with
              </span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <button className="w-full flex items-center justify-center py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
              <KeyRound />
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-400">
              dont have  an account?{" "}
              <a href="#" className="font-medium text-blue-400 hover:underline">
                Sign in
              </a>
            </p>
          </div>

          {/* Right Side: Promotional Content */}
          <div className="text-center md:text-left p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Unlock Your Potential
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Practice with AI, get personalized feedback, and ace your next
              interview.
            </p>
          </div>
        </main>
      </div>
    </>
  )
}

export default Signin