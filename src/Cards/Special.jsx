import './Special.css';
import PropTypes, { string } from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function SpecialCard ({id,name,imgs,price}) {
    const navigate = useNavigate();

    function handleClick () {
        window.scrollTo(0,0);
        navigate(`/games/${id}`);
    }

    if (name == null) {
        return (
            <div className='loading-div'>
                <img src="./loading-spinner.gif" alt="Loading Spinner" />
            </div>
        );
    } else {
        return (
            <div className='special-gcard'>
                <div className='s-img-container pointer' onClick={handleClick}>
                    <img src={imgs[0].image} alt={`Image for ${name}`} />
                </div>
                <div className='s-gc-content'>
                    <h3 className="pointer" onClick={handleClick}>{name}</h3>
                    <h4>Weekend Deal</h4>
                    <p><span>-30%</span>${Math.floor(price * 70)/100}</p>
                </div>
            </div>
        );
    }
}

SpecialCard.propTypes = {
    name: string,
    imgs: PropTypes.array,
    price: PropTypes.number,
    discount: PropTypes.number
}