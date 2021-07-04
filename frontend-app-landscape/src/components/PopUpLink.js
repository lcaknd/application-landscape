import React,{useState,useContext,useRef,useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { BusinessCapabilities, LinkBusinessCapabilities, OpenPopup } from './Diagram';
import './Try.css'

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
        <div className="popup-content">
          <div className="header"> Modal Title </div>
          <div className="menu">
         
          <form onSubmit={e => { e.preventDefault(); }}>
          <label>
              Frequency: 
              <input style={{width: '75px'}}
                name="frequency"            type="number"  min="1" max="250"
                value={stateRef.current.frequency}
                onChange={handleInputChange}
            />
            </label>
          </form>
          <form onSubmit={e => { e.preventDefault(); }}>
          <label>
              Bandwidth: 
              <input style={{width: '75px'}}
                name="bandwidth"            type="number" min="1" max="250"
                value={stateRef.current.bandwidth}
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
  
export default PopUpLink;