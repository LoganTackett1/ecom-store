import './Home.css';
import Slider from './Slider';
import SliderBtn from './SliderBtn';
import FeaturedCard from './Cards/Featured';
import SpecialCard from './Cards/Special';

//featured, special offers, browse by category, top sellers

const gameObj = {};
gameObj.price = 29.99;
gameObj.name = "Grand Theft Auto V";
gameObj.imgs = ["https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
                "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg",
                "https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg",
                "https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg",
                "https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg"];

export default function Home () {
    
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
                    <FeaturedCard game={null} />
                    <FeaturedCard game={gameObj} />
                    <FeaturedCard game={gameObj} />
                    <FeaturedCard game={gameObj} />
                </Slider>
            </div>
            <div id="special-container">
            <h2>SPECIAL OFFERS</h2>
                <Slider key={1} num={3} prefix="special" delay={200} btnLeft={<SliderBtn key={1} dir="left"/>} btnRight={<SliderBtn key={1} dir="right"/>}>
                    <SpecialCard game={gameObj}/>
                    <SpecialCard game={null}/>
                    <SpecialCard game={null}/>
                    <SpecialCard game={null}/>
                    <SpecialCard game={null}/>
                </Slider>
            </div>
            <div id="browse-cat-container">
                <h2>BROWSE BY CATEGORY</h2>
                <Slider num={4} prefix="browse-cat" delay={200} btnLeft={<SliderBtn key={1} dir="left"/>} btnRight={<SliderBtn key={1} dir="right"/>}>
                    <div id="dummy-c"></div>
                    <div id="dummy-c"></div>
                    <div id="dummy-c"></div>
                    <div id="dummy-c"></div>
                    <div id="dummy-c"></div>
                    <div id="dummy-c"></div>
                    <div id="dummy-c"></div>
                </Slider>
            </div>
            <div id="top-s-container">
                <h2>TOP SELLERS</h2>
                <Slider num={3} prefix="top-s" delay={200} btnLeft={<SliderBtn key={1} dir="left"/>} btnRight={<SliderBtn key={1} dir="right"/>}>
                    <div id="dummy-t"></div>
                    <div id="dummy-t"></div>
                    <div id="dummy-t"></div>
                    <div id="dummy-t"></div>
                    <div id="dummy-t"></div>
                </Slider>
            </div>
        </div>
    );
}