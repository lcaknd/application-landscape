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
          { category: "Start", text: "Start", },
          { text: "Step" },
          { category: "Conditional", text: "???" },
          { category: "End", text: "End" },
          { category: "Comment", text: "Comment" }
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
        nodeDataArray={[{ key: 0, text: 'Shit1', color: "cyan" },
        { key: 1, text: 'Shit2', color: "powderblue" },
        { key: 2, text: 'Shit3',color: "lightblue" },
        { key: 3, text: 'Shit4', color: "deepskyblue" },
        { key: 4, text: 'Shit5', color: "aquamarine"},
        { key: 5, text: 'Shit6', color: "turquoise" }
        ]}
        />
        </>

    );
}

export default Palette;
