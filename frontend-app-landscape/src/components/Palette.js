import React,{useContext,useRef,useEffect} from 'react'
import * as go from 'gojs';
import {  ReactPalette } from 'gojs-react';
import "./Diagram.css"
import paletteAllShapes from './PaletteAllShapes';
import paletteGroups from './PaletteGroups';
import { SaveDiagram } from '../DiagramScreen';






const Palette =(props)=>{

  window.initPalette = function(){

    function animateFadeDown(e) {
        var diagram = e.diagram;
        var animation = new go.Animation();
        animation.isViewportUnconstrained = false;
        animation.easing = go.Animation.EaseOutExpo;
        animation.duration = 1000;
        
        animation.add(diagram, 'position', diagram.position.copy().offset(0, 200), diagram.position);
        animation.add(diagram, 'opacity', 0, 1);
        animation.start();
      }
    
    const $ = go.GraphObject.make;
    const myDiagram = fieldRef.current
    const myPalette =
    $(go.Palette,  
      {
        "animationManager.initialAnimationStyle": go.AnimationManager.AnimateLocations,
        "InitialAnimationStarting": animateFadeDown, 

        nodeTemplateMap: myDiagram.nodeTemplateMap,
        groupTemplateMap: myDiagram.groupTemplateMap,
        allowDelete: false,
        allowZoom: false,  
        model: new go.GraphLinksModel([ 
          { category: "MicroformProcessing", text: "Start", },
          { text: "Step",category:"FivePointedStar" },
          { category: "Conditional", text: "???" },
          { category: "Comment", text: "Comment" },
          { category: "", text: "RoundedRectangle" },
          { category: "Hexagon", text: "Hexagon" },
          { category: "DataStorage", text: "DataStorage" },
          { category: "DiskStorage", text: "DiskStorage" },
          { category: "ExternalOrganization", text: "ExternalOrganization" },
          { category: "ExternalProcess", text: "ExternalProcess"},
          { category: "MicroformProcessing", text: "MicroformProcessing"},
          { category: "Ellipse", text: "Ellipse"},
          { category: "Circle", text: "Circle"},
          { category: "Diamond", text: "Diamond"},
          { isGroup: true, text: "H Group", horiz: true },
          { isGroup: true, text: "V Group", horiz: false }


        ])
      });
    return myPalette;
}

  const {saved} = useContext(SaveDiagram)
    
    const [field,setField] = React.useState(saved.myDiagram)
    const fieldRef = useRef();
    fieldRef.current = field;


    useEffect(() => {
      setField(saved.myDiagram)
      
      
  }, [saved.myDiagram])


    const shapeType = (name) => {
    
    switch (name) {
      case 'All Shapes':
        return paletteAllShapes
      case 'Groups':
        return paletteGroups;
      default: 
        return []
    }

  };

    return(
        <>
        <ReactPalette
        initPalette={window.initPalette}
        divClassName='myPaletteDiv'
        nodeDataArray={shapeType(props.title)}
        />
        </>

    );
}

export default Palette;
