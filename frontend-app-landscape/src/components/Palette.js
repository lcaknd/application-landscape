import React from 'react'
import * as go from 'gojs';
import {  ReactPalette } from 'gojs-react';
import "./Diagram.css"


function initPalette(){

    function animateFadeDown(e) {
        var diagram = e.diagram;
        var animation = new go.Animation();
        animation.isViewportUnconstrained = true;
        animation.easing = go.Animation.EaseOutExpo;
        animation.duration = 900;
        
        animation.add(diagram, 'position', diagram.position.copy().offset(0, 200), diagram.position);
        animation.add(diagram, 'opacity', 0, 1);
        animation.start();
      }
    
    const $ = go.GraphObject.make;
    const myDiagram = window.initDiagram()
    const myPalette =
    $(go.Palette,  
      {
        "animationManager.initialAnimationStyle": go.AnimationManager.None,
        "InitialAnimationStarting": animateFadeDown, 

        nodeTemplateMap: myDiagram.nodeTemplateMap,  
        model: new go.GraphLinksModel([ 
          { category: "Start", text: "Start" },
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
        nodeDataArray={[{ key: 0, text: 'Shit1' },
        { key: 1, text: 'Shit2' },
        { key: 2, text: 'Shit3' },
        { key: 3, text: 'Shit4' },
        { key: 4, text: 'Shit5' },
        { key: 5, text: 'Shit6' }
        ]}
        />
        </>

    );
}

export default Palette;
