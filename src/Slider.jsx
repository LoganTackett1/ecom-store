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
*/

export default function Slider ({children,num,prefix,cardWidth,containerWidth,grow}) {
    const [card,setCard] = useState(0);
    const [childArr,setChildArr] = useState([]);

    useEffect(() => {
        const arr = [];
        Children.forEach(children, child => {arr.push(child)});
        setChildArr(arr);
    },[children]);

    function getCurrElements () {
        const currArr = [];
        for (let i = -1; i <= num; i++) {
            currArr.push(childArr[(card+i)%childArr.length]);
        }
        return currArr;
    }

    function applyAnimations (dir) {
        const cardWrappers = [...document.getElementsByClassName("card-wrapper")];
        for (let i = 0; i < cardWrappers.length; i++) {

        }
    }

    function buttonClick (dir) {
        if (dir == "left") {
            setCard(card - 1);
        } else {
            setCard(card + 1);
        }
    }

    return (
        <div id="slider-container" className={prefix+"-sl-container"}>
            <button className={"sliderBtn" + " " + prefix+"-sl-btn"} id="leftBtn" onClick={() => {buttonClick('left')}}>{"<"}</button>
            <div id="cards-container" className={prefix+"-cards-container"}>
                {getCurrElements().map((element,index) => {
                    let classname = "";
                    let gap;
                    if (grow) {
                        gap = (containerWidth-(num*cardWidth))/(num+1);
                    } else {
                        gap = (containerWidth-(num*cardWidth))/(num-1);
                    }

                    if (index == 0 || index == num) {
                        classname = "hidden";
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
    grow: PropTypes.bool
}