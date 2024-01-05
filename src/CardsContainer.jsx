import PropTypes, { string } from 'prop-types';
import './CardsContainer.css';

export default function CardsContainer ({prefix,cardsArr}) {

    function generateCardElements () {
        return cardsArr.map((element,index) => {
            let classname = prefix+"-"+index;

            return (
                <div className={"card-wrapper" + " " + classname + " " + prefix + "-card-wrapper"} key={index}>
                    {element}
                </div>
            );
        });
    }

    return (
        <>
            {generateCardElements()}
        </>
    );
}

CardsContainer.propTypes = {
    prefix: string,
    cardsArr: PropTypes.array
}