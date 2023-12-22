import './Special.css';

export default function SpecialCard ({name,imgs,price}) {

    if (name == null) {
        return (
            <div className='loading-div'>
                <img src="./loading-spinner.gif" alt="Loading Spinner" />
            </div>
        );
    } else {
        return (
            <div className='special-gcard'>
                <div className='s-img-container'>
                    <img src={imgs[0].image} alt={`Image for ${name}`} />
                </div>
                <div className='s-gc-content'>
                    <h3>{name}</h3>
                    <h4>Weekend Deal</h4>
                    <p><span>-30%</span>${Math.floor(price * 70)/100}</p>
                </div>
            </div>
        );
    }
}