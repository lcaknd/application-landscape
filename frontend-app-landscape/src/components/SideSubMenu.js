import React, {useState,useRef,useContext,useEffect} from 'react';
import styled from 'styled-components';
import { SaveDiagram } from '../DiagramScreen';
import Palette from './Palette';

const Sidebar = styled.div`



&:hover {
    background: #737e7f;
    border-left: 4px solid #632ce4;
    cursor: pointer;
}
`;

  const SidebarLabel = styled.span `
  margin-left: 16px;
  `;

  const Items = styled.div `
  height: 100px;

  background: #FFFFFF
  `;

  const SideSubMenu = ({item}) => {

    

    const [subNav,setSubnav] =  useState(false)


    const showSubnav = () => setSubnav(!subNav)
    return (
        <>
        <Sidebar onClick = {showSubnav}>
            <div class="sideL_content">
            <div>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
            </div>
            <div>
                {subNav ? item.iconOpened:item.iconClosed}
            </div>
            </div>
        </Sidebar>
        
        {subNav ? <Palette title= {item.title} /> : null}
        

        </>
    );
};

export default SideSubMenu;