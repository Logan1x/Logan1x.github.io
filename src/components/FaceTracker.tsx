import { useRef } from "react";
import useGazeTracking from "../hooks/useGazeTracking";

export default function FaceTracker({ className = "" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { backgroundPosition } = useGazeTracking(containerRef);

  return (
    <div
      ref={containerRef}
      className={`face-tracker rounded-full w-22 h-22 overflow-hidden shadow-2xl shadow-pink-400/20 bg-gray-500/20 border-2 border-gray-400/10 ${className}`}
    >
      <div
        className="face-image w-full h-full grayscale"
        style={{
          backgroundImage: "url(/faces/sprite.webp)",
          backgroundPosition,
          backgroundSize: "672px 672px",
        }}
      />
    </div>
  );
}
