import './App.css';
import Sidemenu from './components/Sidemenu';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import Settings from "./components/Settings";
import Filter from "./components/Filter";

import './components/DarkMode.css';

import Test from './components/test';



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
         <Sidemenu />
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