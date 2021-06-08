import React,{useState,useContext,useRef} from 'react';
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
    user: 0,
    date: "",
    modelOpen:props.open
  })
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

  function popUpClosed(){
    // setState({modelOpen: false});
    updateOpen('open',false)
    console.log(state.modelOpen)
  }

  var person = {Frontend: state.frontend, Backend: state.backend,
    User: state.user, Date: state.date,Open: state.modelOpen}
    console.log(person);

  
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
                name="user"            type="number"
                value={stateRef.current.user}
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
      </div>
        </div>
      
    </Popup>
    </>
  );
 
};
  
export default PopupExample;