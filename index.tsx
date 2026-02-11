
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Josata Technologies | Entry Point
 * Bootstraps the React 19 High Performance Application
 */

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Critical Failure: Root container not found in DOM.");
}
