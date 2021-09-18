import React, { useContext } from 'react';
import { Context } from '../Context.js';
import SettingsTab from '../Components/SettingsTab.js';
import { settingsTabs } from '../AllSettingsTabs.js';
import settingsBackground from '../Res/settings-background.jpg';

const Settings = () => {
    const { settingsData, setSettingsData, settingsModalType, targetVolume, setTargetVolume, isSettingsModalShown, toggleIsSettingsModalShown } = useContext(Context);

    const settingsModalBtnOnClick = (input) => {
        const updatingObj = settingsTabs.find(curr => curr.label === settingsModalType);
        const updatingObjIndex = settingsTabs.indexOf(updatingObj);
        const chosenValueIndex = settingsModalType === 'Gender' || settingsModalType === 'Activity' || settingsModalType === 'Climate' ? updatingObj.values.indexOf(input) : updatingObj.values.indexOf(Number(input));
        const tempSettingsData = settingsData.map(curr => curr);

        tempSettingsData[updatingObjIndex] = input;
        setTargetVolume(targetVolume => targetVolume + updatingObj.waterFactor[chosenValueIndex])
        setSettingsData(tempSettingsData);
        toggleIsSettingsModalShown();
    }

    return (
        <div className='Page col settings' style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${settingsBackground})`}}>
            <div className='settings__cont settings__cont--generate col'>
                <h1>Generate your recommended daily water intake</h1>

                {
                    settingsData.map((curr, index) => 
                        <SettingsTab
                            key={index}
                            icon={settingsTabs[index].icon}
                            label={settingsTabs[index].label}
                            value={curr}
                            unit={settingsTabs[index].unit ? settingsTabs[index].unit : ''}
                        />
                    )
                }
            </div>

            <div className={isSettingsModalShown ? 'settingsModal center' : 'settingsModal center hidden'}>
                <div className='settingsModal__wrapper col'>
                    {
                        settingsModalType ? 
                        settingsTabs.find(curr => curr.label === settingsModalType).values.map((curr, index) => 
                            <button key={index} value={curr} onClick={e => settingsModalBtnOnClick(e.target.value)}>{curr}</button>
                        ) :
                        <h1>settingsModalType not initialized</h1>
                    }
                    
                    <button style={{color: 'red'}} onClick={toggleIsSettingsModalShown}>Cancel</button>
                </div>
            </div>

            <h1>- {'\u00A0'} Or {'\u00A0'} -</h1>

            <div className='settings__cont settings__cont--slider col'>
                <h1>Specify your recommended daily water intake</h1>

                <input type='range' min='1' max='5000' step='10' value={targetVolume} onChange={e => setTargetVolume(e.target.value)} className='settings__slider slider-no-transform'/>

                <h3>Target Volume is:{'\u00A0'}<span style={{fontWeight: '900'}}>{targetVolume}</span>ml</h3>
            </div>
        </div>
    )
}

export default Settings;