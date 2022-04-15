import { useEffect, useState } from "react";

export const useStopWatch = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [running]);

  return { time, running, setRunning, setTime };
}