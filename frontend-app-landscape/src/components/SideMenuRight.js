import React, {useState,useContext} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import styled from 'styled-components'
import './Diagram.css'
import SideSubMenuR from './SideSubMenuR.js';
import { test } from './test'
import { DataContext, SaveDiagram } from '../DiagramScreen'
import swal from "sweetalert";
import PopupExample from './PopupExample'
import Diagram from './Diagram';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'




const Sidebar2Nav = styled.nav`
background: #cfeef5;
width: 265px;
position: relative;
display: flex; 
justify-content: center;
display: ${({ sidebarR }) => (sidebarR ? 'flex' : 'none')};
`;

const NavRIcon = styled.div`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;


const SidebarRWrap = styled.div`
  width: 100%;
`;
const WholeDiv = styled.div`
float: left;

`;
const Box = styled.div`
display: flex;
background:#cfeef5;
width:265px;
`;

const SideMenuRight =(props)=> {
 

  const {updateName} = useContext(DataContext)
  const {updateSaved} = useContext(SaveDiagram);
  


  const [sidebarR, setSidebarR] = useState(false);

  const showSidebarR = () => setSidebarR(!sidebarR);

  const update=(name)=>{
    

    switch(name){
      case "Create Diagram":
        swal({
          text: 'Please create the name of diagram!',
          content: "input",
          button: {
            text: "OK!",
            closeModal: false,
          },
        })
          .then(name => {
            updateName('nameOfDiagram',name)
            swal.stopLoading();
            swal.close();
            
            
          })
          break;
          case "Save":
           
            console.log("save pressed")
            
            updateSaved('saved', true)
            
            break;
          case "Upload":
              console.log("upload")
              break;
          case "Filter":
            Swal.fire({
              title: 'Filter',
              html: '<h3>Front end <input type="checkbox" id="frontend"  /></h3><p/>' +
                '<h3>Back end <input type="checkbox" id="backend"  /></h3>'+ '<h3>Users <input type="number" id="user"  /></h3><p/>' + '<h3>Date of creation <input type="date" id="date"  /></h3><p/>',
                stopKeydownPropagation: false,
                preConfirm: () => {
                  
                  var frontend = Swal.getPopup().querySelector('#frontend').checked
                  var backend = Swal.getPopup().querySelector('#backend').checked
                  var user = Swal.getPopup().querySelector('#user').value
                  var date = Swal.getPopup().querySelector('#date').value
                  console.log("Frontend = " + frontend + " Backend = "+ backend + " User = "+ user + " Date = "+ date)
      
      
                  return {frontend: frontend, backend: backend, user: user, date: date}
                }
              }).then((result) => {
                Swal.fire("Frontend: "+`${result.value.frontend}`+" and Backend: "+`${result.value.backend}` +" and Number of User: "+`${result.value.user}` +" and Date of creation: "+`${result.value.date}`);
              })
              
             
            
            
            

         
              break;

    }

    
    }

    const buttonRef = React.useRef({ update: (e) => update(e) });



    

    return (
        <>
        <WholeDiv>
        <Box>
        <NavRIcon>
     {sidebarR ? <AiIcons.AiOutlineClose onClick={showSidebarR} /> :<FaIcons.FaCodeBranch onClick={showSidebarR}/>}
     </NavRIcon>
     </Box>
        <Sidebar2Nav sidebarR={sidebarR}>
        <SidebarRWrap>
        {test.map((item,index)=> {
            return <SideSubMenuR ref= {buttonRef} item ={item} key = {index} />
        })} 
        <div id="myInspector"></div>
        </SidebarRWrap>
        </Sidebar2Nav>
        </WholeDiv>
       
   
        </>
    );
};

export default SideMenuRight;