import './CartItem.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartItem ({item,cartRemove,itemSetAmount,count}) {
    const [val,setVal] = useState(item.count);
    const [on,setOn] = useState(false);
    const navigate = useNavigate();

    function handleChange (e) {
        setVal(e.target.value);
    }

    useEffect(() => {
        setVal(count);
    },[count]);

    useEffect(() => {
        const inp = document.getElementById(`inp-${item.id}`);

        function inpFunc (e) {
            if (e.target == inp && !on) {
                setOn(true);
            } else if (e.target !== inp && on) {
                setOn(false);
            }
        }

        window.addEventListener('click',inpFunc);

        return (() => {
            window.removeEventListener('click',inpFunc);
        });
    });

    useEffect(() => {
        if (!on) {
            setVal(item.count);
        }
    },[on]);

    useEffect(() => {
        const numVal = Number(val);
        if (!isNaN(numVal) && numVal > 0) {
            itemSetAmount(item.id,numVal);
        }
    },[val]);

    function handleClick () {
        cartRemove(item.id);
    }

    function handleLink () {
        navigate(`/games/${item.id}`,{relative:"path"});
    }

    return (
        <div id="cart-item">
            <h4 onClick={handleLink} className='pointer'>{item.name}</h4>
            <input id={`inp-${item.id}`} min={1} type="number" value={val} onChange={handleChange} />
            <p>${Math.floor((item.price_final*item.count)*100)/100}</p>
            <button onClick={handleClick}>X</button>
        </div>
    );
}