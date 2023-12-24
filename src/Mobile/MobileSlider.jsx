import {useState, Children, useEffect} from 'react';
import PropTypes, { string } from 'prop-types';
import './MobileSlider.css';

export default function MobileSlider ({children,prefix}) {
    const [currElements,setCurrElements] = useState([]);

    useEffect(() => {
        const arr = [];
        Children.forEach(children, child => {
            arr.push(child);
        });
        setCurrElements(arr);
    },[children]);

    return (
        <div className={prefix+"-m-sl-container"}>
            <div className={prefix+"-m-cards-container"}>
                {currElements.map((ele,ind) => {
                    return (
                        <div key={ind} className={prefix+"-m-card-wrapper"}>
                            {ele}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

MobileSlider.propTypes = {
    children: PropTypes.node,
    prefix: string,
}