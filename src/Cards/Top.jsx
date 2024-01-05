import './Top.css';
import PropTypes, { string } from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function TopCard ({id,name,imgs,price}) {
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
            <div className='top-gcard'>
                <div className='t-img-container pointer' onClick={handleClick}>
                    <img src={(imgs.length > 0) ? imgs[0].image : ""} alt={`Image for ${name}`} />
                </div>
                <div className='t-gc-content'>
                    <h3 className="pointer" onClick={handleClick}>{name}</h3>
                    <h4>Best Seller</h4>
                    <p>${price}</p>
                </div>
            </div>
        );
    }
}

TopCard.propTypes = {
    name: string,
    imgs: PropTypes.array,
    price: PropTypes.number,
    discount: PropTypes.number
}