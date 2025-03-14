import { useState, JSX } from "react";
import Projects from "./Projects";
import Home from "./Home";

function App(): JSX.Element {
  const [showArtifacts, setShowArtifacts] = useState(false);

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center min-h-screen px-4 sm:px-6">
      {showArtifacts ? (
        <Projects setShowArtifacts={setShowArtifacts} />
      ) : (
        <Home setShowArtifacts={setShowArtifacts} />
      )}
    </div>
  );
}

export default App;
