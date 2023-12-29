import { useState, useEffect } from 'react'
import './App.css'
import Topbar from './Topbar'
import Home from './Home';
import GenrePage from './GenrePage';
import { useMobileState } from './main';
import GamePage from './GamePage';

const defaultTheme = 'light';

export const apiKey = "03a120e5221642d684ecf9e2ee2dd529";

function App({children}) {
  const [theme,setTheme] = useState(defaultTheme);
  const [cart,setCart] = useState([{title:"Dark Souls",quantity:2,id:"a1b2c3"},{title:"Elden Ring",quantity:3,id:"b1b2c3"}]);
  const mobile = useMobileState();
  
  function changeTheme (theme) {
    localStorage.setItem('theme',theme);
    setTheme(theme);
  }

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      changeTheme(localStorage.getItem('theme'));
    } else {
      changeTheme(defaultTheme);
    }
  },[]);

  let darkClass;
  let lightClass;
  if (theme === "dark") {
    darkClass = "on";
    lightClass = "off";
  } else {
    darkClass = "off";
    lightClass = "on";
  }

  return (
    <>
      <div id="dark-background" className={'theme-dark' + ' ' + darkClass}></div>
      <div id="light-background" className={'theme-light' + ' ' + lightClass}></div>
      <Topbar cart={cart} changeTheme={changeTheme} theme={theme} />
      <div id="app-container" className={`theme-${theme}`}>
        <div id="content-container">
          {children}
        </div>
      </div>
    </>
  )
}

export default App
