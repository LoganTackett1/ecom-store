import { useState, useEffect } from 'react'
import './App.css'
import Topbar from './Topbar'

function App() {
  const [theme,setTheme] = useState('dark');
  const [cart,setCart] = useState([{title:"Dark Souls",quantity:2,id:"a1b2c3"},{title:"Elden Ring",quantity:3,id:"b1b2c3"}]);

  function changeTheme (theme) {
    localStorage.setItem('theme',theme);
    setTheme(theme);
  }

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      changeTheme(localStorage.getItem('theme'));
    } else {
      changeTheme('dark');
    }
  },[]);

  

  return (
    <div id="app-container" className={`theme-${theme}`}>
      <Topbar cart={cart} />
      <div id="content-container"></div>
    </div>
  )
}

export default App
