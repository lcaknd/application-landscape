import React, {useState} from 'react';
import styled from 'styled-components';
import Palette from './Palette';

const Sidebar = styled.div`
display: flex;
color: #000000;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
font-size: 18px;
height: 60px;
text-decoration: none;

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
            <div>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
            </div>
            <div>
                {subNav ? item.iconOpened:item.iconClosed}
            </div>
        </Sidebar>
        {subNav ? <Palette /> : null}
        </>
    );
};

export default SideSubMenu;