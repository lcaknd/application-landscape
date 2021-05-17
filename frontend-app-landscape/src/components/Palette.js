import React from 'react'
import * as go from 'gojs';
import {  ReactPalette } from 'gojs-react';
import "./Diagram.css"
import paletteAllShapes from './PaletteAllShapes';
import paletteOvalShapes from './PaletteOvalShapes';
import paletteQuadrangle from './PaletteQuadrangle';
import paletteGroups from './PaletteGroups';


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
    const myDiagram = window.initDiagram()
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
          { category: "RoundedRectangle", text: "RoundedRectangle" },
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



const Palette =(props)=>{

    const shapeType = (name) => {
    
    switch (name) {
      case 'All Shapes':
        return paletteAllShapes
      case 'Oval Shapes':
        return paletteOvalShapes
      case 'Quadrangle':
        return paletteQuadrangle
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
