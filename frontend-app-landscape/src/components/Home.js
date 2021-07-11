import React from "react";
import styled from 'styled-components'

import {MenuItem1, MenuItem2, MenuItem3, MenuItem_logo } from "./MenuItems"
import DarkMode from './DarkMode.js';
import './DarkMode.css';
import * as FiIcons  from "react-icons/fi";
import * as AiIcons from 'react-icons/ai'
// import '../node_modules/react-profile-card/dist/profileui.css'
import  IMG1 from '../Team/BK.JPG';
import  IMG2 from '../Team/AM.jpg';
import  IMG3 from '../Team/HM.jpg';
import  IMG4 from '../Team/MS.jpg';
import  IMG5 from '../Team/MP.png';
import './Team.css';
import IMG6 from './HomePic/1.png'
import IMG7 from './HomePic/2.png'
import  GIFT from '../GIF/Tutorial.gif'
import  GIFL from '../GIF/Landscape.gif'



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
          <img  class="HomePic1" src={IMG6} alt="loading..."/>
         <div class="DevCon">
         <h1 class="home">This tool is provided by Burak Kocabas, Magdalena Pękacka, Mohammad Speen, Arslan Muneeb, Huzeifa Marzouka </h1>
         <h1 class="home">To start or continue working on the landscape</h1>
         <a href="landscape"><img  class="picL" src={GIFL} alt="loading..."/> </a>
         <h1 class="home">You are new here? Then check our <AiIcons.AiOutlineArrowRight/> <a href="tutorial"><img  class="picT" src={GIFT} alt="loading..."/></a>  </h1>
         <img  class="HomePic2" src={IMG7} alt="loading..."/>
         <h1 class="home">For further Information, contact us at</h1>
         
         </div>
         {/* <div class="icon">
         <AiIcons.AiOutlineArrowDown/>
         </div> */}
         <h1 class="home"> <a href="joke">thisemaildoesnotexist@justaproject.com</a></h1>
         
         

         
<h1 class="home" >Our Team</h1>        
<div class="containerT">
    
    <div class="card-wrapper">
      
      <div class="card">
        
        <div class="card-image">
          <img class="team-pic" src={IMG1} alt="profile one"></img>
        </div>

     

      <div class="details">
        <h2 class="t-name">Burak Kocabas</h2>
         
      </div>
    </div>
  </div>
  
    
    

     
 </div>

 <div class="containerT">
    
    <div class="card-wrapper">
      
      <div class="card">
        
        <div class="card-image">
          <img class="team-pic" src={IMG2} alt="profile one"></img>
        </div>

     

      <div class="details">
        <h2 class="t-name">Arslan Muneeb</h2>
          
      </div>
    </div>
  </div>
  </div>

  <div class="containerT">
    
    <div class="card-wrapper">
      
      <div class="card">
        
        <div class="card-image">
          <img class="team-pic" src={IMG3} alt="profile one"></img>
        </div>

     

      <div class="details">
        <h2 class="t-name">Huzeifa Marzouka</h2>
          
      </div>
    </div>
  </div>
  </div>

  <div class="containerT">
    
    <div class="card-wrapper">
      
      <div class="card">
        
        <div class="card-image">
          <img class="team-pic" src={IMG4} alt="profile one"></img>
        </div>

     

      <div class="details">
        <h2 class="t-name">Mohammad Speen</h2>
          
      </div>
    </div>
  </div>
  </div>

  <div class="containerT">
    
    <div class="card-wrapper">
      
      <div class="card">
        
        <div class="card-image">
          <img class="team-pic" src={IMG5} alt="profile one"></img>
        </div>

     

      <div class="details">
        <h2 class="t-name">Magdalena Pękacka</h2>
      </div>
    </div>
  </div>
  </div>
  
         
        </>
    );
};

export default navbar;