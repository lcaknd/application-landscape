import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import styled from 'styled-components'
import SideSubMenu from './SideSubMenu.js';
import {SidemenuData} from './SidemenuData.js'
import Diagram from './Diagram.js';
import { MenuItem1, MenuItem2, MenuItem3 } from "./MenuItems"
import './Diagram.css'



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
width: 230px;
margin-left: 5px;
display: flex; 
justify-content: center;
position: relative;
margin-top: 0px;
left: ${({ sidebar }) => (sidebar ? '0.5' : '-100%')};

`;
const WholeDiv = styled.div`
width: 100vw;
height: 100vh;
display: flex;

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

const Sidemenu =()=> {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <Nav >
        <NavIcon>
        {sidebar ? <AiIcons.AiOutlineClose onClick={showSidebar} /> :<FaIcons.FaBars onClick={showSidebar}/>}
         </NavIcon>
         <div class="nbar">
          
                        {MenuItem1.map((item) => {
                            return(
                                    
                                    <a className={item.cName} href={item.url}>
                                    {item.icon}{item.title} 
                                    </a>
                               
                            )
                        })}
                        </div>
                        <div class="nbar">
                        {MenuItem2.map((item) => {
                            return(
                                    
                                    <a className={item.cName} href={item.url}>
                                    {item.icon}{item.title} 
                                    </a>
                               
                            )
                        })}
                        </div>
                        <div class="nbar">
                        {MenuItem3.map((item) => {
                            return(
                                    
                                    <a className={item.cName} href={item.url}>
                                    {item.icon}{item.title} 
                                    </a>
                               
                            )
                        })}
                        </div>
                    
        </Nav>
        <WholeDiv>
        <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
        {SidemenuData.map((item,index)=> {
            return <SideSubMenu item ={item} key = {index} />
        })}
        </SidebarWrap>
        </SidebarNav>
        <Diagram></Diagram>
        </WholeDiv>
        
        
        </>
    );
};

export default Sidemenu;
