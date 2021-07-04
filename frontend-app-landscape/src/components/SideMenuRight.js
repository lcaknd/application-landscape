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
import DarkMode from './DarkMode';
import './DarkMode.css'




const Sidebar2Nav = styled.nav`




display: ${({ sidebarR }) => (sidebarR ? 'flex' : 'none')};
`;

const NavRIcon = styled.div`
  margin-left: 2550px;
  margin-top:-65px;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
`;


const SidebarRWrap = styled.div`
  width: 100%;
  
`;
const WholeDiv = styled.div`
float: right;

`;


const SideMenuRight =(props)=> {


  const {updateName} = useContext(DataContext)
  const {updateSaved} = useContext(SaveDiagram);




  const [sidebarR, setSidebarR] = useState(false);

  const showSidebarR = () => setSidebarR(!sidebarR);

  const update=(name)=>{


    switch(name){
      case "DarkMode":
        <DarkMode/>
        break;
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

            updateSaved('saved', true)

            break;
          case "Upload":
            swal({
              text: 'Please type the name of diagram which you want to see!',
              content: "input",
              button: {
                text: "OK!",
                closeModal: false,
              },
            })
              .then(name => {
                updateName('nameOfDiagram',name)
                updateSaved('upload',true)
                swal.stopLoading();
                swal.close();


              })

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

              case "ForceDirectedLayout":
                updateSaved('layout',"ForceDirectedLayout")
                break;
              case "LayeredDiagramLayout":
                updateSaved('layout',"LayeredDiagramLayout")
              break;
              case "TreeLayout":
                updateSaved('layout',"TreeLayout")
              break;
             


    }


    }

    const buttonRef = React.useRef({ update: (e) => update(e) });





    return (
        <>
        <WholeDiv>

        <NavRIcon>
     {sidebarR ? <AiIcons.AiOutlineClose onClick={showSidebarR} /> :<FaIcons.FaCodeBranch onClick={showSidebarR}/>}
     </NavRIcon>

        <Sidebar2Nav sidebarR={sidebarR}>
          <div class="sideR">
        <SidebarRWrap>
        {test.map((item,index)=> {
            return <SideSubMenuR ref= {buttonRef} item ={item} key = {index} />
        })}
        <div id="myInspector"></div>
        </SidebarRWrap>
        </div>
        </Sidebar2Nav>
        </WholeDiv>


        </>
    );
};

export default SideMenuRight;