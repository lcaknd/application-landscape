import './App.css';
import Sidemenu from './components/Sidemenu';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import Settings from "./components/Settings";
import Filter from "./components/Filter";
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/theme';
import { GlobalStyles } from './components/global';
import React from 'react'
import DiagramScreen from './DiagramScreen';

import './components/DarkMode.css';


import DiagramScreen from './DiagramScreen';



function App() {


  return (
    <Router>
    <div className="App">
     
     <div className="content">
       <Switch>
       <Route exact path="/">
           <Home/>
           </Route>

           <Route exact path="/filter">
         <Filter/>
         </Route>

         <Route exact path="/landscape">
         <DiagramScreen/>
         </Route>
         
           
         <Route exact path="/settings">
         <Settings/>
         </Route>
         
       </Switch>
    
       </div>
    </div>
    </Router>
  );
}

export default App;