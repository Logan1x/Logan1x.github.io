import { useState, JSX } from "react";
import Projects from "./Projects";
import Home from "./Home";

function App(): JSX.Element {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center min-h-screen px-4 sm:px-6">
      {showProjects ? (
        <Projects setShowProjects={setShowProjects} />
      ) : (
        <Home setShowProjects={setShowProjects} />
      )}
    </div>
  );
}

export default App;
