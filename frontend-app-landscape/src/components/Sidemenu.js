import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import styled from 'styled-components'
import SideSubMenu from './SideSubMenu.js';
import {SidemenuData} from './SidemenuData.js'
import Diagram from './Diagram.js';
import { MenuItem1, MenuItem2, MenuItem3, MenuItem4, MenuItem_logo } from "./MenuItems"
import './Diagram.css'
import {test} from './test.js'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import SideSubMenuR from './SideSubMenuR.js';
import DarkMode from './DarkMode.js';
import './DarkMode.css';




const SidebarNav = styled.nav`


display: flex; 
justify-content: center;
position: relative;
margin-top: -19px;
float: left;
z-index:3;
left: ${({ sidebar }) => (sidebar ? '0.5' : '-100%')};


// const Sidebar2Nav = styled.nav`
// background: #cfeef5;
// width: 230px;
// height: 100vh;
// position: fixed;
// // margin: 0 5px 0 1500px ;
// border-radius: 5px;
// display: flex-start; 
// justify-content: center;
// top: 85px;
// right: 5px;
// right: ${({ sidebarR }) => (sidebarR ? '0.5' : '100%')};
// ${'' /* transition: 350ms; */}
// ${'' /* z-index: 10; */}
// `;

const WholeDiv = styled.div`
float: right;

`;

const NavIcon = styled.div`
 
`;


const SidebarWrap = styled.div`
  width: 100%;
`;
const SidebarRWrap = styled.div`
  width: 100%;

`;





const Sidemenu =()=> {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

    // const [sidebarR, setSidebarR] = useState(false);

    

    return (
        <>
        <WholeDiv>
        
        <NavIcon>
          <div class="LIcon">
        {sidebar ? <AiIcons.AiOutlineClose onClick={showSidebar} /> :<FaIcons.FaBars onClick={showSidebar}/>}
        </div>
       </NavIcon>
     
        <SidebarNav sidebar={sidebar}>
          <div class="sideL">
        <SidebarWrap>
        
       
        {SidemenuData.map((item,index)=> {
            return <SideSubMenu item ={item} key = {index} />
        })}
        </SidebarWrap>
        </div>
        </SidebarNav>
        </WholeDiv>
        </>
    );
};

export default Sidemenu;
