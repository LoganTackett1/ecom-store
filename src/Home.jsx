import './Home.css';
import Slider from './Slider';

//featured, special offers, browse by category, top sellers

export default function Home () {
    
    return (
        <div id="home-container">
            <div id="header-container">
                <h1>Unlock Games with Confidence - Verified Keys, Trusted Source</h1>
                <p>
                Welcome to Pixelpulse, where gaming meets trust. 
                Our meticulously verified game keys ensure a secure and seamless experience. 
                In the unlikely event of a faulty key, we stand by our commitment to provide a full refund. 
                Instant delivery, encrypted transactions, and 24/7 support — we've got you covered. 
                Shop confidently. Play immediately.
                </p>
                <button>Shop Now</button>
                <img src="" alt="" />
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