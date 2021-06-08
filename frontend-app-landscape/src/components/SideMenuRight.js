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
  const {getName} = useContext(SaveDiagram);


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
          case "Search":
            swal({
              
              closeOnClickOutside: false,
              title: 'Diagram Filter',
              text: 'Enter a name for a diagram',
              content : "input" ,
              buttons:[true,"Search!" ] 
               ,
            })
            .then(name => {
              getName('NameOfDiagram',name)
              swal.stopLoading();
            swal.close();
              if (!name) throw null;
              
              return fetch(`http://localhost:8080/api/diagram`);
            })
            .then(results => {
              return results.json();
            })
            .then(json => {
              const diagram = json.results[0];
             
              if (!diagram) {
                return swal("No diagram was found!");
              }
             
              const name = diagram.name;
              
             
              swal({
                title: "Diagram",
                text: name
                
              });
            })
            .catch(err => {
              if (err) {
                swal("Oh noes!", "The AJAX request failed!", "error");
              } else {
                swal.stopLoading();
                swal.close();
              }
            });

              console.log("Searching")
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