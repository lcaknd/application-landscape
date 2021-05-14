import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import styled from 'styled-components'
import SideSubMenu from './SideSubMenu.js';
import {SidemenuData} from './SidemenuData.js'
import Diagram from './Diagram.js';
import { MenuItem1, MenuItem2, MenuItem3 } from "./MenuItems"
import './Diagram.css'
import {test} from './test.js'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

const Nav2 = styled.div`

display: flex;
justify-content: flex-end;
`;


const Nav = styled.div`
background: #cfeef5;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
border-radius: 5px;
margin-left: 5px;
`;

const SidebarNav = styled.nav`
background: #cfeef5;
width: 250px;
height: 100vh;
margin: 5px;
border-radius: 5px;
display: flex;
justify-content: center;
position: fixed;
top: 80px;
left: ${({ sidebar }) => (sidebar ? '0.5' : '-100%')};
transition: 350ms;
z-index: 10;

`;

const Sidebar2Nav = styled.nav`
background: #cfeef5;
width: 200px;
height: 100vh;
margin: 5px;
`;

const WholeDiv = styled.div`
width: 100vw;
height: 100vh;
display: flex;
`;


const NavIcon = styled.div`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;


const Sidemenu =()=> {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <Nav >
        <NavIcon>
        {sidebar ? <AiIcons.AiOutlineClose onClick={showSidebar} /> :<FaIcons.FaBars onClick={showSidebar}/>}
         </NavIcon>
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
        <WholeDiv>
        <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
        {SidemenuData.map((item,index)=> {
            return <SideSubMenu item ={item} key = {index} />
        })}
        </SidebarWrap>
        </SidebarNav>
        <SketchExample></SketchExample>
        
        <Diagram></Diagram>
        <Sidebar2Nav>
        {test.map((item,index)=> {
            return <SideSubMenu item ={item} key = {index} />
        })} 
        </Sidebar2Nav>
        </WholeDiv>
        </>
    );
};

export default Sidemenu;
