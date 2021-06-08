import Diagram from "./components/Diagram";
import NavTop from "./components/NavTop";
import Sidemenu from "./components/Sidemenu";
import './components/Diagram.css'
import SideMenuRight from "./components/SideMenuRight";
import React,{createContext,useState,useEffect} from "react"

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
    setSaved: () =>{}
})

const DiagramScreen= React.memo(()=> {

    const [nameOfDiagram,setNameOfDiagram] = useState('null')
    const [saved,setSaved] = useState(false)
    const [NameOfDiagram,getNameOfDiagram] = useState('null')

    const updateName = (property, value) =>
    setNameOfDiagram(prevInfo => ({ ...prevInfo, [property]: value }));

    const getName = (property, value) =>
    getNameOfDiagram(prevInfo => ({ ...prevInfo, [property]: value }))
    

    const updateSaved = (property, value) =>
    setSaved(prevInfo => ({ ...prevInfo, [property]: value }));


    useEffect(()=>{
        console.log(nameOfDiagram)
        console.log(saved)
        console.log(NameOfDiagram)
    });

    

//     function updateDataBusinessCapabilities(data){
//         setDataBusinessCapabilities(data)
//     }
//     function updateLinks(data){
//         setLinks(data)
//     }
//    ;

    return (
         
        <SaveDiagram.Provider value = {{saved, updateSaved, NameOfDiagram, getName}}>
        <DataContext.Provider value= {{nameOfDiagram,updateName}}>
        
        <div id='diagram' className="App">
        <div>
            <NavTop />
        </div>
        <div className="container">
        
       <Sidemenu  />
       <Diagram nameOfDiagram={nameOfDiagram}/>
       <SideMenuRight />
       </div>
       </div>
       
       </DataContext.Provider>
       </SaveDiagram.Provider>
       
       
      
    
  
    );
  });

  export default DiagramScreen;