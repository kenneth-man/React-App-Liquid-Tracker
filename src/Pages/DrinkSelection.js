import React from 'react';
import { allDrinks } from '../AllDrinks';
import Drink from '../Components/Drink';

const DrinkSelection = () => {
    return (
        <div className='Page drinkSelection'>
            {
                allDrinks.map((curr, index) => 
                    <Drink
                        key={index}
                        index={index}
                        name={curr.name}
                        image={curr.image}
                        page='drinkSelection'
                    />
                )
            }
        </div>
    )
}

export default DrinkSelection;