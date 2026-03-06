import { useState, useEffect, useCallback } from "react";


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
  const [timeLeft, setTimeLeft] = useState(initialTimeoutSeconds);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft <= 0]); // Re-run only when isActive changes or time hits zero

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTimeoutSeconds);
  }, [initialTimeoutSeconds]);

  return { timeLeft, resetTimer };
};

export default useSessionTimer;
