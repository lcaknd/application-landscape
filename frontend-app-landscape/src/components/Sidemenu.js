import React from 'react'
import { FaIcons } from 'react-icons/fa';
import styled from 'styled-components'
import SideSubMenu from './SideSubMenu.js';
import {SidemenuData} from './SidemenuData.js'


const Nav = styled.div`
background: #acb3b4;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #acb3b4;
width: 250px;
height: 100vh;
`;


const Sidemenu =()=> {
    return (
        <>
        <Nav> 
        </Nav>
        <SidebarNav>
        {SidemenuData.map((item,index)=> {
            return <SideSubMenu item ={item} key = {index} />
        })}
        </SidebarNav>
        </>
    );
};

export default Sidemenu;
