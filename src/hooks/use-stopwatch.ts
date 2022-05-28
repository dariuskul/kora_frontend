import { useEffect, useState } from "react";
import { Timer } from "timer-node";
import * as workerTimers from 'worker-timers';


export const useStopWatch = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let interval: number;

    var end = Date.now() * 1000;
    if (running) {
      interval = workerTimers.setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!running) {
      workerTimers.clearInterval(interval);
      setTime(0);
    }

    return () => {
      workerTimers.clearInterval(interval);
    }

  }, [running]);

  return { time, running, setRunning, setTime };
}