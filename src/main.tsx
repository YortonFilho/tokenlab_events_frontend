// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css'; 
import { ToastContainer } from 'react-toastify';

const rootElement = document.getElementById('root') as HTMLElement; 

const root = ReactDOM.createRoot(rootElement); 

root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
);
