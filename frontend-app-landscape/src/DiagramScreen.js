import Diagram from "./components/Diagram";
import NavTop from "./components/NavTop";
import Sidemenu from "./components/Sidemenu";
import './components/Diagram.css'
import SideMenuRight from "./components/SideMenuRight";
import React,{useState} from "react"



const DiagramScreen=()=> {

    const aCallback = () => {
        
        setName(myDiagram.model.toJson());
        myDiagram.isModified = false;
        console.log(name)
        
      };
    
      const [name, setName] = useState(null);
      const [myDiagram,setMyDiagram] = useState(null);

      function setDataInDiagram(data){
          setMyDiagram(data)
      }
    

    
    return (
        
       
        <div className="App">
        <div>
            <NavTop />
        </div>
        <div className="container">
        
       <Sidemenu />
       <Diagram myDiagram = {myDiagram} />
       <SideMenuRight />
       </div>
       </div>
      
    
  
    );
  }

  export default DiagramScreen;