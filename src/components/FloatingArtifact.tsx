import { useEffect, useRef } from "react";

const ARTIFACT_SVG_URL =
  "/floating-artifact.svg";

const FloatingArtifact = () => {
  const floatingArtifactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const floatingArtifact = floatingArtifactRef.current;

    if (!floatingArtifact) {
      return;
    }

    const nearDistance = 180;
    const maxOffset = 18;
    const maxRotation = 22;
    let frameId = 0;

    const resetEvade = () => {
      floatingArtifact.style.setProperty("--evade-x", "0px");
      floatingArtifact.style.setProperty("--evade-y", "0px");
      floatingArtifact.style.setProperty("--evade-rotate", "0deg");
    };

    const onMouseMove = (event: MouseEvent) => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const rect = floatingArtifact.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance === 0 || distance > nearDistance) {
          resetEvade();
          return;
        }

        const intensity = (nearDistance - distance) / nearDistance;
        const normalizedX = deltaX / distance;
        const normalizedY = deltaY / distance;

        floatingArtifact.style.setProperty(
          "--evade-x",
          `${-normalizedX * maxOffset * intensity}px`
        );
        floatingArtifact.style.setProperty(
          "--evade-y",
          `${-normalizedY * maxOffset * intensity}px`
        );
        floatingArtifact.style.setProperty(
          "--evade-rotate",
          `${-normalizedX * maxRotation * intensity}deg`
        );
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", resetEvade);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", resetEvade);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="artifact-floater" ref={floatingArtifactRef}>
      <div className="artifact-floater__inner">
        <img
          src={ARTIFACT_SVG_URL}
          alt=""
          className="artifact-floater__img"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default FloatingArtifact;
