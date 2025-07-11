import React, { useEffect, useState } from "react";

const colors = ["#24d05a", "#eb4888", "#10a2f5", "#e9bc3f"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const NotFound: React.FC = () => {
  const [color, setColor] = useState(getRandomColor());

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(getRandomColor());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-4">Page Not Found</p>
      <a
        href="/"
        className="underline "
        style={{
          textDecorationColor: color,
          textDecoration: "underline",
          textDecorationThickness: 2,
        }}
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
