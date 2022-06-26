import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "moment/locale/zh-tw"
import moment from "moment"
import { ConfigProvider } from "antd"
import zhTW from "antd/es/locale/zh_TW"
moment.locale("zh-tw")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

  // <BrowserRouter>
  //   <ConfigProvider locale={zhTW}>
  //     <App />
  //   </ConfigProvider>
  // </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
