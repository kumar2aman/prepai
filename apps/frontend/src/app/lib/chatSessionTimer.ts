import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SessionTimerProps {
  initialTimeoutSeconds: number;
  redirectPath: string;
  isActive?: boolean;
}

const useSessionTimer = ({
  initialTimeoutSeconds,
  redirectPath,
  isActive,
}: SessionTimerProps) => {
  // Initialize state with the total number of seconds

  const [timeLeft, setTimeLeft] = useState(initialTimeoutSeconds);
  const router = useRouter();

  useEffect(() => {
    if (!isActive) {
      return;
    }

    // Set  interval
    const intervalId = setInterval(() => {
      // Decrease the time left every second
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function

    return () => clearInterval(intervalId);
  }, [timeLeft, redirectPath, navigator, isActive]); // Dependencies: Re-run when time runs out or redirect path changes

  // Function to reset the timer (e.g., when the user interacts with the app)
  const resetTimer = () => {
    setTimeLeft(initialTimeoutSeconds);
  };

  // Return the time left and the reset function
  return { timeLeft, resetTimer };
};

export default useSessionTimer;
