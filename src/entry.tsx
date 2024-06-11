import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

const container = document.getElementById("root");

// we can eslint disable next line because rule doesnt apply here on a root level if condition
// eslint-disable-next-line functional/no-conditional-statements
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
