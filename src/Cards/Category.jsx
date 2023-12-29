import './Category.css';
import { string } from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard ({genre,img}) {
    const navigate = useNavigate();

    function handleClick () {
        window.scrollTo(0,0);
        navigate(`/genre/${genre}`);
    }

    if (genre == null) {
        return (
            <div className="loading-div">
                <img src="./loading-spinner.gif" alt="Loading Spinner" />
            </div>
        );
    } else {
        return (
            <div onClick={handleClick} className='cat-gcard pointer'>
                <img src={img} alt={`Genre card for ${genre}`} />
                <div className='cat-backdrop'></div>
                <h3>{genre.toUpperCase()}</h3>
            </div>
        );
    }
}

CategoryCard.propTypes = {
    genre: string,
    img: string
}