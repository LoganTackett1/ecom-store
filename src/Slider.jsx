import {useState, Children, useEffect} from 'react';
import PropTypes, { string } from 'prop-types';
import CardsContainer from './CardsContainer';
import './Slider.css';

/*
    This is a template component, give it a prefix prop (type string) to style it.
    The prefix prop gives the following components these classnames:
        Component Container: prefix-sl-container
        Buttons: prefix-sl-btn
        Cards Container: prefix-cards-container
        Card Wrapper: prefix-card-wrapper

    Each card wrapper is absolutely positioned at first, with classnames:
        prefix-transitioning :: use this to choose what css should be animated on click
        prefix-<0 thru num+1> :: individual css changes from prev pos to new pos
        prefix-transitioning-<0 thru num+1> :: to get very specific transitions (the num indicates what it is changing to)
    Where prefix-0 is the one hidden on the left and prefix-num+1 is hidden on the right
    NOTE: The 0 and num+1 items being overflow is a REQUIREMENT! If you want to show them increase num!
    Position of cards should be determined strictly through these classes as well as any transitions

    Delay is the time given to transition before new render (ms)
*/

function mod(n, m) {
    return ((n % m) + m) % m;
  }

export default function Slider ({children,num,prefix,delay,btnLeft,btnRight}) {
    const [card,setCard] = useState(0);
    const [currElements,setCurrElements] = useState([]);

    const childCount = Children.count(children);

    useEffect(() => {
        const arr = [];
        Children.forEach(children, child => {
            arr.push(child);
        });
        const currArr = [];
        for (let i = -1; i <= num; i++) {
            currArr.push(arr[mod(card+i,arr.length)]);
        }
        setCurrElements(currArr);
    });

    function getCards () {
        return [...document.getElementsByClassName(`${prefix}-card-wrapper`)];
    }

    function shift (cardWrappers,dir) {
        if (dir == "left") {
            for (let i = 0; i < num+1; i++) {
                cardWrappers[i].classList.add(prefix+"-"+(i+1));
                cardWrappers[i].classList.add(prefix+"-transitioning");
                cardWrappers[i].classList.add(prefix+"-transitioning-"+(i+1));
                cardWrappers[i].classList.remove(prefix+"-"+(i));
            }
        } else {
            for (let i = num+1; i > 0; i--) {
                cardWrappers[i].classList.add(prefix+"-"+(i-1));
                cardWrappers[i].classList.add(prefix+"-transitioning");
                cardWrappers[i].classList.add(prefix+"-transitioning-"+(i-1));
                cardWrappers[i].classList.remove(prefix+"-"+(i));
            }
        }
    }

    function removeTransitioning (cardWrappers) {
        for (let i = 0; i < cardWrappers.length; i++) {
            cardWrappers[i].classList.remove(prefix+"-transitioning");
            cardWrappers[i].classList.remove(prefix+"-transitioning-"+(i-1));
            cardWrappers[i].classList.remove(prefix+"-transitioning-"+(i+1));
        }
    }

    function buttonClick (dir) {
        const cardWrappers = getCards();
        if (dir == "left") {
            shift(cardWrappers,"left");
            setTimeout(() => {
                removeTransitioning(cardWrappers);
                setCard(mod(card-1,childCount));
            },delay);
        } else {
            shift(cardWrappers,"right");
            setTimeout(() => {
                removeTransitioning(cardWrappers);
                setCard(mod(card+1,childCount));
            },delay);
        }
    }

    return (
        <div className={prefix+"-sl-container" + " " + "slider-container"}>
            <button className={"sliderBtn" + " " + prefix+"-sl-btn-1"} onClick={() => {buttonClick('left')}}>{btnLeft}</button>
            <div className={prefix+"-cards-container" + " " + "cards-container"}>
                <CardsContainer prefix={prefix} cardsArr={currElements} key={card}/>
            </div>
            <button className={"sliderBtn" + " " + prefix+"-sl-btn-2"} onClick={() => {buttonClick('right')}}>{btnRight}</button>
        </div>
    );
}

Slider.propTypes = {
    children: PropTypes.node,
    num: PropTypes.number,
    prefix: string,
    delay: PropTypes.number,
    btnLeft: PropTypes.node,
    btnRight: PropTypes.node
}