import React, {useState} from 'react';
import styled from 'styled-components';


const SidebarR = styled.div`

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

  const SideSubMenuR = React.forwardRef((props, ref)=> {


    const [subNavR,setSubnavR] =  useState(false)

    const showSubnavR = () => setSubnavR(!subNavR)
    return (
        <>
        <SidebarR onClick = {()=>ref.current.update(props.item.title)} >
            <div class="sideR_content">
            <div>
                {props.item.icon}
                <SidebarLabelR >{props.item.title}</SidebarLabelR>
            </div>
            <div>
                {subNavR ? props.item.iconOpened:props.item.iconClosed}
            </div>
            </div>
        </SidebarR>
        </>
    );
});

export default SideSubMenuR;

