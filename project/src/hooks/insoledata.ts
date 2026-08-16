import { useEffect, useState, useRef } from "react";
import { connectBLE } from "./useBLE";

export function useInsoleData(connected: boolean) {

  const [comfortScore, setComfortScore] = useState(0);
  const [balance, setBalance] = useState(50);
  const [steps, setSteps] = useState(0);
  const [usageTime, setUsageTime] = useState(0);

  const lastHeel = useRef(0);
  const bleConnectedRef = useRef(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (!connected) return;

    if (!bleConnectedRef.current) {
      bleConnectedRef.current = true;

      connectBLE((data: any) => {

        /*
        Expected BLE packet structure
        {
          fsr: [heel, midL, midR, toeL, toeR],
          ax, ay, az
        }
        */

        if (!data?.fsr) return;

        const [heel, midL, midR, toeL, toeR] = data.fsr;

        const totalPressure = heel + midL + midR + toeL + toeR;

        /* ---------- STEP DETECTION ---------- */
        const STEP_THRESHOLD = 0.25;

        if (heel > STEP_THRESHOLD && lastHeel.current <= STEP_THRESHOLD) {
          setSteps((s) => s + 1);
        }

        lastHeel.current = heel;

        /* ---------- BALANCE ---------- */
        const leftLoad = heel + midL + toeL;
        const rightLoad = midR + toeR;

        const total = leftLoad + rightLoad;

        if (total > 0) {
          const balancePercent = (leftLoad / total) * 100;
          setBalance(balancePercent);
        }

        /* ---------- COMFORT SCORE ---------- */
        /*
        Comfort heuristic:
        - even pressure distribution
        - lower peak pressure
        */

        const pressures = [heel, midL, midR, toeL, toeR];

        const mean =
          pressures.reduce((a, b) => a + b, 0) / pressures.length;

        const variance =
          pressures.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) /
          pressures.length;

        const comfort = Math.max(0, 100 - variance * 50);

        setComfortScore(Math.round(comfort));
      });
    }

    /* ---------- USAGE TIME ---------- */

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      setUsageTime(elapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, [connected]);

  return {
    comfortScore,
    balance,
    steps,
    usageTime,
  };
}