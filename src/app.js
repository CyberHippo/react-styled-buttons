import React, { useState } from "react";
import { createRoot } from 'react-dom/client';

import Buttons from "./ui/Buttons";

function App() {
  const [mode, setMode] = useState("light");
  return <Buttons mode={mode} setMode={setMode} />;
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
