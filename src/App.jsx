import { useState, useEffect } from 'react'
import './App.css'
import Topbar from './Topbar'

function App() {
  const [theme,setTheme] = useState('dark');

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
      <Topbar />
      <div id="content-container"></div>
    </div>
  )
}

export default App
