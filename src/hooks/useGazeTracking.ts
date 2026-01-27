import { useState, useEffect, useCallback } from "react";

const P_MIN = -15;
const P_MAX = 15;
const STEP = 5;
const SIZE = 256;
const SCALE = 0.375;
const CELL_SIZE = SIZE * SCALE;
const OFFSET = (CELL_SIZE - 93) / 2;

function quantizeToGrid(val: number): number {
  const raw = P_MIN + ((val + 1) * (P_MAX - P_MIN)) / 2;
  const snapped = Math.round(raw / STEP) * STEP;
  return Math.max(P_MIN, Math.min(P_MAX, snapped));
}

function gridToSpritePosition(px: number, py: number): string {
  const col = (px - P_MIN) / STEP;
  const row = (P_MAX - py) / STEP;
  const x = col * CELL_SIZE + OFFSET;
  const y = row * CELL_SIZE + OFFSET;
  return `-${x}px -${y}px`;
}

export function useGazeTracking(
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const [backgroundPosition, setBackgroundPosition] = useState(
    `-${3 * CELL_SIZE + OFFSET}px -${3 * CELL_SIZE + OFFSET}px`,
  );

  const updateGaze = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const nx = (clientX - centerX) / (rect.width / 2);
      const ny = (clientY - centerY) / (rect.height / 2);
      const invertedNy = -ny;

      const clampedX = Math.max(-1, Math.min(1, nx));
      const clampedY = Math.max(-1, Math.min(1, invertedNy));

      const px = quantizeToGrid(clampedX);
      const py = quantizeToGrid(clampedY);

      const position = gridToSpritePosition(px, py);
      setBackgroundPosition(position);
    },
    [containerRef],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      updateGaze(e.clientX, e.clientY);
    },
    [updateGaze],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateGaze(touch.clientX, touch.clientY);
      }
    },
    [updateGaze],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    updateGaze(centerX, centerY);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef, handleMouseMove, handleTouchMove, updateGaze]);

  return { backgroundPosition };
}

export default useGazeTracking;
