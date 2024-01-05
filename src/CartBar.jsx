import { useEffect,useState } from 'react';
import './CartBar.css';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

export default function CartBar ({setFunc,cart,cartRemove,itemSetAmount,cartOn,theme,cartToggle}) {

    let total = 0;
    for (let item of cart) {
        total += item.price_final * item.count;
    }
    total = Math.floor(total*100)/100;

    const navigate = useNavigate();

    function handleCheckout () {
        navigate('/checkout/');
    }

    return (
        <div id="cart-side-bar" className={(cartOn ? "cart-showing" : "") + " " + `theme-${theme}`}>
            <div id="cart-sb-header">
                <h2>Cart:</h2>
                <button onClick={cartToggle}>Exit</button>
            </div>
            <div id="cart-items">
                {cart.map((item,i) => {
                    return (
                        <CartItem key={i} item={item} count={item.count} cartRemove={cartRemove} itemSetAmount={itemSetAmount} />
                    )
                })}
            </div>
            <div id="cart-sb-footer">
                <h3>${total}</h3>
                <button onClick={handleCheckout}>Check Out</button>
            </div>
        </div>
    );
}