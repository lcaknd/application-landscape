import React from 'react'
import styled from 'styled-components'
import { MenuItem1, MenuItem2, MenuItem3 } from "./MenuItems"
import './Diagram.css'

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
    
    );

}

export default NavTop;