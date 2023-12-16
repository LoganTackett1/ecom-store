import './Topbar.css'

export default function Topbar ({cart}) {

    return (
        <div id='topbar-container'>
            <img id="logo" src="../public/white.webp" onError={() => {this.onerror=null; this.src='../public/white.png'}} alt="PixelPulse Logo" />
            <div id="nav-container"></div>
            <div id="cart-container">
                <img id="cart-img" src="../public/cart.png" alt="Cart" />
                {cart.length > 0 ? <div id="item-counter">{cart.length}</div> : ""}
            </div>
        </div>
    );
}