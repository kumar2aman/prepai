import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { MessageSquare } from "lucide-react";

interface FeedbackDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FeedbackDialog({ isOpen, onOpenChange }: FeedbackDialogProps) {
  const [feedbackType, setFeedbackType] = useState("bug"); // "bug" | "feature" | "general"
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setIsSubmitted(false);
      setFeedbackMessage("");
      setFeedbackType("bug");
    }
  };

  const handleSubmit = () => {
    if (feedbackMessage.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-black/95 backdrop-blur-xl border-white/10 text-white shadow-2xl p-0 overflow-hidden rounded-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-purple-500 to-indigo-500" />
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold font-ubuntu tracking-wide flex items-center gap-2">
            <MessageSquare className="text-purple-400" size={24} />
            Submit Feedback
          </DialogTitle>
          <p className="text-sm text-gray-400 font-ubuntu">
            Help us improve PrepAI. Share a bug report or suggest a feature!
          </p>
        </DialogHeader>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto text-purple-400 animate-bounce">
              <MessageSquare size={28} />
            </div>
            <h3 className="text-xl font-bold font-ubuntu text-white">Thank you!</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto font-ubuntu">
              We appreciate your input. Your feedback has been simulated as successfully sent.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="mt-4 px-6 bg-purple-500 hover:bg-purple-600 text-white font-ubuntu cursor-pointer"
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 p-6 pt-2">
            {/* Feedback Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-open">
                Feedback Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "bug", label: "Bug Report", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/50" },
                  { id: "feature", label: "Feature Request", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/50" },
                  { id: "general", label: "General Info", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/50" },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFeedbackType(type.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                      feedbackType === type.id
                        ? `${type.bg} ${type.border} ring-1 ring-purple-500/30`
                        : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold font-ubuntu ${
                        feedbackType === type.id ? type.color : "text-gray-400"
                      }`}
                    >
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider font-open">
                Details / Message
              </label>
              <textarea
                placeholder={
                  feedbackType === "bug"
                    ? "Describe the bug you encountered and how to reproduce it..."
                    : feedbackType === "feature"
                    ? "What feature would you like to see? Describe how it would work..."
                    : "Any thoughts, ideas, or general feedback..."
                }
                className="w-full h-32 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 resize-none text-sm font-ubuntu"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
              />
            </div>

            <Button
              type="button"
              onClick={handleSubmit}
              className={`w-full py-4 text-base font-bold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0 shadow-lg shadow-purple-500/20 transition-all duration-300 font-ubuntu ${
                !feedbackMessage.trim() ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] cursor-pointer"
              }`}
              disabled={!feedbackMessage.trim()}
            >
              Submit Feedback
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
