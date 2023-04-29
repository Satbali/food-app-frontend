import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { FoodContextProvider } from './context/FoodContext.js';
import { AuthContextProvider } from './context/userContex';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <FoodContextProvider>
          <App />
        </FoodContextProvider>
      </AuthContextProvider>
    </BrowserRouter>

  </React.StrictMode>
);

