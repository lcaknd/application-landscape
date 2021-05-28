import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/theme';
import { GlobalStyles } from './components/global';
import styled from 'styled-components'
import {MenuItem1, MenuItem2, MenuItem3, MenuItem4,MenuItem_logo } from "./MenuItems"
import DarkMode from './DarkMode.js';
import './DarkMode.css';
import * as FiIcons  from "react-icons/fi";

const Nav = styled.div`;

 `;



const navbar =()=> {
    return (
        <>
        
        <Nav > 
        <div class="nav">
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
                        </div>     
        </Nav>
        
        
        <h1>This is Home. </h1>
         <h1><a href="landscape">Click here </a>to start or continue working on the landscape.</h1>
         <h1>Go to <a href="settings">Settings</a> or check out <a href="filter">Filter</a>.</h1>
         
         
         
        </>
    );
};

export default navbar;