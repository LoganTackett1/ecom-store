import './Top.css';

export default function TopCard ({name,imgs,price}) {

    if (name == null) {
        return (
            <div className='loading-div'>
                <img src="./loading-spinner.gif" alt="Loading Spinner" />
            </div>
        );
    } else {
        return (
            <div className='top-gcard'>
                <div className='t-img-container'>
                    <img src={imgs[0].image} alt={`Image for ${name}`} />
                </div>
                <div className='t-gc-content'>
                    <h3>{name}</h3>
                    <h4>Best Seller</h4>
                    <p>${price}</p>
                </div>
            </div>
        );
    }
}