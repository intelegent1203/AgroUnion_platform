import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: The App component is a named export, so it should be imported using curly braces.
import { App } from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);