import './CartItem.css';
import { useState } from 'react';

export default function CartItem ({item,cartRemove,itemSetAmount}) {

    function handleChange (e) {
        const val = Number(e.target.value);
        if (isNaN(val)) {
            itemSetAmount(item.id,item.count);
        } else {
            if (val == item.count + 1 || val == item.count - 1) {
                itemSetAmount(item.id,val);
            } else {
                itemSetAmount(item.id,item.count);
            }
        }
    }

    function handleClick () {
        cartRemove(item.id);
    }

    return (
        <div id="cart-item">
            <h4>{item.name}</h4>
            <input min={1} type="number" value={item.count} onChange={handleChange} />
            <p>${Math.floor((item.price_final*item.count)*100)/100}</p>
            <button onClick={handleClick}>x</button>
        </div>
    );
}