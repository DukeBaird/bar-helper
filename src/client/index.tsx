import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';

const container = document.getElementById('root');
const root = createRoot(container!); // Create a root.
root.render(<App />); // Initial render.