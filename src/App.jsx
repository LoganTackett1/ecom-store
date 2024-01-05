import React from 'react';
import { useState, useEffect } from 'react'
import './App.css'
import Topbar from './Topbar'
import Home from './Home';
import GenrePage from './GenrePage';
import { useMobileState } from './main';
import GamePage from './GamePage';
import CartBar from './CartBar';

const defaultTheme = 'light';

export const apiKey = "03a120e5221642d684ecf9e2ee2dd529";

function App({children}) {
  const [theme,setTheme] = useState(defaultTheme);
  const [cart,setCart] = useState([]);
  const [cartOn,setCartOn] = useState(false);
  const mobile = useMobileState();

  function setLocalCart (obj) {
    localStorage.setItem('cart',`${JSON.stringify(obj)}`);
  }

  function cartAdd(item) {
    const dupe = [...cart];
    dupe.push(item);
    setLocalCart(dupe);
    setCart(dupe);
  }

  function cartRemove (id) {
    const dupe = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        continue;
      } else {
        dupe.push(cart[i]);
      }
    }
    setLocalCart(dupe);
    setCart(dupe);
  }

  function itemSetAmount (id,amount) {
    if (amount == 0) {
      cartRemove(id);
      return;
    }
    if (amount < 0) {
      return;
    }

    const dupe = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        const itemDupe = cart[i];
        itemDupe.count = amount;
        dupe.push(itemDupe);
      } else {
        dupe.push(cart[i]);
      }
    }
    setLocalCart(dupe);
    setCart(dupe);
  }

  function renderChildren () {
    return React.Children.map(children,(child) => {
      return React.cloneElement(child,{cartAdd, cartRemove, cart, itemSetAmount });
    });
  }

  function changeTheme (theme) {
    localStorage.setItem('theme',theme);
    setTheme(theme);
  }

  function cartToggle () {
    setCartOn(!cartOn);
  }

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      changeTheme(localStorage.getItem('theme'));
    } else {
      changeTheme(defaultTheme);
    }

    if (localStorage.getItem('cart')) {
      const cartString = localStorage.getItem('cart');
      setCart(JSON.parse(cartString));
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
      <Topbar cart={cart} changeTheme={changeTheme} cartToggle={cartToggle} theme={theme} />
      <CartBar theme={theme} cartToggle={cartToggle} cartOn={cartOn} cart={cart} cartRemove={cartRemove} itemSetAmount={itemSetAmount} />
      <div id="app-container" className={`theme-${theme}`}>
        <div id="content-container">
          {renderChildren()}
        </div>
        <div id="footer">
          @RAWG API Game Database
        </div>
      </div>
    </>
  )
}

export default App
