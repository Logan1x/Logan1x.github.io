import { JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Projects from "./Projects";
import Home from "./Home";
import NotFound from "./NotFound";
import ForLLMs from "./ForLLMs";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="mx-auto flex flex-col items-center min-h-screen px-4 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artifacts" element={<Projects />} />
          <Route path="/for-llms" element={<ForLLMs />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
