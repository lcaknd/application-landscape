import React from 'react'
import * as go from 'gojs';
  import { ReactDiagram} from 'gojs-react';
  import "./Diagram.css"
  import {
    Button,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react'


  window.initDiagram =function() {
    const $ = go.GraphObject.make;  
    const myDiagram =
        $(go.Diagram, 
          { "undoManager.isEnabled": true,
            allowHorizontalScroll: true,
            allowVerticalScroll: false,
            model: $(go.GraphLinksModel,
                  {
                    linkKeyProperty: 'key' 
                  })
          });
      function nodeStyle() {
        return [
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          {
            locationSpot: go.Spot.Center
          }
        ];
      }

      function makePort(name, align, spot, output, input) {
        var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
        return $(go.Shape,
          {
            fill: "transparent",  
            strokeWidth: 0,  
            width: horizontal ? NaN : 8,  
            height: !horizontal ? NaN : 8,  
            alignment: align,  
            stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
            portId: name,  
            fromSpot: spot,  
            fromLinkable: output,  
            toSpot: spot,  
            toLinkable: input,  
            cursor: "pointer", 
            mouseEnter: function(e, port) { 
              if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
            },
            mouseLeave: function(e, port) {
              port.fill = "transparent";
            }
          });
      }

      function textStyle() {
        return {
          font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
          stroke: "#8696a3"
        }
      }

      myDiagram.nodeTemplateMap.add("",  
        $(go.Node, "Table", nodeStyle(),
          $(go.Panel, "Auto",
            $(go.Shape, "RoundedRectangle",
              { fill: "#C0D7E9", stroke: "#8696a3", strokeWidth: 2 },
              new go.Binding("figure", "figure")),
            $(go.TextBlock, textStyle(),
              {
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
              },
              new go.Binding("text").makeTwoWay())
          ),
          makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
          makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
          makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
          makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
        ));

      myDiagram.nodeTemplateMap.add("Conditional",
        $(go.Node, "Table", nodeStyle(),
          $(go.Panel, "Auto",
            $(go.Shape, "Diamond",
              { fill: "#282c34", stroke: "#00A9C9", strokeWidth: 3.5 },
              new go.Binding("figure", "figure")),
            $(go.TextBlock, textStyle(),
              {
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
              },
              new go.Binding("text").makeTwoWay())
          ),
          // four named ports, one on each side:
          makePort("T", go.Spot.Top, go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, go.Spot.Right, true, true),
          makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
        ));

      myDiagram.nodeTemplateMap.add("Start",
        $(go.Node, "Table", nodeStyle(),
          $(go.Panel, "Spot",
            $(go.Shape, "Circle",
              { desiredSize: new go.Size(30, 70), fill: "#282c34", stroke: "#09d3ac", strokeWidth: 3.5 }),
            $(go.TextBlock, "Start", textStyle(),
              new go.Binding("text"))
          ),
          makePort("L", go.Spot.Left, go.Spot.Left, true, false),
          makePort("R", go.Spot.Right, go.Spot.Right, true, false),
          makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
        ));

      myDiagram.nodeTemplateMap.add("End",
        $(go.Node, "Table", nodeStyle(),
          $(go.Panel, "Spot",
            $(go.Shape, "Circle",
              { desiredSize: new go.Size(60, 60), fill: "#282c34", stroke: "#DC3C00", strokeWidth: 3.5 }),
            $(go.TextBlock, "End", textStyle(),
              new go.Binding("text"))
          ),
          
          makePort("T", go.Spot.Top, go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, go.Spot.Left, false, true),
          makePort("R", go.Spot.Right, go.Spot.Right, false, true)
        ));

      go.Shape.defineFigureGenerator("File", function(shape, w, h) {
        var geo = new go.Geometry();
        var fig = new go.PathFigure(0, 0, true); 
        geo.add(fig);
        fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
        fig.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
        fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
        fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
        var fig2 = new go.PathFigure(.75 * w, 0, false);
        geo.add(fig2);
        fig2.add(new go.PathSegment(go.PathSegment.Line, .75 * w, .25 * h));
        fig2.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
        geo.spot1 = new go.Spot(0, .25);
        geo.spot2 = go.Spot.BottomRight;
        return geo;
      });

      myDiagram.nodeTemplateMap.add("Comment",
        $(go.Node, "Auto", nodeStyle(),
          $(go.Shape, "File",
            { fill: "#282c34", stroke: "#DEE0A3", strokeWidth: 3 }),
          $(go.TextBlock, textStyle(),
            {
              margin: 8,
              maxSize: new go.Size(200, NaN),
              wrap: go.TextBlock.WrapFit,
              textAlign: "center",
              editable: true
            },
            new go.Binding("text").makeTwoWay())
          
        ));


      
      myDiagram.linkTemplate =
        $(go.Link,  
          {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5, toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
            mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
            selectionAdorned: false
          },
          new go.Binding("points").makeTwoWay(),
          $(go.Shape, 
            { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
          $(go.Shape,  
            { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
            new go.Binding("stroke", "isSelected", function(sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
          $(go.Shape,  
            { toArrow: "standard", strokeWidth: 0, fill: "gray" }),
          $(go.Panel, "Auto",  
            { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
            new go.Binding("visible", "visible").makeTwoWay(),
            $(go.Shape, "RoundedRectangle",  
              { fill: "#F8F8F8", strokeWidth: 0 }),
            $(go.TextBlock, "Yes",  
              {
                textAlign: "center",
                font: "10pt helvetica, arial, sans-serif",
                stroke: "#333333",
                editable: true
              },
              new go.Binding("text").makeTwoWay())
          )
        );

      myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
      myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

      return myDiagram

    };

const Diagram =()=>{
return(
    <>
    <div>
    <ReactDiagram
          initDiagram={window.initDiagram}
          divClassName='myDiagramDiv'
          nodeDataArray = {[
            { key:-1, loc:'175 0', text:'Start'},
            {key:0, loc:'-5 75', text:'Initial node'}
        ]}
          linkDataArray={[
            {from:-1, to:0, fromPort:"B", toPort:"T"},
            {from:0, to:-1, fromPort:"B", toPort:"T"}
        ]}
    />
    </div>
</>
);
}

export default Diagram;
