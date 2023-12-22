import './Category.css';

export default function CategoryCard ({genre,img}) {
    if (genre == null) {
        return (
            <div className="loading-div">
                <img src="./loading-spinner.gif" alt="Loading Spinner" />
            </div>
        );
    } else {
        return (
            <div className='cat-gcard'>
                <img src={img} alt={`Genre card for ${genre}`} />
                <div className='cat-backdrop'></div>
                <h3>{genre.toUpperCase()}</h3>
            </div>
        );
    }
}