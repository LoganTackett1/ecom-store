import { useState, useEffect } from 'react';
import { apiKey } from './App';
import { useParams } from 'react-router-dom';
import SpecialCard from './Cards/Special';
import TopCard from './Cards/Top';
import { getPriceInfo } from './Home';
import './SearchPage.css';

export default function SearchPage () {
    const [games,setGames] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);

    const {search} = useParams();

    function checkString (str) {
        if (typeof str !== 'string') {
            return false;
        }
        if (str.length == 0) {
            return false;
        }
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) !== " ") {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        fetch(`https://rawg.io/api/games?token&key=${apiKey}${checkString(search) ? `&search=${search}` : ``}&page_size=20`,{mode: 'cors'})
        .then(result => result.json())
        .then(result => {
            const dupe = [];

            for (let item of result.results) {
                const itemInfo = getPriceInfo(item.name);
                const dupedItem = {...item};
                dupedItem.price = itemInfo[0];
                dupedItem.discount = itemInfo[1];

                dupe.push(dupedItem);
            }

            setLoading(false);
            setGames(dupe);
        });
    },[search]);

    useEffect(() => {
        fetch(`https://rawg.io/api/games?token&key=${apiKey}${checkString(search) ? `&search=${search}` : ``}&page_size=20&page=${page}`,{mode: 'cors'})
        .then(result => result.json())
        .then(result => {
            const dupe = [...games];

            for (let item of result.results) {
                const itemInfo = getPriceInfo(item.name);
                const dupedItem = {...item};
                dupedItem.price = itemInfo[0];
                dupedItem.discount = itemInfo[1];

                dupe.push(dupedItem);
            }

            setLoading(false);
            setGames(dupe);
        });
    },[page]);

    function handleClick () {
        const pageCount = games.length / 20;

        if (pageCount - Math.floor(pageCount) == 0 && loading == false) {
            setLoading("true");
            setPage(page + 1);
        }
    }

    return (
        <div id="search-container">
            <div id="search-items">
                {games.map((game,index) => {
                    if (game.discount) {
                        return (
                            <div key={index} className="search-card">
                                <SpecialCard id={game.id} name={game.name} imgs={game.short_screenshots} price={game.price} />
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className="search-card">
                                <TopCard id={game.id} name={game.name} imgs={game.short_screenshots} price={game.price} />
                            </div>
                        );
                    }
                })}
            </div>
            {(Math.floor(games.length / 20) - (games.length / 20)) == 0 ? <button onClick={handleClick}>Show More</button> : ""}
        </div>
    );
}

