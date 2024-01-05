import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from 'react';
import App from './App.jsx'
import './index.css'
import Home from './Home.jsx';
import GenrePage from './GenrePage.jsx';
import GamePage from './GamePage.jsx';
import SearchPage from './SearchPage.jsx';
import Checkout from './Checkout.jsx';

export function useMobileState () {
  const [mobile,setMobile] = useState(false);

  function func () {
    if (window.innerWidth < 1200) {
        if (!mobile) {
            setMobile(true);
        }
    } else {
        if (mobile) {
            setMobile(false);
        }
    }
  }
  func();
  useEffect(() => {
      window.addEventListener('resize', func);

      return (() => {
          window.removeEventListener('resize', func)
      });
    },);

    return mobile;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App><Home /></App>,
  },
  {
    path: 'genre/:genre',
    element: <App><GenrePage /></App>
  },
  {
    path: 'games/:id',
    element: <App><GamePage /></App>
  },
  {
    path: 'search/',
    element: <App><SearchPage /></App>
  },
  {
    path: 'search/:search',
    element: <App><SearchPage /></App>
  },
  {
    path: '/checkout/',
    element: <App><Checkout></Checkout></App>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
