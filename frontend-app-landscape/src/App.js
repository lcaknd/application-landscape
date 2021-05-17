import './App.css';
import Sidemenu from './components/Sidemenu';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import Settings from "./components/Settings";
import Filter from "./components/Filter";
import React, { useState } from 'react';
import { lightTheme, darkTheme } from './components/theme';
import { GlobalStyles } from './components/global';



function App() {

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

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
         <Sidemenu />
         </Route>
         
           
         <Route exact path="/settings">
         <Settings/>
         </Route>
         

         <Route>
         <DarkMode/>
         <ThemeProvider theme={lightTheme}>
      <>
        <GlobalStyles />
        <button>Toggle theme</button>
        <footer>
        </footer>
      </>
    </ThemeProvider> 
    </Route>
       </Switch>
        
       </div>
    </div>
    </Router>
  );
}

export default App;