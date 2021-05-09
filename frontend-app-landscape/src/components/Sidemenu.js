import React from 'react'
import { FaIcons } from 'react-icons/fa';
import styled from 'styled-components'
import SideSubMenu from './SideSubMenu.js';
import {SidemenuData} from './SidemenuData.js'
import Diagram from './Diagram.js';
import { MenuItem1, MenuItem2, MenuItem3 } from "./MenuItems"
import './Diagram.css'


const Nav = styled.div`
background: #cfeef5;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #cfeef5;
width: 250px;
height: 100vh;
margin: 5px;
`;
const WholeDiv = styled.div`
width: 100vw;
height: 100vh;
display: flex;

`;

const Sidemenu =()=> {
    return (
        <>
        <Nav > 
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
        <SidebarNav>
        {SidemenuData.map((item,index)=> {
            return <SideSubMenu item ={item} key = {index} />
        })} 
        </SidebarNav>
        <Diagram></Diagram>
        </WholeDiv>
        
        </>
    );
};

export default Sidemenu;
