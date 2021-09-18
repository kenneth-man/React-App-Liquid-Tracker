import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [date, setDate] = useState('');
    const [currentVolume, setCurrentVolume] = useState(0);
    const [targetVolume, setTargetVolume] = useState(2000);
    const [percentComplete, setPercentComplete] = useState(0);
    const [drinkSelectedName, setDrinkSelectedName] = useState(undefined);
    const [drinkSelectedIndex, setDrinkSelectedIndex] = useState(undefined);
    const [homeData, setHomeData] = useState([]);
    const [nutritionData, setNuritionData] = useState([]);
    const [settingsData, setSettingsData] = useState(Array(6).fill('Choose')); //['Male', 21, 60, 175, 'Active', 'Temperate']
    const [settingsModalType, setSettingsModalType] = useState(undefined);
    const [isSettingsModalShown, setIsSettingsModalShown] = useState(false);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const key = '9c57e33addd44a2f8a0a1ed1bd940a78';

    const fetchNutritionData = async (query, selectedIndex = false) => {
        try {
            const basicDataResponse = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&number=1&apiKey=${key}`);
            const basicData = await basicDataResponse.json();
          
            const detailedDataResponse = await fetch(`https://api.spoonacular.com/food/ingredients/${basicData.results[0].id}/information?amount=100&unit=grams&apiKey=${key}`);
            const detailedData = await detailedDataResponse.json();
            
            selectedIndex ?
            setNuritionData([...nutritionData.filter((curr,idx) => idx !== selectedIndex), detailedData.nutrition.nutrients]) :
            setNuritionData([...nutritionData, detailedData.nutrition.nutrients]);
        } catch(error){
            console.log(error);
        }
    }
    
    const calcOrdinals = (input) => {
        if(input === 1 || input === 21 || input === 31) return 'st';
        if(input === 2 || input === 22) return 'nd';
        if(input === 3 || input === 23) return 'rd';
        return 'th';
    }

    const calcPercentComplete = () => {
        const totalMl = homeData.reduce((acc, curr) => acc + Number(curr.volume), 0);
        setCurrentVolume(totalMl);
        setPercentComplete( Math.round(((totalMl / targetVolume) * 100)) );
    }

    const setCurrDate = () => {
        const currDate = new Date();
        const numberDay = currDate.getDate();
        const day = currDate.getDay();
        const month = currDate.getMonth();
        const year = currDate.getFullYear();
        const ordinal = calcOrdinals(numberDay);

        setDate(`${days[day]} ${numberDay}${ordinal} - ${months[month]} - ${year}`);
    }

    const toggleIsSettingsModalShown = () => setIsSettingsModalShown(!isSettingsModalShown);

    useEffect(() => setCurrDate(), [])

    useEffect(() => calcPercentComplete(), [currentVolume, targetVolume])

    useEffect(() => {
        if(homeData.length > 0) calcPercentComplete();
    }, [homeData])

    return (
        <Context.Provider value={{date, currentVolume, targetVolume, percentComplete, drinkSelectedName, drinkSelectedIndex, homeData, nutritionData, settingsData, settingsModalType, isSettingsModalShown,
                setCurrentVolume, setTargetVolume, setDrinkSelectedName, setDrinkSelectedIndex, setHomeData, fetchNutritionData, setSettingsData, setSettingsModalType, toggleIsSettingsModalShown}}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;