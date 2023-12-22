import { useState, useEffect } from 'react'
import './App.css'
import Topbar from './Topbar'
import Home from './Home';

const defaultTheme = 'light';

function App() {
  const [theme,setTheme] = useState(defaultTheme);
  const [games,setGames] = useState(null);
  const [cart,setCart] = useState([{title:"Dark Souls",quantity:2,id:"a1b2c3"},{title:"Elden Ring",quantity:3,id:"b1b2c3"}]);
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

    const apiKey = "03a120e5221642d684ecf9e2ee2dd529";

    fetch(`https://rawg.io/api/games?token&key=${apiKey}`,{mode: 'cors'}).then(result => result.json()).then(response => console.log(response));
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
          <Home></Home>
        </div>
      </div>
    </>
  )
}

export default App
