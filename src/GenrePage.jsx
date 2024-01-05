import './Home.css';
import './GenrePage.css';
import Slider from './Slider';
import SliderBtn from './SliderBtn';
import FeaturedCard from './Cards/Featured';
import SpecialCard from './Cards/Special';
import TopCard from './Cards/Top';
import { useState,useEffect } from 'react';
import MobileSlider from './Mobile/MobileSlider';
import { string } from 'prop-types';
import { apiKey } from './App';
import { useMobileState } from './main';
import { useParams } from 'react-router-dom';
import { getPriceInfo } from './Home';

//featured, special offers, browse by category, top sellers

export default function GenrePage () {
    const [games,setGames] = useState([null]);
    const [discounted,setDiscounted] = useState([null]);
    const [error,setError] = useState(false);
    const mobile = useMobileState();

    const { genre } = useParams();

    useEffect(() => {

        fetch(`https://rawg.io/api/games?token&key=${apiKey}&genres=${genre}`,{mode: 'cors'})
        .then((result) => {
            return result.json();
        }).then(response => {
            if (response.results[0] == null) {
                setError(true);
            }

            const gameArr = [];
            const discArr = [];
            for (let i = 0; i < response.results.length; i++) {
                const priceInfo = getPriceInfo(response.results[i].name);
                const dupe = {...response.results[i]};
                dupe.price = priceInfo[0]

                if (priceInfo[1] == true) {
                    discArr.push(dupe);
                } else {
                    gameArr.push(dupe);
                }
            }
            setGames(gameArr);
            setDiscounted(discArr);
        });
    },[genre]);
        if (error) {
            return (
                <div id="page-not-found">
                    Page Not Found
                </div>
            )
        } else {
            return (
                <div id="home-container">
                    <h1 className='genre-header'>{genre.toUpperCase()}</h1>
                    <div id="featured-container">
                        <h2>FEATURED & RECOMMENDED</h2>
                        {
                        mobile ? 
                        (<MobileSlider key={0} prefix="featured">
                            {
                                (games[0] == null) ? (<FeaturedCard name={null} />) : games.slice(0,6).map((game,index) => {
                                    return (
                                        <FeaturedCard key={index} name={game.name} id={game.id} imgs={game.short_screenshots} price={game.price} />
                                    )
                                })
                            }
                        </MobileSlider>)
                        : 
                        (<Slider num={1} key={0} prefix="featured" delay={200} btnLeft={<SliderBtn key={0} dir="left"/>} btnRight={<SliderBtn key={0} dir="right"/>}>
                            {
                                (games[0] == null) ? (<FeaturedCard name={null} />) : games.slice(0,6).map((game,index) => {
                                    return (
                                        <FeaturedCard key={index} name={game.name} id={game.id} imgs={game.short_screenshots} price={game.price} />
                                    )
                                })
                            }
                        </Slider>)
                        }
                    </div>
                    <div id="special-container">
                    <h2>SPECIAL OFFERS</h2>
                    {mobile ? (
                        <MobileSlider prefix="special" >
                        {
                            (discounted[0] == null) ? (<SpecialCard name={null} />) : discounted.map((game,index) => {
                                return (
                                    <SpecialCard key={index} name={game.name} id={game.id} imgs={game.short_screenshots} price={game.price} />
                                )
                            })
                        }
                    </MobileSlider>
                    ) 
                    : 
                    (
                        <Slider key={1} num={3} prefix="special" delay={200} btnLeft={<SliderBtn key={1} dir="left"/>} btnRight={<SliderBtn key={1} dir="right"/>}>
                        {
                            (discounted[0] == null) ? (<SpecialCard name={null} />) : discounted.map((game,index) => {
                                return (
                                    <SpecialCard key={index} name={game.name} id={game.id} imgs={game.short_screenshots} price={game.price} />
                                )
                            })
                        }
                    </Slider>
                    )}
                    </div>
                    <div id="top-s-container">
                        <h2>TOP SELLERS</h2>
                        {mobile ? 
                        (
                            <MobileSlider prefix="top-s" >
                            {
                                (games[0] == null) ? (<TopCard name={null} />) : games.slice(6).map((game,index) => {
                                    return (
                                        <TopCard key={index} name={game.name} id={game.id} imgs={game.short_screenshots} price={game.price} />
                                    )
                                })
                            }
                        </MobileSlider>
                        ) 
                        : 
                        (
                            <Slider num={3} prefix="top-s" delay={200} btnLeft={<SliderBtn key={2} dir="left"/>} btnRight={<SliderBtn key={2} dir="right"/>}>
                            {
                                (games[0] == null) ? (<TopCard name={null} />) : games.slice(6).map((game,index) => {
                                    return (
                                        <TopCard key={index} name={game.name} id={game.id} imgs={game.short_screenshots} price={game.price} />
                                    )
                                })
                            }
                        </Slider>
                        )
                        }
                    </div>
                    <button className='show-all-btn'>Show All</button>
                </div>
            );
        }
}

GenrePage.propTypes = {
    genre: string
}