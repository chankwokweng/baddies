import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollToTop } from "./components";

import { CurrentUserProvider } from './context';

import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      {/* <CurrentUserProvider> */}
        <ScrollToTop />
        <ToastContainer closeButton={false} autoClose={1000} position={"bottom-right"} />
        <App />
      {/* </CurrentUserProvider> */}
    </Router>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

