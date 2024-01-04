import { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import './Topbar.css'
import { useNavigate } from 'react-router-dom';

export default function Topbar ({cart,changeTheme,theme,cartToggle}) {
    const [showing,setShowing] = useState(true);
    const [top,setTop] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        let oldScrollY = window.scrollY;
        let lastScrollY = window.scrollY;

        const func = () => {
            if (window.scrollY > 60 && top) {
                setTop(false);
            } else if (window.scrollY <= 60 && !top) {
                setTop(true);
            }


            if (window.scrollY >= lastScrollY+80) {
                if (showing) {
                    setShowing(false);
                }
                lastScrollY = window.scrollY;
            } else if (window.scrollY < oldScrollY) {
                if (!showing) {
                    setShowing(true);
                }
                lastScrollY = window.scrollY;
            }
            
            oldScrollY = window.scrollY;
        }

        window.addEventListener('scroll',func);

        return (
            () => {
                window.removeEventListener('scroll',func);
            }
        )
    },[showing,top]);

    function toggleTheme () {
        if (theme === "dark") {
            changeTheme("light");
        } else {
            changeTheme("dark");
        }
    }

    return (
        <div className={`theme-${theme}`+" "+(showing?"":"top-hidden") + " " + (top?"":"top-not")} id='topbar-container'>
            <img className="pointer" onClick={() => { navigate("/") }} id="logo" src="./white.webp" onError={() => {this.onerror=null; this.src='./white.png'}} alt="PixelPulse Logo" />
            <div id="nav-container">
                <input type="text" />
                <button>⌕</button>
            </div>
            <div id="theme-switcher" className="pointer" onClick={toggleTheme}>
                <div id="theme-ball"></div>
            </div>
            <div id="cart-container" className='pointer' onClick={cartToggle}>
                <img id="cart-img" src="./cart.png" alt="Cart" />
                {cart.length > 0 ? <div id="item-counter">{cart.length}</div> : ""}
            </div>
        </div>
    );
}

Topbar.propTypes = {
    cart: PropTypes.array,
    changeTheme: PropTypes.func,
    theme: string
};