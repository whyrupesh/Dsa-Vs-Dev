"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export function CountUp({
  value,
  duration = 1.2,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, duration]);

  return <>{display.toLocaleString("en-US")}</>;
}
