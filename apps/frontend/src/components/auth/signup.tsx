"use client";
import React, { useState } from "react";
import axios from "axios";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";


function Signup() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission (page refresh)
    setLoading(true);
    setError(null);

    // Basic validation
    if (!username || !email || !password) {
      setError("username or Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/signup",
        {
          username,
          email,
          password,
        }
      );

      console.log("Signup successful:", response.data);
      // Handle success - e.g., redirect to login page or dashboard
     router.push("/signin")
    } catch (err) {
      console.error("Signup failed:", err);
      // Set a user-friendly error message
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || "An error occurred during signup."
        );
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#000428] via-black to-[#37051a] opacity-50 z-0"></div>
        <main className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl">
          <div className="bg-[#1e1e1e] bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Create your account
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Email
                </label>
                <input
                  type="username"
                  id="username"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-bold text-black bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-800 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
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
              <KeyRound className="mr-2 h-5 w-5" />
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
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
  );
}

export default Signup;
