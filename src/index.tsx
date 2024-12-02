import React from "react";
import { createRoot } from "react-dom/client"; 
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/queryClient";
import App from "./App";
import "./styles/global.css"; 

const rootElement = document.getElementById("root"); 

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
