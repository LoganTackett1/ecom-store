import PropTypes, { string } from 'prop-types';
import './Topbar.css'

export default function Topbar ({cart,changeTheme,theme}) {

    function toggleTheme () {
        if (theme === "dark") {
            changeTheme("light");
        } else {
            changeTheme("dark");
        }
    }

    return (
        <div id='topbar-container'>
            <img id="logo" src="../public/white.webp" onError={() => {this.onerror=null; this.src='../public/white.png'}} alt="PixelPulse Logo" />
            <div id="nav-container"></div>
            <div id="theme-switcher" onClick={toggleTheme}>
                <div id="theme-ball"></div>
            </div>
            <div id="cart-container">
                <img id="cart-img" src="../public/cart.png" alt="Cart" />
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