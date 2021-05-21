import React, {useState} from 'react';
import styled from 'styled-components';


const SidebarR = styled.div`
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

  const SidebarLabelR = styled.span `
  margin-left: 16px;
  `;

  const Items = styled.div `
  height: 100px;
  background: #FFFFFF
  `;

  const SideSubMenuR = ({item},props) => {

    const [subNavR,setSubnavR] =  useState(false)

    const showSubnavR = () => setSubnavR(!subNavR)
    return (
        <>
        <SidebarR onClick = {props.onClick}>
            <div>
                {item.icon}
                <SidebarLabelR>{item.title}</SidebarLabelR>
            </div>
            <div>
                {subNavR ? item.iconOpened:item.iconClosed}
            </div>
        </SidebarR>
        </>
    );
};

export default SideSubMenuR;
