import './App.css';
import ContextProvider from './Context';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Nutrition from './Pages/Nutrition.js';
import Alarm from './Pages/Alarm.js';
import Settings from './Pages/Settings.js';
import DrinkSelection from './Pages/DrinkSelection.js';
import DrinkVolume from './Pages/DrinkVolume.js';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact={true} component={Home}/>

            <Route path='/Nutrition' exact={true} component={Nutrition}/>

            <Route path='/Alarm' exact={true} component={Alarm}/>

            <Route path='/Settings' exact={true} component={Settings}/>

            <Route path='/DrinkSelection' exact={true} component={DrinkSelection}/>

            <Route path='/DrinkVolume/:selected' exact={true} component={DrinkVolume}/>
          </Switch>
        
          <Navbar/>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;