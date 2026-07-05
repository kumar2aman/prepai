"use client";
import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Check, Sparkles, Flame, Heart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/auth/signup");
  };

  const plans = [
    {
      name: "Vibe Check Plan",
      price: "$0",
      period: "forever",
      description: "For the lone wolves ready to lock in.",
      icon: Sparkles,
      iconColor: "text-cyan-400",
      borderColor: "border-cyan-500/30",
      glowColor: "from-cyan-500/10",
      buttonText: "Start Prep, No Cap",
      features: [
        "100% free, absolutely zero cost",
        "Infinite mock interviews, no limit",
        "Real-time feedback with main character energy",
        "Interactive voice sessions that actually hit",
      ],
      badge: "VIBIN",
    },
    {
      name: "Lit Plan (Pro-ish)",
      price: "$0",
      period: "no cap",
      description: "Bro really expected a paywall here 💀",
      icon: Flame,
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/50",
      glowColor: "from-orange-500/10",
      buttonText: "Claim Free Pro Rizz",
      features: [
        "Unlock ultimate interview confidence",
        "Zero ads, zero credit card, zero drama",
        "Rent-free mock interviews in your browser",
        "Level up your technical verbal rizz",
      ],
      badge: "POPULAR",
    },
    {
      name: "Delulu Plan",
      price: "$0",
      period: "bestie era",
      description: "For corporate giants used to paying $999.",
      icon: Heart,
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      glowColor: "from-purple-500/10",
      buttonText: "Star on GitHub (Good Vibes Only)",
      features: [
        "Specially designed for maximum salary gains",
        "Non-profit energy, we're just vibing",
        "Pay us in good luck and positive reviews",
        "Go secure that bag, bestie 💅",
      ],
      badge: "SHEESH",
    },
  ];

  return (
    <section id="pricing" className="relative z-10 px-6 py-24 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/5 to-teal-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex flex-col items-center justify-center text-center w-full mb-16 relative z-10">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center p-2 h-10 w-fit bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full border border-blue-500/30">
          <Zap className="w-4 h-4 text-orange-400 mr-2" />
          <span className="text-sm text-gray-300">
            Pricing? It's giving free ✨
          </span>
        </div>

        {/* Title */}
        <h2 className="text-5xl md:text-7xl font-love mb-6 leading-tight">
          Pricing Plans? <span className="gradient-orange bg-clip-text text-transparent">Nah, We Vibing</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl font-open text-gray-300 max-w-3xl mx-auto leading-relaxed">
          We don't do paywalls here. Clean UI, realistic prep, absolute zero cost.
          <br className="hidden md:inline" /> Go get that bag! 🚀
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <Card
              key={index}
              className={`bg-gray-900/40 backdrop-blur-xl border ${plan.borderColor} hover:bg-gray-900/70 transition-all duration-300 group flex flex-col justify-between overflow-hidden relative`}
            >
              {/* Corner Ambient Glow */}
              <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${plan.glowColor} to-transparent blur-xl group-hover:scale-150 transition-transform duration-500 rounded-full`} />

              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div>
                  {/* Top Row with Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center ${plan.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-blue-400 px-3 py-1 bg-blue-500/10 rounded-full uppercase">
                      {plan.badge}
                    </span>
                  </div>

                  {/* Plan Name & Price */}
                  <h3 className="text-2xl font-ubuntu font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 font-open">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-extrabold text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-sm font-semibold">
                      / {plan.period}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-white/5 mb-8" />

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm font-open font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleGetStarted}
                  className={`w-full py-6 text-base font-bold bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-black border-0 shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* GenZ Humor Disclaimer */}
      <div className="mt-16 text-center max-w-2xl mx-auto p-6 bg-white/5 border border-white/5 rounded-2xl relative z-10">
        <p className="text-sm text-gray-400 italic font-open">
          "Wait, y'all actually wanted to pay? Nah, we are currently in our 'giving back to the community' era. No credit card, no subscription, no cap. Just pure masterclass interview prep. Go cook, you absolute legend."
        </p>
      </div>
    </section>
  );
}
