import { useEffect, useState } from "react";

export function useIMUSimulator(active: boolean) {
  const [az, setAz] = useState(1);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      const impact = Math.random() > 0.7 ? 1.4 : 1.0;
      setAz(impact);

      if (impact > 1.3) {
        setSteps((s) => s + 1);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [active]);

  return { az, steps };
}
