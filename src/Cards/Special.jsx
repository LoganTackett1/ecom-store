import './Special.css';

export default function SpecialCard ({game}) {

    if (game == null) {
        return (
            <div className='loading-div'>
                <img src="./loading-spinner.gif" alt="Loading Spinner" />
            </div>
        );
    } else {
        return (
            <div className='special-gcard'>
                <img src={game.imgs[0]} alt={`Image for ${game.name}`} />
                <div className='s-gc-content'>
                    <h3>{game.name}</h3>
                    <h4>Weekend Deal</h4>
                    <p><span>-30%</span>${Math.floor(game.price * 70)/100}</p>
                </div>
            </div>
        );
    }
}