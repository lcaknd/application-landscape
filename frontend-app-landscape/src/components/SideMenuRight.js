import React, {useState,useContext} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import styled from 'styled-components'
import './Diagram.css'
import SideSubMenuR from './SideSubMenuR.js';
import { test } from './test'
import { Context } from '../DiagramScreen'



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

  const [sidebarR, setSidebarR] = useState(false);

  const showSidebarR = () => setSidebarR(!sidebarR);
    

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
            return <SideSubMenuR item ={item} key = {index} />
        })} 
        <div id="myInspector"></div>
        </SidebarRWrap>
        </Sidebar2Nav>
        </WholeDiv>
       
   
        </>
    );
};

export default SideMenuRight;