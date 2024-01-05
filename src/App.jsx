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
  const [over,setOver] = useState(false);
  const mobile = useMobileState();

  console.log(over);

  useEffect(() => {
      const cartElement = document.getElementById("cart-side-bar");

      function enterFunc () {
          if (!over) {
              setOver(true);
          }
      }

      function leaveFunc () {
          if (over) {
              setOver(false);
          }
      }

      cartElement.addEventListener('mouseenter',enterFunc);
      cartElement.addEventListener('mouseleave',leaveFunc);

      return (
          () => {
              cartElement.removeEventListener('mouseover',enterFunc);
              cartElement.removeEventListener('mouseleave',leaveFunc);
          }
      );
  });
  
  useEffect(() => {
      const cartElement = document.getElementById("cart-side-bar");

      function cartClick () {
          if (cartOn == true && over == false) {
            setCartOn(false);
          } 
      }

      function coordInBox(x0,y0,x1,x2,y1,y2) {
        if (x1 <= x0 && x0 <= x2) {
          if (y1 <= y0 && y0 <= y2) {
            return true;
          }
        }
        return false;
      }

      function cartStart (e) {
        const rect = cartElement.getBoundingClientRect();
        console.log(rect);
        const touch = e.touches[0];
        console.log(touch);

        if (!coordInBox(touch.pageX,touch.pageY,rect.left,rect.right,rect.top,rect.bottom) && cartOn) {
          setTimeout(()=>{setCartOn(false)},100);
        }
      }

      if (mobile) {
        window.addEventListener('touchstart',cartStart);
      } else {
        window.addEventListener('click',cartClick);
      }

      return (
          () => {
            window.removeEventListener('click',cartClick);
            window.removeEventListener('touchstart',cartStart);
          }
      );
  });

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
      <Topbar cartOn={cartOn} cart={cart} changeTheme={changeTheme} cartToggle={cartToggle} theme={theme} />
      <CartBar setFunc={setCartOn} theme={theme} cartToggle={cartToggle} cartOn={cartOn} cart={cart} cartRemove={cartRemove} itemSetAmount={itemSetAmount} />
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
