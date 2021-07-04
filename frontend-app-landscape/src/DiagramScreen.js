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
    inspector: false,
    layout: "ForceDirectedLayout",
    myDiagram:null,
    setSaved: () =>{}
})



const DiagramScreen= ()=> {

    const [nameOfDiagram,setNameOfDiagram] = useState("")
    const [saved,setSaved] = useState({layout:"ForceDirectedLayout",myDiagram:null,saved:false,inspector:false,upload:false})
    
 

    const updateName = (property, value) =>
    setNameOfDiagram(prevInfo => ({ ...prevInfo, [property]: value }));

    
    

    const updateSaved = (property, value) =>
    setSaved(prevInfo => ({ ...prevInfo, [property]: value }));

    


    useEffect(()=>{
    
    console.log(saved.layout)

    }, [nameOfDiagram,saved]);

    

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
        <Diagram nameOfDiagram={nameOfDiagram} layout={saved.layout}/>
       
       </div>
       </div>
       
       </DataContext.Provider>
       </SaveDiagram.Provider>
      
       
       
      
    
  
    );
  };

  export default DiagramScreen;