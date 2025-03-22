import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './fonts.css'

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);


