import { useEffect, useState, useRef } from "react";
import { connectBLE } from "./useBLE";

export function useInsoleData(connected: boolean) {
  const [comfortScore, setComfortScore] = useState(0);
  const [balance, setBalance] = useState(50);
  const [steps, setSteps] = useState(0);
  const [usageTime, setUsageTime] = useState(0);

  const bleConnectedRef = useRef(false);

  useEffect(() => {
    if (!connected) return;

    // Connect BLE only once
    if (!bleConnectedRef.current) {
      bleConnectedRef.current = true;

      connectBLE((data) => {
        console.log("BLE DATA:", data);
        // mapping will be done in next step
      });
    }

    // Simulation fallback
    const interval = setInterval(() => {
      setComfortScore(70 + Math.random() * 20);
      setBalance(48 + Math.random() * 4);
      setSteps((s) => s + 1);
      setUsageTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [connected]);

  return {
    comfortScore,
    balance,
    steps,
    usageTime,
  };
}
