import React from "react";
import styled from 'styled-components'
import {MenuItem1, MenuItem2, MenuItem3, MenuItem_logo } from "./MenuItems"
import DarkMode from './DarkMode.js';
import './DarkMode.css';
import * as FiIcons  from "react-icons/fi";
import * as AiIcons from 'react-icons/ai'
import  IMG1 from '../Team/IMG_0752.JPG';
import  IMG2 from '../Team/IMG_0758.jpg';
import  IMG3 from '../Team/IMG_0762.JPG';
import  IMG4 from '../Team/IMG_8754.jpg';



const Nav = styled.div`;

 `;



const navbar =()=> {
    return (
        <>
        
      <Nav > 
            
        <div class="nav">
        {/* <div>
        <h1 className="nbar-logo">{MenuItem_logo.map((item) => {
                            return(
                                    
                                    <a className={item.cName} href={item.url}>
                                    {item.icon}
                                    </a>
                               
                            )
                        })}</h1>
                        </div> */}
        
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
                        
                   
                        
                        <DarkMode/>
                        </div>     
        </Nav>
       
        
        <div class="site_heading">
        <h1>Welcome to our Application Landscape</h1>
        </div>
        <h1>This tool is provided by Burak Kocabas, Magdalena Pękacka, Mohammad Speen, Arslan Muneeb, Huzeifa Marzouka </h1>
         <h1>To start or continue working on the landscape</h1>
         <button class="click"><a href="landscape">Click here </a></button>
         <h1>You are new here? Then check our <AiIcons.AiOutlineArrowRight/> <a href="tutorial">Tutorials</a>  </h1>
         <h1>For further Information, contact us at</h1>
         
         <div class="icon">
         <AiIcons.AiOutlineArrowDown/>
         </div>
         <h1> <a href="joke">thisemaildoesnotexist@justaproject.com</a></h1>
         <div class="Team">
         <img src={IMG1} alt="loading..."/>
         <img src={IMG2} alt="loading..."/>
         <img src={IMG3} alt="loading..."/>
         <img src={IMG4} alt="loading..."/>
         </div>
         
        
         
         
         
        </>
    );
};

export default navbar;