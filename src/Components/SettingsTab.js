import React, { useContext } from 'react';
import { Context } from '../Context.js';

const SettingsTab = ({ icon, label, value, unit }) => {
    const { setSettingsModalType, toggleIsSettingsModalShown } = useContext(Context);

    const settingsTabOnClick = (id) => {
        setSettingsModalType(id);
        toggleIsSettingsModalShown();
    }

    return (
        <div className='settingsTab row' id={label} onClick={e => settingsTabOnClick(e.currentTarget.id)}>
            <div className='settingsTab__wrapper center'>
                <img src={icon} alt='settings-tab-icon'/>
            </div>

            <div className='settingsTab__wrapper center'>
                <h2>{label}</h2>
            </div>

            <div className='settingsTab__wrapper center'>
                <h2>{value} {unit}</h2>
            </div>
        </div>
    )
}

export default SettingsTab;