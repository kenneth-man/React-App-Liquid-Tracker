import React from 'react';
import { NavLink } from 'react-router-dom';
//import the SVG file as a react component; set the SVG 'fill' value to 'current' and it will take the parent element 'fill' color
import { ReactComponent as HomeIcon } from '../Res/Icons/home.svg';
import { ReactComponent as NutritionIcon } from '../Res/Icons/tint.svg';
import { ReactComponent as AlarmIcon } from '../Res/Icons/bell.svg';
import { ReactComponent as SettingsIcon } from '../Res/Icons/cog.svg';

const Navbar = () => {
    return (
        <div className='navbar row'>
            <NavLink to='/' exact={true} activeClassName='navbarLink--active' className='navbarLink col'>
                <HomeIcon/>

                Home
            </NavLink>

            <NavLink to='/Nutrition' exact={true} activeClassName='navbarLink--active' className='navbarLink col'>
                <NutritionIcon/>

                Nutrition
            </NavLink>

            <NavLink to='/Alarm' exact={true} activeClassName='navbarLink--active' className='navbarLink col'>
                <AlarmIcon/>

                Alarm
            </NavLink>

            <NavLink to='/Settings' exact={true} activeClassName='navbarLink--active' className='navbarLink col'>
                <SettingsIcon/>

                Settings
            </NavLink>
        </div>
    )
}

export default Navbar;