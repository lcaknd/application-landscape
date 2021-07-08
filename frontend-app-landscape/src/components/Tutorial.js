import React from "react";
import styled from 'styled-components'
import {MenuItem1, MenuItem2, MenuItem3, MenuItem_logo } from "./MenuItems"
import DarkMode from './DarkMode.js';
import './DarkMode.css';
import * as FiIcons  from "react-icons/fi";
import * as AiIcons from 'react-icons/ai'
import  GIF1 from '../GIF/Drag_and_drop_light.gif'
import  GIF2 from '../GIF/Drag_and_drop_dark.gif'
import  GIF3 from '../GIF/Node_connect_light.gif'
import  GIF4 from '../GIF/Node_connect_dark.gif'
import  GIF5 from '../GIF/Grouping_light.gif'
import  GIF6 from '../GIF/Grouping_dark.gif'
import  GIF7 from '../GIF/Options_light.gif'
import  GIF8 from '../GIF/Options_dark.gif'
import  GIF9 from '../GIF/Change_text_light.gif'
import  GIF10 from '../GIF/Change_text_dark.gif'
import  GIF11 from '../GIF/Change_color_light.gif'
import  GIF12 from '../GIF/Change_color_dark.gif'










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
       <div class="Header">
        <h1 class="tutheader">Tutorials</h1>
        </div>
        <div class="DragDropNode">
            <img  class="pic1" src={GIF1} alt="loading..."/>
            <img  class="pic2" src={GIF2} alt="loading..."/>
        <h2 class="tutorial"><u>Drag and drop a node</u></h2>
        <h3 class="tutorial">Open the top left menu <br></br> choose a node<br></br> drag it to the diagram<br></br> and drop it</h3>
        </div>
        <div class="ConNode">
        
        <img  class="pic3" src={GIF3} alt="loading..."/>
        <img  class="pic4" src={GIF4} alt="loading..."/>
        
        <h2 class="tutorial"><u>Connecting a Node</u></h2>
        <h3 class="tutorial">To connect nodes <br></br>simply click on one of the edges<br></br> and drag the arrow to another node </h3>
        </div>
        <div class="GroupNode">
            <img  class="pic5" src={GIF5} alt="loading..."/>
            <img  class="pic6" src={GIF6} alt="loading..."/>
        <h2 class="tutorial"><u>Grouping nodes</u></h2>
        <h3 class="tutorial">Drag and drop one of the group boxes <br></br> put the nodes inside </h3>
        </div>

        <div class="TopRightOptions">
            <img  class="pic7" src={GIF7} alt="loading..."/>
            <img  class="pic8" src={GIF8} alt="loading..."/>
        <h2 class="tutorial"><u>Top right options</u></h2>
        <h3 class="tutorial">Top right menu includes:<br></br> -Darkmode/Lightmode switch<br></br> -save or upload a diagram<br></br> -create and name a diagram<br></br> - change the layout of the diagram</h3>
        </div>

        <div class="ChangeNode">
            <img class="pic9" src={GIF9} alt="loading..."/>
            <img class="pic10" src={GIF10} alt="loading..."/>
        <h2 class="tutorial"><u>Change the text of a node</u></h2>
        <h3 class="tutorial">Click on the node (which you want to change) <br></br>a new option in the top right menu appears<br></br>click on the box next to text<br></br> enter a new text</h3>
        </div>

        <div class="ColorNode">
            <img class="pic11" src={GIF11} alt="loading..."/>
            <img class="pic12" src={GIF12} alt="loading..."/>
        <h2 class="tutorial"><u>Change the color of a node</u></h2>
        <h3 class="tutorial">Click on the node (which you want to change) <br></br>a new option in the top right menu appears<br></br>click on the box next to fill<br></br>  change the color</h3>
        </div>

        

       

        
        
        
        
         
         
         
        </>
    );
};

export default navbar;