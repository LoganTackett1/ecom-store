import { useState, useEffect } from 'react'
import './App.css'
import Topbar from './Topbar'
import Home from './Home';
import GenrePage from './GenrePage';

const defaultTheme = 'light';

function App() {
  const [theme,setTheme] = useState(defaultTheme);
  const [cart,setCart] = useState([{title:"Dark Souls",quantity:2,id:"a1b2c3"},{title:"Elden Ring",quantity:3,id:"b1b2c3"}]);
  const [mobile,setMobile] = useState(false);
  
  function changeTheme (theme) {
    localStorage.setItem('theme',theme);
    setTheme(theme);
  }

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
    if (localStorage.getItem('theme')) {
      changeTheme(localStorage.getItem('theme'));
    } else {
      changeTheme(defaultTheme);
    }
  },[]);

  useEffect(() => {
      window.addEventListener('resize', func);

      return (() => {
          window.removeEventListener('resize', func)
      });
    },);

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
          <Home mobile={mobile}></Home>
        </div>
      </div>
    </>
  )
}

export default App
