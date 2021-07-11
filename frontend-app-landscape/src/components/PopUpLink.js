import React,{useState,useContext,useRef,useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { BusinessCapabilities, LinkBusinessCapabilities, OpenPopup } from './Diagram';



 const PopUpLink =(props)=> {

  const {updateOpen} = useContext(OpenPopup)
  const {updateLink}=useContext(LinkBusinessCapabilities)
  
  const [state,setState] = useState({
      bandwidth:"",
      frequency:""

  })

  const stateRef = useRef();
  stateRef.current = state;


  function handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState({
      name: value  });
      updateLink(`${name}`, value)

  }

  function popUpClosed(){
    // setState({modelOpen: false});
    updateOpen('openLink',false)

    
  }

  
  return(
    <>
    <Popup
      open={props.openLink}
      onClose={popUpClosed}
      onSubmit={e => { e.preventDefault();}}
      // modal
      // nested
    >
        <div className="popup-contentL">
          
          <div className="menuLink">
          <h1>PLEASE SELECT </h1>
          <form onSubmit={e => { e.preventDefault(); }}>
          <fieldset class="fieldset1">
              Frequency: 
              <input style={{width: '75px'}}
                name="frequency"            type="number"  min="1" max="250"
                value={stateRef.current.frequency}
                onChange={handleInputChange}
            />
            </fieldset>
          </form>
          <form onSubmit={e => { e.preventDefault(); }}>
          <fieldset class="fieldset1">
              Bandwidth: 
              <input style={{width: '75px'}}
                name="bandwidth"            type="number" min="1" max="250"
                value={stateRef.current.bandwidth}
                onChange={handleInputChange}
            />
            </fieldset>
          </form>
          
          
      </div>
        </div>
      
    </Popup>
    </>
  );
 
};
  
export default PopUpLink;