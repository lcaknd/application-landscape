import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import Joke from "./components/Joke"

import React from 'react'
import DiagramScreen from './DiagramScreen';

import './components/DarkMode.css';





function App() {
  return (
    <Router>
    <div className="App">
     
     <div className="content">
       <Switch>
       <Route exact path="/">
           <Home/>
           </Route>

           

         <Route exact path="/landscape">
         <DiagramScreen/>
         </Route>
         <Route exact path="/joke">
           <Joke/>
         </Route>
         
           
         
         
       </Switch>
    
       </div>
    </div>
    </Router>
  );
}

export default App;