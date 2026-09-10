import { useEffect, useState } from "react";
import {
  formatLocalStamp,
  formatRemaining,
  isPeakUtc,
  nextFlipUtc,
} from "../data/deepseekPricing";

export type DeepSeekClock = {
  now: Date;
  isPeak: boolean;
  remaining: string;
  nextFlip: Date;
  nextFlipLocal: string;
};

export function useDeepSeekClock(): DeepSeekClock {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const nextFlip = nextFlipUtc(now);

  return {
    now,
    isPeak: isPeakUtc(now),
    remaining: formatRemaining(nextFlip.getTime() - now.getTime()),
    nextFlip,
    nextFlipLocal: formatLocalStamp(nextFlip),
  };
}
