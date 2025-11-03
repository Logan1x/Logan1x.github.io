import { useRef, useState } from "react";
import useGazeTracking from "../hooks/useGazeTracking";

export default function FaceTracker({
  className = "",
  basePath = "/faces/",
  showDebug = false,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentImage, isLoading, error } = useGazeTracking(
    containerRef,
    basePath
  );
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (error) {
    return (
      <div className="face-tracker-error">
        Error loading face images: {String(error)}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`face-tracker rounded-full w-24 h-24 overflow-hidden shadow-2xl shadow-pink-400/20 bg-gray-500/20 border-2 border-gray-400/10 ${className}`}
      onMouseMove={handleMouseMove}
    >
      {currentImage && (
        <img
          src={currentImage}
          alt="Face following gaze"
          className="face-image w-full h-full object-contain grayscale"
          style={{
            transition: "opacity 0.1s ease-out",
            display: "block",
          }}
          onError={(e) =>
            console.error("Image failed to load:", currentImage, e)
          }
        />
      )}

      {isLoading && <div className="face-loading">Loading face...</div>}

      {showDebug && (
        <div className="face-debug">
          <div>
            Mouse: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})
          </div>
          <div>
            Image: {currentImage ? currentImage.split("/").pop() : "None"}
          </div>
          <div>Full Path: {currentImage || "None"}</div>
        </div>
      )}
    </div>
  );
}
