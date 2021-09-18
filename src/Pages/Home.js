import React, { useContext } from 'react';
import { Context } from '../Context.js';
import { Link } from 'react-router-dom';
import Drink from '../Components/Drink.js';
import ProgressBar from "@ramonak/react-progress-bar";
import AddIcon from '../Res/Icons/plus.svg';
import tempBackground from '../Res/Drinks/temp-background.png';

const Home = () => {
    const { date, currentVolume, targetVolume, percentComplete, homeData } = useContext(Context);

    return (
        <div className='Page col'>
            <div className='home__main col' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url(${tempBackground})`, backgroundPositionY: '100%'}}>
                <div className='home__border center'>
                    <h2>{date}</h2>
                </div>

                <h1>{currentVolume}ML of {targetVolume}ML</h1>

                <ProgressBar completed={percentComplete} width='600px' bgColor='rgb(37,174,244)' labelSize='18px' labelAlignment={percentComplete <= 10 ? 'left' : 'center'}/>

                <Link to='/DrinkSelection' exact='true' className='home__add link row'>
                    <img src={AddIcon} alt='add-icon'/>

                    Add drink
                </Link>
            </div>

            <div className='home__drinks row'>
                {
                    homeData.length > 0 ?
                    homeData.map((curr, index) =>
                        <Drink
                            key={index}
                            index={index}
                            name={curr.name}
                            image={curr.image} 
                            page='home'
                            volume={curr.volume}
                        />
                    ) : 
                    <h1 style={{margin: 'auto'}}>No Drinks Added...</h1>
                }
            </div>
        </div>
    )
}

export default Home;