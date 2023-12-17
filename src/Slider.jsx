import {useState, Children, useEffect} from 'react';
import PropTypes, { string } from 'prop-types';
import './Slider.css';

/*
    This is a template component, give it a prefix prop (type string) to style it.
    The prefix prop gives the following components these classnames:
        Component Container: prefix-sl-container
        Buttons: prefix-sl-btn
        Cards Container: prefix-cards-container
        Card Wrapper: prefix-card-wrapper

    Gap is the pixel gap between card wrappers

    To give the slider transition effects use these classes:
    Hidden card (Removed on click): prefix-hidden
    Card to be hidden (Added on click): prefix-hiding
    Card general during transition: prefix-transition
    Card left vs right transformations: prefix-transform-<left/right>

    Delay is the time given to transition before new render (ms)
    Use the css var --translate when making translation transitions
*/

function mod(n, m) {
    return ((n % m) + m) % m;
  }

export default function Slider ({children,num,prefix,cardWidth,containerWidth,grow,delay}) {
    const [card,setCard] = useState(0);
    const [childArr,setChildArr] = useState([]);

    useEffect(() => {
        const arr = [];
        Children.forEach(children, child => {arr.push(child)});
        setChildArr(arr);
    },[children]);

    let gap;
    if (grow) {
        gap = (containerWidth-(num*cardWidth))/(num+1);
    } else {
        gap = (containerWidth-(num*cardWidth))/(num-1);
    }

    useEffect(() => {
        const sliderContainer = document.getElementsByClassName(prefix+'-sl-container');
        sliderContainer[0].style.setProperty('--translate',`${gap+cardWidth}px`);
    });

    function getCurrElements () {
        const currArr = [];
        for (let i = -1; i <= num; i++) {
            currArr.push(childArr[mod(card+i,childArr.length)]);
        }
        return currArr;
    }

    function applyAnimations (dir) {
        const cardWrappers = [...document.getElementsByClassName(prefix+"-card-wrapper")];
        if (dir == "left") {
            cardWrappers[0].classList.remove(prefix+"-hidden");
            cardWrappers[cardWrappers.length-2].classList.add(prefix+"-hiding");
        } else {
            cardWrappers[cardWrappers.length-1].classList.remove(prefix+"-hidden");
            cardWrappers[1].classList.add(prefix+"-hiding");
        }
        for (let i = 0; i < cardWrappers.length; i++) {
            cardWrappers[i].classList.add(prefix+"-transition");
            if (dir == "left") {
                cardWrappers[i].classList.add(prefix+"-transform-left");
            } else {
                cardWrappers[i].classList.add(prefix+"-transform-right");
            }
        }
    }

    function removeAnimations () {
        const cardWrappers = [...document.getElementsByClassName(prefix+"-card-wrapper")];
        for (let i = 0; i < cardWrappers.length; i++) {
            cardWrappers[i].classList.remove(prefix+"-transition");
            cardWrappers[i].classList.remove(prefix+"-transform-left");
            cardWrappers[i].classList.remove(prefix+"-transform-right");
            if (i > 0 && i < cardWrappers.length-1) {
                cardWrappers[i].classList.remove(prefix+"-hiding");
                cardWrappers[i].classList.remove(prefix+"-hidden");
            } else {
                cardWrappers[i].classList.remove(prefix+"-hiding");
                cardWrappers[i].classList.add(prefix+"-hidden");
            }
        }
    }

    function buttonClick (dir) {
        if (dir == "left") {
            applyAnimations("left");
            setTimeout(() => {
                removeAnimations();
                setCard(mod(card-1,childArr.length));
            },delay);
        } else {
            applyAnimations("right");
            setTimeout(() => {
                removeAnimations();
                setCard(mod(card+1,childArr.length));
            },delay);
        }
    }
    
    return (
        <div id="slider-container" className={prefix+"-sl-container"}>
            <button className={"sliderBtn" + " " + prefix+"-sl-btn"} id="leftBtn" onClick={() => {buttonClick('left')}}>{"<"}</button>
            <div id="cards-container" className={prefix+"-cards-container"}>
                {getCurrElements().map((element,index) => {
                    let classname = "";

                    if (index == 0 || index == num + 1) {
                        classname = prefix+"-hidden";
                    }

                    return (
                        <div style={{left: `${grow ? (cardWidth*(index-1))+(gap*index) : (cardWidth+gap)*(index-1)}px`}} className={"card-wrapper" + " " + classname + " " + prefix + "-card-wrapper"} key={index}>
                            {element}
                        </div>
                    )
                })}
            </div>
            <button className={"sliderBtn" + " " + prefix+"-sl-btn"} id="rightBtn" onClick={() => {buttonClick('right')}}>{">"}</button>
        </div>
    );
}

Slider.propTypes = {
    children: PropTypes.node,
    num: PropTypes.number,
    prefix: string,
    cardWidth: PropTypes.number,
    containerWidth: PropTypes.number,
    grow: PropTypes.bool,
    delay: PropTypes.number
}