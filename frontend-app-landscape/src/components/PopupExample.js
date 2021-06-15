import React,{useState,useContext,useRef,useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { BusinessCapabilities, OpenPopup } from './Diagram';
import './Try.css'

 const PopupExample =(props)=> {

  const {updateOpen} = useContext(OpenPopup)
  const {updateBusiness}=useContext(BusinessCapabilities)
  
  const [state,setState] = useState({
    frontend: null,
    backend: null,
    user: "",
    date: "",
    modelOpen:props.open,
    termination:"",
    license:"",
    version:"",
    creator:""

  })
  const [stateDepartment,setStateDepartment] = useState({departments:[]})
  const [stateServices,setStateServices] = useState({services:[]})
  


  const stateRef = useRef();
  stateRef.current = state;


  
  function handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({
      name: value  });
      updateBusiness(`${name}`, value)

  }

  

  function handleInputServices(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    
    if(value ===true){
      setStateServices({
        services: [
            ...stateServices.services,
            name
        ]
    })
      
      
    } else {
      var array = [...stateServices.services]; // make a separate copy of the array
  var index = array.indexOf(name)
  if (index !== -1) {
    array.splice(index, 1);
    setStateServices({services: array});
  }
    }
  
}

function handleInputDepartments(event){
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  
  
  if(value ===true){
    
    setStateDepartment({
      departments: [
          ...stateDepartment.departments,
          name
      ]
  })
    
  } else {
    var array = [...stateDepartment.departments]; // make a separate copy of the array
var index = array.indexOf(name)
if (index !== -1) {
  array.splice(index, 1);
  setStateDepartment({departments: array});
}
  }

}

  function popUpClosed(){
    // setState({modelOpen: false});
    updateOpen('open',false)
    
    updateBusiness('services', stateServices.services)  
    updateBusiness('departments',stateDepartment.departments)
    
  }

  
  return(
    <>
    <Popup
      open={props.open}
      onClose={popUpClosed}
      // modal
      // nested
    >
        <div className="popup-content">
          <div className="header"> Modal Title </div>
          <div className="menu">
          <form>
            <label>
              Frontend:
              <input
                name="frontend" type="checkbox"
                checked={stateRef.current.frontend}
                onChange={handleInputChange}
              />
            </label>
          </form>
          <form>
          <label>
              Backend:
              <input
                name="backend"            type="checkbox"
                checked={stateRef.current.backend}
                onChange={handleInputChange}
            />
            </label>
          </form>
          <form>
          <label>
              Number of users: 
              <input style={{width: '75px'}}
                name="user"            type="text"
                value={stateRef.current.user}
                onChange={handleInputChange}
            />
            </label>
          </form>
          <form>
          <label>
              Creator:
              <input style={{width: '75px'}}
                name="creator" type="text"
                value={stateRef.current.creator}
                onChange={handleInputChange}
            />
            </label>
          </form>
          <form>
            <label>
              Date of creation:
              <input
              name="date" type="Date"
              value={stateRef.current.date}
              onChange={handleInputChange}
              />
              
            </label>
          </form>
          <form>
            <label>
              Date of termination:
              <input
              name="termination" type="Date"
              value={stateRef.current.termination}
              onChange={handleInputChange}
              />
              
            </label>
          </form>
          <form>
            <label>
              License:
              <select name="license" id="license" value= {stateRef.current.license} onChange={handleInputChange}>
              <option value="Apache 2.0">Apache 2.0</option>
              <option value="Open Source">Open Source</option>
              <option value="BSD-4">BSD-4</option>
              <option value="AWS002">AWS002</option>
              </select>
            </label>
          </form>
          <form>
            <label>
              Version:
              <select name="version" id="version" value= {stateRef.current.version} onChange={handleInputChange}>
              <option value="10.1">10.1</option>
              <option value="3.1">3.1</option>
              <option value="1.5">1.5</option>
              <option value="5.0">5.0</option>
              </select>
            </label>
          </form>
          <form method="post" onChange={handleInputServices} >
            <fieldset><legend>Services</legend>
              <label> Data
              <input name="Data" type="checkbox" id="version" value= "data"/>
              </label>
              <label>Security
              <input name="Security" type="checkbox" id="version" value= "security"/>
              </label>
              <label>Web
              <input name="Web" type="checkbox" id="version" value= "web"/>
              </label>
              <label>Mobile
              <input name="Mobile" type="checkbox" id="version" value= "mobile"/>
              </label>
              <label>Networking
              <input name="Networking" type="checkbox" id="version" value= "networking"/>
              </label>
              <label>Could
              <input name="Cloud" type="checkbox" id="version" value= "cloud"/>
              </label>
              <label>Machine Learning
              <input name="MachineLearning" type="checkbox" id="version" value= "machineLearning"/>
              </label>
              <label>Google Cloud
              <input name="GoogleCloud" type="checkbox" id="version" value= "googleCloud"/>
              </label>
              <label>IoT
              <input name="IoT" type="checkbox" id="version" value= "IoT"/>
              </label>
              </fieldset>
          </form>
          <form method="post" onChange={handleInputDepartments}>
            <fieldset><legend>Departments</legend>
              <label> Finance
              <input name="Finance" type="checkbox"  value= "finance"/>
              </label>
              <label>HR
              <input name="HR" type="checkbox"value= "hr"/>
              </label>
              <label>Testing
              <input name="Testing" type="checkbox"  value= "testing"/>
              </label>
              <label>Development
              <input name="Development" type="checkbox" value= "development"/>
              </label>
              <label>Sales
              <input name="Sales" type="checkbox" value= "sales"/>
              </label>
              <label>Research
              <input name="Research" type="checkbox"  value= "research"/>
              </label>
              <label>Operations
              <input name="Operations" type="checkbox"  value= "operations"/>
              </label>
              <label> Customer Support
              <input name="CustomerSupport" type="checkbox"  value= "customerSupport"/>
              </label>
              <label>App
              <input name="App" type="checkbox"  value= "app"/>
              </label>


              </fieldset>
          </form>
      </div>
        </div>
      
    </Popup>
    </>
  );
 
};
  
export default PopupExample;