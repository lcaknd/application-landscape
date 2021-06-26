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
import Joke from "./components/Joke"

import React from 'react'
import DiagramScreen from './DiagramScreen';

import './components/DarkMode.css';
{/* <html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
</head>
</html> */}


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