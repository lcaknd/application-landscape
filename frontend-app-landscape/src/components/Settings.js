import React from "react";
import styled from 'styled-components'
import {MenuItem1, MenuItem2, MenuItem3, MenuItem4, MenuItem_logo } from "./MenuItems"
import DarkMode from './DarkMode.js';
import './DarkMode.css';
import * as FiIcons  from "react-icons/fi";

const Nav = styled.div`
background: #cfeef5;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
border-radius: 5px;
`;

const navbar =()=> {
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
                        <div class="nbar">
                        {MenuItem4.map((item) => {
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
        <h1>This is Settings</h1>
        <h1>As you can see, it's still just an empty page :D</h1>
        </>
    );
};

export default navbar;