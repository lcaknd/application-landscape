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

import DiagramScreen from './DiagramScreen';



function App() {


  return (
     
    <div className="App">
     <DiagramScreen />
    </div>
  
  );
}

export default App;