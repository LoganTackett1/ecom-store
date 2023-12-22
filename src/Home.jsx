import './Home.css';
import Slider from './Slider';
import SliderBtn from './SliderBtn';
import FeaturedCard from './Cards/Featured';
import SpecialCard from './Cards/Special';
import TopCard from './Cards/Top';
import CategoryCard from './Cards/Category';
import { useState,useEffect } from 'react';

//featured, special offers, browse by category, top sellers

export default function Home () {
    const [games,setGames] = useState([null]);
    const [genres,setGenres] = useState([null]);

    useEffect(() => {
        const apiKey = "03a120e5221642d684ecf9e2ee2dd529";

        fetch(`https://rawg.io/api/games?token&key=${apiKey}`,{mode: 'cors'})
        .then(result => result.json()).then(response => setGames(response.results));
        fetch(`https://rawg.io/api/genres?token&key=${apiKey}`,{mode: 'cors'})
        .then(result => result.json()).then(response => setGenres(response.results));
    },[]);

    console.log(games);
    console.log(genres);

    return (
        <div id="home-container">
            <div id="header-container">
                <h1>
                    <div className='one'><strong>Unlock</strong> Games </div>
                    <div className='two'>with <strong>Confidence</strong> </div>
                    <div className='three'>Verified Keys, Trusted Source</div>
                </h1>
                <p>
                Welcome to Pixelpulse, where gaming meets trust. 
                Our meticulously verified game keys ensure a secure and seamless experience. 
                In the unlikely event of a faulty key, we stand by our commitment to provide a full refund. 
                Instant delivery, encrypted transactions, and 24/7 support — we've got you covered. 
                Shop confidently. Play immediately.
                </p>
                <button id="shop-now">SHOP NOW</button>
                <div id="provider-icons">
                    <img className="steam-icon" src="./provider-icons/steam.png" alt="Steam Logo" />
                    <img className="ps-icon" src="./provider-icons/playstation.png" alt="Playstation Logo" />
                    <img className="switch-icon" src="./provider-icons/switch.png" alt="Nintendo Switch Logo" />
                    <img className="battle-icon" src="./provider-icons/battlenet.png" alt="Battle.net Logo" />
                    <img className="xbox-icon" src="./provider-icons/xbox.png" alt="Xbox Logo" />
                    <img className="epic-icon" src="./provider-icons/epic.png" alt="Epic Games Logo" />
                </div>
            </div>
            <div id="featured-container">
                <h2>FEATURED & RECOMMENDED</h2>
                <Slider num={1} key={0} prefix="featured" delay={200} btnLeft={<SliderBtn key={0} dir="left"/>} btnRight={<SliderBtn key={0} dir="right"/>}>
                    {
                        (games[0] == null) ? (<FeaturedCard name={null} />) : games.slice(0,5).map((game,index) => {
                            return (
                                <FeaturedCard key={index} name={game.name} imgs={game.short_screenshots} price={29.99} />
                            )
                        })
                    }
                </Slider>
            </div>
            <div id="special-container">
            <h2>SPECIAL OFFERS</h2>
                <Slider key={1} num={3} prefix="special" delay={200} btnLeft={<SliderBtn key={1} dir="left"/>} btnRight={<SliderBtn key={1} dir="right"/>}>
                    {
                        (games[0] == null) ? (<SpecialCard name={null} />) : games.slice(5,13).map((game,index) => {
                            return (
                                <SpecialCard key={index} name={game.name} imgs={game.short_screenshots} price={29.99} />
                            )
                        })
                    }
                </Slider>
            </div>
            <div id="browse-cat-container">
                <h2>BROWSE BY CATEGORY</h2>
                <Slider num={4} prefix="browse-cat" delay={200} btnLeft={<SliderBtn key={1} dir="left"/>} btnRight={<SliderBtn key={1} dir="right"/>}>
                    {
                        (genres[0] == null) ? (<CategoryCard genre={null} />) : genres.map((genre,index) => {
                            return (
                                <CategoryCard key={index} genre={genre.name} img={genre.image_background} />
                            )
                        })
                    }
                </Slider>
            </div>
            <div id="top-s-container">
                <h2>TOP SELLERS</h2>
                <Slider num={3} prefix="top-s" delay={200} btnLeft={<SliderBtn key={1} dir="left"/>} btnRight={<SliderBtn key={1} dir="right"/>}>
                    {
                        (games[0] == null) ? (<TopCard name={null} />) : games.slice(13).map((game,index) => {
                            return (
                                <TopCard key={index} name={game.name} imgs={game.short_screenshots} price={29.99} />
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}