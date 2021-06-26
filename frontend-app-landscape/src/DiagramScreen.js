import Diagram from "./components/Diagram";
import NavTop from "./components/NavTop";
import Sidemenu from "./components/Sidemenu";
import './components/Diagram.css'
import SideMenuRight from "./components/SideMenuRight";
import React,{createContext,useState,useEffect,useRef} from "react"
import "./components/Diagram.css"

export const DataContext = createContext({
    nameOfDiagram: 'null',
    
    // dataBusinessCapabilities: null,
    // links: null,
    setNameOfDiagram:() => {},
    getNameOfDiagram:() => {},
    // setDataBusinessCapabilities:()=>{},
    // setLinks:()=>{}
});

export const SaveDiagram = createContext({
    saved: false,
    upload: false,
    setSaved: () =>{}
})



const DiagramScreen= ()=> {

    const [nameOfDiagram,setNameOfDiagram] = useState(null)
    const [saved,setSaved] = useState(false)
    const [diagram,setDiagram]=useState([{key:1, text: 'Madzia',loc:"124 125",category:"Hexagon" ,fill: "#C0D7E9"},{key:3, text: 'Hello3',loc:"124 200",category:"Database" ,fill: "#C0D7E9"}])
 

    const updateName = (property, value) =>
    setNameOfDiagram(prevInfo => ({ ...prevInfo, [property]: value }));

    
    

    const updateSaved = (property, value) =>
    setSaved(prevInfo => ({ ...prevInfo, [property]: value }));

    


    useEffect(()=>{
        console.log(nameOfDiagram)
        console.log(saved.upload)
    

    }, [nameOfDiagram]);

    

//     function updateDataBusinessCapabilities(data){
//         setDataBusinessCapabilities(data)
//     }
//     function updateLinks(data){
//         setLinks(data)
//     }
//    ;

    return (
       
        <SaveDiagram.Provider value = {{saved, updateSaved}}>
        <DataContext.Provider value= {{nameOfDiagram,updateName}}>
        
        <div id='diagram' className="App">
        <div>
            <NavTop />
        </div>
        <div className="container">
        
       <Sidemenu  />
       {/* <SideMenuRight/> */}
        <Diagram nameOfDiagram={nameOfDiagram} diagram={diagram}/>
       
       </div>
       </div>
       
       </DataContext.Provider>
       </SaveDiagram.Provider>
      
       
       
      
    
  
    );
  };

  export default DiagramScreen;