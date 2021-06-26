import React from 'react'
import styled from 'styled-components'
import { MenuItem_logo, MenuItem1, MenuItem2, MenuItem3 } from "./MenuItems"
import './Diagram.css'
import DarkMode from './DarkMode.js';
import './DarkMode.css';
import * as FiIcons  from "react-icons/fi";



import SideMenuRight from "./SideMenuRight";

import "./Diagram.css"

const Nav = styled.div`

`;

const NavTop =()=> {

    return (
        <>
        <Nav > 
            <div class="nav">
        <div>
        <h1 className="nbar-logo">{MenuItem_logo.map((item) => {
                            return(
                                    
                                    <a className={item.cName} href={item.url}>
                                    {item.icon}
                                    {/* {item.title} */}
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
                        {/* <div class="nbar">
                        {MenuItem3.map((item) => {
                            return(
                                    
                                    <a className={item.cName} href={item.url}>
                                    {item.icon}  {item.title} 
                                    </a>
                               
                            )
                        })}
                        </div> */}
                        
                       {/* <div>
                        <DarkMode/></div> */}
                       
                        </div>
                    
        </Nav>
        <div class="wrapR">
                        <SideMenuRight/></div>
        </>
    
    );

}

export default NavTop;