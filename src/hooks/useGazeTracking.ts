import { useState, useEffect, useCallback } from "react";

type GazeTrackingResult = {
  currentImage: string | null;
  isLoading: boolean;
  error: unknown;
};

// Grid configuration (must match your generation parameters)
const P_MIN = -15;
const P_MAX = 15;
const STEP = 5;
const SIZE = 256;

/**
 * Converts normalized coordinates [-1, 1] to grid coordinates
 */
function quantizeToGrid(val: number): number {
  const raw = P_MIN + ((val + 1) * (P_MAX - P_MIN)) / 2; // [-1,1] -> [-15,15]
  const snapped = Math.round(raw / STEP) * STEP;
  return Math.max(P_MIN, Math.min(P_MAX, snapped));
}

/**
 * Converts grid coordinates to filename format
 */
function gridToFilename(px: number, py: number): string {
  const sanitize = (val: number): string => {
    const str = val.toString();
    // Handle negative numbers and decimals properly
    let result = str.replace("-", "m");
    // Only replace decimal point if it exists and there are digits after it
    if (result.includes(".")) {
      result = result.replace(".", "p");
    } else {
      // If no decimal, add p0
      result = result + "p0";
    }
    return result;
  };
  return `gaze_px${sanitize(px)}_py${sanitize(py)}_${SIZE}.webp`;
}

/**
 * Custom hook for gaze tracking
 * @param containerRef - Reference to the container element
 * @param basePath - Base path to face images (default: '/faces/')
 * @returns {Object} { currentImage, isLoading, error }
 */
export function useGazeTracking(
  containerRef: React.RefObject<HTMLDivElement | null>,
  basePath = "/faces/"
): GazeTrackingResult {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isLoading] = useState(false);
  const [error] = useState(null);

  const updateGaze = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Convert to normalized coordinates [-1, 1]
      const nx = (clientX - centerX) / (rect.width / 2);
      const ny = (clientY - centerY) / (rect.height / 2);

      // Invert Y-axis so bottom = negative, top = positive
      const invertedNy = -ny;

      // Clamp to [-1, 1] range
      const clampedX = Math.max(-1, Math.min(1, nx));
      const clampedY = Math.max(-1, Math.min(1, invertedNy));

      // Convert to grid coordinates
      const px = quantizeToGrid(clampedX);
      const py = quantizeToGrid(clampedY);

      // Generate filename
      const filename = gridToFilename(px, py);
      const imagePath = `${basePath}${filename}`;

      console.log("Generated image path:", imagePath);
      setCurrentImage(imagePath);
    },
    [basePath]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      updateGaze(e.clientX, e.clientY);
    },
    [updateGaze]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateGaze(touch.clientX, touch.clientY);
      }
    },
    [updateGaze]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add global event listeners for page-wide tracking
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Set initial center gaze based on container position
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    updateGaze(centerX, centerY);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove, updateGaze]);

  return { currentImage, isLoading, error };
}

export default useGazeTracking;
