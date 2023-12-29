import './GamePage.css';
import PropTypes, { string } from 'prop-types';
import {useState,useEffect} from 'react';
import Slider from './Slider';
import { apiKey } from './App';
import { useParams } from 'react-router-dom';
import SliderBtn from './SliderBtn';
import { getPriceInfo } from './Home';
import MobileSlider from './Mobile/MobileSlider';
import { useMobileState } from './main';

export default function GamePage () {
    const [imgs,setImgs] = useState([]);
    const [info,setInfo] = useState({name:null,details:null,price:null});
    const [loadingInfo,setLoadingInfo] = useState(true);

    const mobile = useMobileState();
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://rawg.io/api/games/${id}/screenshots?token&key=${apiKey}`,{mode: 'cors'})
        .then(response => response.json())
        .then(result => {
            const arr = [];
            for (let item of result.results) {
                arr.push(item.image);
            }
            setImgs(arr);
        });

        fetch(`https://rawg.io/api/games/${id}?token&key=${apiKey}`,{mode: 'cors'})
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setInfo(result);
            setLoadingInfo(false);
        });
    },[id]);

    function splitLanguages (text) {
        for (let i = 0; i < text.length-7; i++) {
            if (text.slice(i,i+7) == "Español") {
                return [text.slice(0,i),text.slice(i+7)];
            }
        }
        return [text,false];
    }

    let about = ["Loading...",false];
    let price = ["Loading",false];

    if (info.name !== null) {
        about = splitLanguages(info.description_raw);
    }

    if (loadingInfo == false) {
        price = getPriceInfo(info.name);
    }

return (
    <div id="game-page">
        <h1>{info.name == null ? "Loading...": info.name}</h1>
        <div id="game-cta">
            {price[1] == true ? (<span>-30%</span>) : ("")}
            <p>${price[1] == true ? (Math.floor(price[0] * 70)/100) : (price[0])}</p>
            <button>{loadingInfo ? "Loading" : "ADD TO CART"}</button>
        </div>
        {mobile ? 
        (
            <MobileSlider prefix="gp" >
                        {imgs.length == 0 ? (
                            <div className="loading-div">
                                <img src="./loading-spinner.gif" alt="Loading Spinner" />
                            </div>
                        ) 
                        :
                        (
                            imgs.map((img,index) => {
                                return (
                                    <div key={index} className='game-img-card'>
                                        <img src={img} alt={`Image ${index+1}`} />
                                    </div>
                                )
                            })
                        )}            
            </MobileSlider>
        ) 
        : 
        (
            <Slider num={1} prefix="gp" delay={300} btnLeft={<SliderBtn key={0} dir="left"/>} btnRight={<SliderBtn key={0} dir="right"/>}>
            {imgs.length == 0 ? (
                <div className="loading-div">
                    <img src="./loading-spinner.gif" alt="Loading Spinner" />
                </div>
            ) 
            :
             (
                imgs.map((img,index) => {
                    return (
                        <div key={index} className='game-img-card'>
                            <img src={img} alt={`Image ${index+1}`} />
                        </div>
                    )
                })
             )}            
        </Slider>
        )}
        <h2>About this Game:</h2>
        <p>{about[0]}</p>
        {about[1] == false ? "" : <p>{about[1]}</p>}
    </div>
);

}