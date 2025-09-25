import { Brain, CheckCircle, Target } from "lucide-react";

 export const getStartedData = [
            {
              step: "01",
              title: "Choose Your Role",
              description: "Select your target position and industry to get personalized interview questions.",
              icon: <Target className="w-8 h-8" />
            },
            {
              step: "02", 
              title: "Practice with AI",
              description: "Engage in realistic voice or video interviews with our advanced AI interviewer.",
              icon: <Brain className="w-8 h-8" />
            },
            {
              step: "03",
              title: "Improve & Succeed",
              description: "Review feedback, track progress, and master your interview skills.",
              icon: <CheckCircle className="w-8 h-8" />
            }
          ]