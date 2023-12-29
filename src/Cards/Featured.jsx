import './Featured.css';
import { useState, useEffect } from 'react';
import PropTypes, { string } from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function FeaturedCard ({id,name,imgs,price,discount}) {
    const [img,setImg] = useState(0);

    const navigate = useNavigate();
    
    function handleClick () {
        window.scrollTo(0,0);
        navigate(`/games/${id}`,{relative:"path"});
    }

    if (name == null) {
        return (
            <div className="loading-div">
                <img src="./loading-spinner.gif" alt="Loading Spinner" />
            </div>
        );
    } else {
        return (
            <div className="featured-gcard">
                <div onClick={handleClick} className="f-gc-img-container pointer">
                    <img src={imgs[0].image} className={img == 0 ? '' : 'g-off'} alt={`Background image for ${name}`} />
                    <img src={imgs[1].image} className={img == 1 ? '' : 'g-off'} alt={`Image 1 for ${name}`} />
                    <img src={imgs[2].image} className={img == 2 ? '' : 'g-off'} alt={`Image 2 for ${name}`} />
                    <img src={imgs[3].image} className={img == 3 ? '' : 'g-off'} alt={`Image 3 for ${name}`} />
                    <img src={imgs[4].image} className={img == 4 ? '' : 'g-off'} alt={`Image 4 for ${name}`} />
                </div>
                <div className='f-gc-info-container'>
                    <h3 className="pointer" onClick={handleClick}>{name}</h3>
                    <div className='f-gc-imgs-container'>
                        <img className='f-gc-img-selector g-pic-1' onMouseEnter={()=>{setImg(1)}} onMouseLeave={()=>{setImg(0)}} src={imgs[1].image} alt={`Image selector 1 for game ${name}}`} />
                        <img className='f-gc-img-selector g-pic-2' onMouseEnter={()=>{setImg(2)}} onMouseLeave={()=>{setImg(0)}} src={imgs[2].image} alt={`Image selector 1 for game ${name}}`} />
                        <img className='f-gc-img-selector g-pic-3' onMouseEnter={()=>{setImg(3)}} onMouseLeave={()=>{setImg(0)}} src={imgs[3].image} alt={`Image selector 1 for game ${name}}`} />
                        <img className='f-gc-img-selector g-pic-4' onMouseEnter={()=>{setImg(4)}} onMouseLeave={()=>{setImg(0)}} src={imgs[4].image} alt={`Image selector 1 for game ${name}}`} />
                    </div>
                    <p>${price}</p>
                </div>
            </div>
        );
    }
}

FeaturedCard.propTypes = {
    name: string,
    imgs: PropTypes.array,
    price: PropTypes.number,
    discount: PropTypes.number
}
