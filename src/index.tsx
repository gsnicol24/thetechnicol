import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

document.body.style.backgroundColor = "lightgray"
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(

    <BrowserRouter>
        <Router />
    </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
