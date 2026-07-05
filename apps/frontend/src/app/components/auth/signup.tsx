"use client";
import "dotenv/config";
import React, { useState } from "react";
import axios from "axios";
import { KeyRound, User, Mail, Lock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!username || !email || !password) {
      setError("Username, email, and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signup`,
        {
          username,
          email,
          password,
        }
      );

      console.log("Signup successful:", response.data);
      router.push("/auth/signin");
    } catch (err) {
      console.error("Signup failed:", err);
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

  const handleGoogleSignin = () => {
    console.log("Signing in with Google...");
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google`;
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Subtle floating pills */}
      <div className="absolute top-12 left-1/4 w-32 h-8 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full rotate-12 animate-float pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-24 h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full -rotate-12 animate-float delay-1000 pointer-events-none" />

      <main className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Premium Signup Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-6 w-full max-w-md mx-auto"
        >
          <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
            {/* Ambient Card Corner Glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent blur-xl transition-transform duration-500 rounded-full group-hover:scale-150" />

            <div className="text-center mb-8">
              <h2 className="text-3xl font-ubuntu font-bold tracking-tight text-white mb-2">
                Create Account
              </h2>
              <p className="text-gray-400 text-sm">
                Lock in your career era. No cap. ✨
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-open">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    id="username"
                    placeholder="e.g. dev_pro"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-open"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-open">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    placeholder="e.g. you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-open"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-open">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-open"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center font-medium bg-red-500/10 border border-red-500/20 py-2 rounded-xl">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 font-ubuntu font-bold text-black bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="grow h-[1px] bg-white/10" />
              <span className="mx-4 text-xs uppercase tracking-wider text-gray-500 font-bold">
                Or Continue With
              </span>
              <div className="grow h-[1px] bg-white/10" />
            </div>

            {/* Google Signin */}
            <button
              onClick={handleGoogleSignin}
              className="w-full flex items-center justify-center gap-2.5 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl font-ubuntu text-sm font-semibold transition-all cursor-pointer"
            >
              <KeyRound className="h-4 w-4 text-blue-400" />
              Continue with Google
            </button>

            <p className="mt-8 text-center text-sm text-gray-400 font-open">
              Already have an account?{" "}
              <a
                onClick={() => router.push("/auth/signin")}
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer underline decoration-blue-400/30 hover:decoration-blue-300"
              >
                Sign in
              </a>
            </p>
          </div>
        </motion.div>

        {/* Right Column: Promotional Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-6 text-center md:text-left p-6 md:pl-12 flex flex-col justify-center"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center p-2 h-10 w-fit bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full border border-blue-500/30 mx-auto md:mx-0">
            <Zap className="w-4 h-4 text-orange-400 mr-2 animate-pulse" />
            <span className="text-sm text-gray-300">
              Level Up Your verbal rizz
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-love mb-6 leading-tight">
            Master the Rizz.
            <br />
            <span className="gradient-blue bg-clip-text text-transparent">
              Secure the Offer.
            </span>
          </h1>

          <p className="text-lg md:text-xl font-open text-gray-300 mb-8 leading-relaxed">
            Practice with an AI interviewer featuring natural voice flow.
            Get detailed feedback, improve your answers, and start cooking in your interviews. 🚀
          </p>
        </motion.div>
      </main>
    </div>
  );
}

export default Signup;
