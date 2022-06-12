import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LookProvider } from './components/LookContext';
import './css/tailwind.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LookProvider>
      <App />
    </LookProvider>
  </React.StrictMode>,
);

reportWebVitals();
