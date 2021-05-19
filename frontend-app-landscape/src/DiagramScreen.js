import Diagram from "./components/Diagram";
import NavTop from "./components/NavTop";
import Sidemenu from "./components/Sidemenu";
import './components/Diagram.css'
import SideMenuRight from "./components/SideMenuRight";






function DiagramScreen() {
    return (

        <div className="App">
        <div>
            <NavTop />
        </div>
        <div className="container">
       <Sidemenu />
       <Diagram />
       <SideMenuRight />
       </div>
       </div>
      
    
  
    );
  }

  export default DiagramScreen;