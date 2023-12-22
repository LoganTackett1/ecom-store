import './Featured.css';
import { useState, useEffect } from 'react';


export default function FeaturedCard ({game}) {
    const [img,setImg] = useState(0);
    
    if (game == null) {
        return (
            <div className="featured-loading-div">
                <img src="./loading-spinner.gif" alt="Loading Spinner" />
            </div>
        );
    } else {
        return (
            <div className="featured-gcard">
                <div className="f-gc-img-container">
                    <img src={game.imgs[0]} className={img == 0 ? '' : 'g-off'} alt={`Background image for ${game.name}`} />
                    <img src={game.imgs[1]} className={img == 1 ? '' : 'g-off'} alt={`Image 1 for ${game.name}`} />
                    <img src={game.imgs[2]} className={img == 2 ? '' : 'g-off'} alt={`Image 2 for ${game.name}`} />
                    <img src={game.imgs[3]} className={img == 3 ? '' : 'g-off'} alt={`Image 3 for ${game.name}`} />
                    <img src={game.imgs[4]} className={img == 4 ? '' : 'g-off'} alt={`Image 4 for ${game.name}`} />
                </div>
                <div className='f-gc-info-container'>
                    <h3>{game.name}</h3>
                    <img className='f-gc-img-selector g-pic-1' onMouseEnter={()=>{setImg(1)}} onMouseLeave={()=>{setImg(0)}} src={game.imgs[1]} alt={`Image selector 1 for game ${game.name}}`} />
                    <img className='f-gc-img-selector g-pic-2' onMouseEnter={()=>{setImg(2)}} onMouseLeave={()=>{setImg(0)}} src={game.imgs[2]} alt={`Image selector 1 for game ${game.name}}`} />
                    <img className='f-gc-img-selector g-pic-3' onMouseEnter={()=>{setImg(3)}} onMouseLeave={()=>{setImg(0)}} src={game.imgs[3]} alt={`Image selector 1 for game ${game.name}}`} />
                    <img className='f-gc-img-selector g-pic-4' onMouseEnter={()=>{setImg(4)}} onMouseLeave={()=>{setImg(0)}} src={game.imgs[4]} alt={`Image selector 1 for game ${game.name}}`} />
                    <p>{game.price}</p>
                </div>
            </div>
        );
    }
}
