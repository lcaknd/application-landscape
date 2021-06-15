import React from 'react'
import styled from 'styled-components'
import { MenuItem_logo, MenuItem1, MenuItem2, MenuItem3 } from "./MenuItems"
import './Diagram.css'
import DarkMode from './DarkMode.js';
import './DarkMode.css';
import * as FiIcons  from "react-icons/fi";

const Nav = styled.div`
background: #cfeef5;
height: 80px;
width:100vw;
display: flex;
position: relative;
${'' /* justify-content: flex-start; */}
align-items: center;
border-radius: 5px;
margin-left: 5px;
${'' /* right: 5px; */}
`;

const NavTop =()=> {

    return (
        <>
        <Nav > 
        <div>
        <h1 className="nbar-logo">{MenuItem_logo.map((item) => {
                            return(
                                    
                                    <a className={item.cName} href={item.url}>
                                    {item.icon}{item.title} 
                                    </a>
                               
                            )
                        })}</h1>
                        </div>
        
          <div class="nbar">
              
                        {MenuItem1.map((item) => {
                            
                            return(
                                    
                                    <a  className={item.cName} href={item.url}>
                                    {item.icon}  {item.title} 
                                    </a>
                               
                            )
                        
                        })}
                        
                        </div>
                        
                        <div class="nbar">
                        {MenuItem2.map((item) => {
                            return(
                                    
                                    <a className={item.cName} href={item.url}>
                                    {item.icon}  {item.title} 
                                    </a>
                               
                            )
                        })}
                        </div>
                        <div class="nbar">
                        {MenuItem3.map((item) => {
                            return(
                                    
                                    <a className={item.cName} href={item.url}>
                                    {item.icon}  {item.title} 
                                    </a>
                               
                            )
                        })}
                        </div>
                        
                        <div class="darkModeIcon">
                        <div class="sun">
                        <FiIcons.FiSun />
                        </div>
                        <div class="moon">
                        <FiIcons.FiMoon />
                        </div>
                        </div>
                        <DarkMode/>
                    
        </Nav>
        </>
    
    );

}

export default NavTop;