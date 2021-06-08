import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import styled from 'styled-components'
import SideSubMenu from './SideSubMenu.js';
import {SidemenuData} from './SidemenuData.js'
import './Diagram.css'
import {test} from './test.js'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import SideSubMenuR from './SideSubMenuR.js';
import PopupExample from './PopupExample'

const Nav = styled.div`
background: #cfeef5;
height: 80px;
width:100%;
display: flex;
position: relative;
align-items: center;
border-radius: 5px;
margin-left: 5px;
`;

const SidebarNav = styled.nav`
background: #cfeef5;
width: 280px;
display: flex; 
justify-content: center;
position: relative;
margin-top: 0px;
float: left;
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
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;


const SidebarWrap = styled.div`
  width: 100%;
`;
const SidebarRWrap = styled.div`
  width: 100%;

`;


const Box = styled.div`
background:#cfeef5;
width:100%
`;


const Sidemenu =()=> {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

    const [sidebarR, setSidebarR] = useState(false);

    const showSidebarR = () => setSidebarR(!sidebarR);

    return (
        <>
        <WholeDiv>
        <Box>
        <NavIcon>
        {sidebar ? <AiIcons.AiOutlineClose onClick={showSidebar} /> :<FaIcons.FaBars onClick={showSidebar}/>}
       </NavIcon>
     </Box>
        <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
       
        {SidemenuData.map((item,index)=> {
            return <SideSubMenu item ={item} key = {index} />
        })}
        </SidebarWrap>
        </SidebarNav>
        </WholeDiv>
        </>
    );
};

export default Sidemenu;