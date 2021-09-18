import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import { allDrinks } from '../AllDrinks';
import ProgressBar from "@ramonak/react-progress-bar";
import glassIcon from '../Res/Icons/glass.svg';
import plusIcon from '../Res/Icons/plus.svg';
import minusIcon from '../Res/Icons/minus.svg';
import tempBackground from '../Res/Drinks/temp-background.png';

const DrinkVolume = () => {
    const { drinkSelectedName, setDrinkSelectedName, drinkSelectedIndex, setDrinkSelectedIndex, homeData, setHomeData, fetchNutritionData } = useContext(Context);
    const [drinkFound, setDrinkFound] = useState(undefined);
    const [volume, setVolume] = useState(0);
    const [waterVolume, setWaterVolume] = useState(0);

    const setVolumeOnClick = (eventId) => {
        //input elements '.value' is always a string; conver to number to add/minus 10
        if(eventId === 'drinkVolume-plus'){
            if(volume < 1500) setVolume(volume => Number(volume) + 10); 
        } else {
            if(volume > 0) setVolume(volume => Number(volume) - 10);
        }
    }

    const addDrinkOnClick = () => {
        const elementToReplace = homeData.slice(drinkSelectedIndex, drinkSelectedIndex + 1);
        //synchronous variable storing; prevent async 'fetchNutritionData' function using undefined variable
        const selectedIndex = drinkSelectedIndex; 

        if(drinkSelectedIndex || drinkSelectedIndex === 0){
            setHomeData([...homeData.filter(curr => curr !== elementToReplace[0]), {...drinkFound, volume: waterVolume}]);
            fetchNutritionData(elementToReplace[0].name, selectedIndex);
        } else {
            setHomeData([...homeData, {...drinkFound, volume: waterVolume}]);
            fetchNutritionData(drinkFound.name);
        }
        
        setDrinkSelectedName(undefined);
        setDrinkSelectedIndex(undefined);
    }

    const calcWaterVolume = (input) => {
        return (input * drinkFound.percentageWater).toFixed(2);
    }

    useEffect(() => {
        if(drinkSelectedName) setDrinkFound(allDrinks.find(curr => curr.name === drinkSelectedName));
    }, [drinkSelectedName])

    useEffect(() => {
        if(drinkSelectedIndex || drinkSelectedIndex === 0) setDrinkFound(homeData[drinkSelectedIndex]);
    }, [drinkSelectedIndex])

    useEffect(() => {
        volume === 0 ? setWaterVolume(0) : setWaterVolume(calcWaterVolume(volume));
    }, [volume])

    return (
        <div className='Page drinkVolume col' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${drinkFound ? drinkFound.background : tempBackground})`}}>
            {
                drinkFound ?
                <div className='drinkVolume__inner col'>
                    <div className='row'>
                        <img src={drinkFound.image} alt='drink-img' className='drink__img'/>

                        <h1>{drinkFound.name} is {drinkFound.percentageWater}% Water</h1>
                    </div>

                    <h1>{waterVolume}ml of water intake</h1>

                    <div className='drinkVolume__control row'>
                        <div className='drinkVolume__glass center'>
                            <img src={glassIcon} alt='glass-icon'/>

                            <h1>{volume}ml</h1>

                            <ProgressBar completed={Math.round((volume / 1500) * 100)} width='400px' height='340px' bgColor={drinkFound.color} 
                                baseBgColor='transparent' isLabelVisible={false} className='drinkVolume__glass-progress' transitionTimingFunction='linear'/>
                        </div>

                        <div className='drinkVolume__controller col'>
                            <button id='drinkVolume-plus' onClick={e => setVolumeOnClick(e.currentTarget.id)} style={{padding: '5px 7.5px'}} className='center'>
                                <img src={plusIcon} alt='plus-icon'/>
                            </button>

                            <input type='range' min='0' max='1500' step='10' value={volume} onChange={e => setVolume(e.target.value)} className='drinkVolume__slider slider-no-transform'/>

                            <button id='drinkVolume-minus' onClick={e => setVolumeOnClick(e.currentTarget.id)} style={{padding: '5px 7.5px'}} className='center'>
                                <img src={minusIcon} alt='minus-icon'/>
                            </button>
                        </div>
                    </div>

                    <Link to='/' exact='true' className='link' onClick={addDrinkOnClick}>Add Drink</Link>
                </div> :
                <h1 style={{margin: 'auto'}}>Finding Drink...</h1>
            }
        </div>
    )
}

export default DrinkVolume;