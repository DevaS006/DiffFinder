import React from 'react';
import ReactDOM from 'react-dom/client';
import './view/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "./components/ui/provider.jsx"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
    <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
