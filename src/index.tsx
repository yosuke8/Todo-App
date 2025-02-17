import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { App } from './App';
// import { App_localstrage } from './App_localstrage';
import { App_JsonServer } from './App_JsonServer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <App_localstrage /> */}
    <App_JsonServer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
