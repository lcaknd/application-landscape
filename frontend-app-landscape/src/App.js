import './App.css';
import Sidemenu from './components/Sidemenu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <Router>
    <div className="App">
     <Sidemenu />
    </div>
    </Router>
  );
}

export default App;
