import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HouseProvider } from './components/HouseContext';
import './css/tailwind.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HouseProvider>
      <App />
    </HouseProvider>
  </React.StrictMode>,
);

reportWebVitals();
