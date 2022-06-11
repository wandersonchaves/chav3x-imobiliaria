import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LookProvider } from './components/LookContext';
import './css/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <LookProvider>
      <App />
    </LookProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
