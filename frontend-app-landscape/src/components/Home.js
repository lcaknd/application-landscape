import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/theme';
import { GlobalStyles } from './components/global';
import styled from 'styled-components'
import {MenuItem1, MenuItem2, MenuItem3, MenuItem4, MenuItem5 } from "./MenuItems"

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
                        
                        <div class="nbar">
                        {MenuItem5.map((item) => {
                            return(     
                                <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                                <>
                                  <GlobalStyles />
                                  // Pass the toggle functionality to the button
                                  <button onClick={toggleTheme}>Toggle theme</button>
                                 
                                  <footer>
                                  </footer>
                                </>
                              </ThemeProvider>
                               
                               )
                            })}
                            </div>
        </Nav>
        <h1>This is Home</h1>
        </>
    );
};

export default navbar;