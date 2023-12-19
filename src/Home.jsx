import './Home.css';
import Slider from './Slider';

//featured, special offers, browse by category, top sellers

export default function Home () {
    
    return (
        <div id="home-container">
            <div id="header-container">
                <h1>
                    <div className='one'>Unlock Games </div>
                    <div className='two'>with Confidence </div>
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
                    <img className="steam-icon" src="../public/provider-icons/steam.png" alt="Steam Logo" />
                    <img className="ps-icon" src="../public/provider-icons/playstation.png" alt="Playstation Logo" />
                    <img className="switch-icon" src="../public/provider-icons/switch.png" alt="Nintendo Switch Logo" />
                    <img className="battle-icon" src="../public/provider-icons/battlenet.png" alt="Battle.net Logo" />
                    <img className="xbox-icon" src="../public/provider-icons/xbox.png" alt="Xbox Logo" />
                    <img className="epic-icon" src="../public/provider-icons/epic.png" alt="Epic Games Logo" />
                </div>
            </div>
            <h2>FEATURED & RECOMMENDED</h2>
            <Slider num={1} prefix="featured" delay={400}>
                <div id="dummy-f">1</div>
                <div id="dummy-f">2</div>
                <div id="dummy-f">3</div>
                <div id="dummy-f">4</div>
            </Slider>
            <h2>SPECIAL OFFERS</h2>
            <Slider num={4} prefix="special" delay={200}>
                <div id="dummy-s"></div>
                <div id="dummy-s"></div>
                <div id="dummy-s"></div>
                <div id="dummy-s"></div>
                <div id="dummy-s"></div>
            </Slider>
            <h2>BROWSE BY CATEGORY</h2>
            <Slider num={5} prefix="browse-cat" delay={200}>
                <div id="dummy-c"></div>
                <div id="dummy-c"></div>
                <div id="dummy-c"></div>
                <div id="dummy-c"></div>
                <div id="dummy-c"></div>
            </Slider>
            <h2>TOP SELLERS</h2>
            <Slider num={4} prefix="top-sellers" delay={200}>
                <div id="dummy-t"></div>
                <div id="dummy-t"></div>
                <div id="dummy-t"></div>
                <div id="dummy-t"></div>
                <div id="dummy-t"></div>
            </Slider>
        </div>
    );
}