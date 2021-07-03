import React from "react";
import styled from 'styled-components'
import {MenuItem1, MenuItem2, MenuItem3, MenuItem_logo } from "./MenuItems"
import DarkMode from './DarkMode.js';
import './DarkMode.css';
import * as FiIcons  from "react-icons/fi";
import * as AiIcons from 'react-icons/ai'
import  GIF1 from '../GIF/Node_connect.gif'
import  GIF2 from '../GIF/Change_text.gif'
import  GIF3 from '../GIF/Change_color.gif'



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
                                    {item.icon}
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
                        
                   
                        
                        <DarkMode/>
                        </div>     
        </Nav>
       
        <h1>Tutorials</h1>
        <div>
        <img src={GIF1} alt="loading..."/>
        <h2>Connecting a Node</h2>
        </div>
        <div><img src={GIF2} alt="loading..."/>
        <h2>Change the text of a node</h2></div>
        <div><img src={GIF3} alt="loading..."/>
        <h2>Change the color of a node</h2></div>
        
         
         
         
        </>
    );
};

export default navbar;