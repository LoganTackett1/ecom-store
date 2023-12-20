import PropTypes, { string } from 'prop-types';
import './SliderBtn.css';

export default function SliderBtn ({dir}) {

    return (
        <div className='button-content'>
            <img className={dir == 'left' ? "button-left" : ""} src="../public/buttons/right-arrow.png" alt="Right Arrow" />
        </div>
    );
}

SliderBtn.propTypes = {
    dir: string
}