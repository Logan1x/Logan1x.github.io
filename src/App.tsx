import { JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import Home from "./Home";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="max-w-2xl mx-auto flex flex-col items-center min-h-screen px-4 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artifacts" element={<Projects />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
