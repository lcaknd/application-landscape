import React from 'react'
import * as go from 'gojs';
import {  ReactPalette } from 'gojs-react';
import "./Diagram.css"


function initPalette(){

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
        allowDelete: false,
        allowZoom: false,  
        model: new go.GraphLinksModel([ 
          { category: "MicroformProcessing", text: "Start", },
          { text: "Step",category:"FivePointedStar" },
          { category: "Conditional", text: "???" },
          { category: "Comment", text: "Comment" },
          { category: "", text: "RoundedRectagle" },
          { category: "Hexagon", text: "Hexagon" },
          { category: "DataStorage", text: "DataStorage" },
          { category: "DiskStorage", text: "DiskStorage" },
          { category: "ExternalOrganization", text: "ExternalOrganization" },
          { category: "ExternalProcess", text: "ExternalProcess"},
          { category: "MicroformProcessing", text: "MicroformProcessing"},
          { category: "Ellipse", text: "Ellipse"},
          { category: "Circle", text: "Circle"},
          { category: "Diamond", text: "Diamond"},


        ])
      });
    return myPalette;
}

const Palette =()=>{
    return(
        <>
        <ReactPalette
        initPalette={initPalette}
        divClassName='myPaletteDiv'
        nodeDataArray={[{ key: 0, text: 'Hello1', color: "cyan",category:"FivePointedStar" },
        { key: 1, text: 'Hello2', color: "powderblue",category:"Database"},
        { key: 2, text: 'Hello3',color: "lightblue",category:"Comment" },
        { key: 3, text: 'Hello3',color: "lightblue",category:"RoundedRectagle" },
        { key: 4, text: 'Hello3',color: "lightblue",category:"Hexagon" },
        { key: 5, text: 'Hello3',color: "lightblue",category:"DataStorage" },
        { key: 6, text: 'Hello3',color: "lightblue",category:"DiskStorage" },
        { key: 7, text: 'Hello3',color: "lightblue",category:"ExternalOrganization" },
        { key: 8, text: 'Hello3',color: "lightblue",category:"ExternalProcess" },
        { key: 9, text: 'Hello3',color: "lightblue",category:"MicroformProcessing" },
        { key: 10, text: 'Hello3',color: "lightblue",category:"Ellipse" },
        { key: 11, text: 'Hello3',color: "lightblue",category:"Circle" },
        { key: 12, text: 'Hello3',color: "lightblue",category:"Diamond" },
        

        ]}
        />
        </>

    );
}

export default Palette;
