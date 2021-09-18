import React, { useContext, useState } from 'react';
import { Context } from '../Context.js';
import { Link, useHistory } from 'react-router-dom';
import { allDrinks } from '../AllDrinks.js';

const Drink = ({ index, name, image, page = undefined, volume = false }) => {
    const { setDrinkSelectedName, setDrinkSelectedIndex, homeData, setHomeData } = useContext(Context);
    const [isToggleShown, setIsToggleShown] = useState(false);
    let history = useHistory();

    const drinkOnClick = () => {
        page === 'home' ?  toggleDrinkModal() : drinkSelectionOnClick();
    }

    const drinkHomeOnClick = () => {
        setDrinkSelectedIndex(index);
    }

    const drinkSelectionOnClick = () => {
        setDrinkSelectedName(name);
        history.push(`/DrinkVolume/${name}`);
    }

    const deleteDrinkOnClick = () => {
        const elementToDelete = homeData.slice(index, index + 1);

        setHomeData(homeData.filter(curr => curr !== elementToDelete[0]));
    }

    const toggleDrinkModal = () => {
        setIsToggleShown(!isToggleShown);
    }

    return (
        //using 'useHistory' hook because can't have nested 'Link' elements
        <div className='drink col' onClick={drinkOnClick}>
            <img src={image} alt='drink-img' className='drink__img'/>

            <h1>{name}</h1>

            {volume ? <h3>{volume}ml</h3> : <span style={{display: 'none'}}></span>}

            <div className={isToggleShown ? 'drink__modal col' : 'drink__modal col hidden'} style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${allDrinks.find(curr => curr.name === name).background})`}}>
                <Link to={`/DrinkVolume/${name}`} exact='true' className='link' onClick={drinkHomeOnClick}>Edit Drink</Link>

                <button onClick={deleteDrinkOnClick}>Delete Drink</button>

                <button onClick={toggleDrinkModal}>Close</button>
            </div>
        </div>
    )
}

export default Drink;