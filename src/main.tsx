import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// function ErrorBoundary({ children }: { children: React.ReactNode }) {
//   return <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>;
// }

// const root = ReactDOM.createRoot(document.getElementById("root")!);
// root.render(
//   <ErrorBoundary>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </ErrorBoundary>
// );
