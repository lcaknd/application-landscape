import React, {useState,useEffect,useRef,createContext,useContext } from 'react'
import go from 'gojs';
import Inspector from 'gojs/extensions/DataInspector';
import { ReactDiagram} from 'gojs-react';
import "./Diagram.css"
import { DataContext, SaveDiagram } from '../DiagramScreen';
import DiagramService from './ApiService/DiagramService';

import PopupExample from './PopupExample';
import swal from 'sweetalert';


export const OpenPopup = createContext({
  open: false,
  setOpen: () =>{}
});

export const BusinessCapabilities = createContext({
  
    frontend: true,
    backend: false,
    user: 55,
    date: "2021-01-01",
    setBusiness:()=>{}
})

    
const Diagram = React.memo((props)=>{

  const [modalContent, setModalContent] = React.useState(false);
  const modelRef = useRef()
  modelRef.current = modalContent

  const [business, setBusinessModel] = React.useState(null)
  const businessRef = useRef()
  businessRef.current = business



  const updateOpen = (property, value) =>
    setModalContent(prevInfo => ({ ...prevInfo, [property]: value }));

    const updateBusiness = (property, value) =>
    setBusinessModel(prevInfo => ({ ...prevInfo, [property]: value }));



  const {nameOfDiagram} = useContext(
    DataContext
  );

  const {saved} = useContext(SaveDiagram)

  const [save, setSaved] = useState(false);
  const saveRef = useRef();
  saveRef.current = save;



  const [diagramName, setDiagramName] = useState("hej");
  const stateRef = useRef();
  stateRef.current = diagramName;

  const [diagram, setDiagram] = useState([]);
  const diagramRef = useRef();
  diagramRef.current = diagram;

  const [mydiagram, setMyDiagram] = useState();
  const mydiagramRef = useRef();
  mydiagramRef.current = mydiagram;

  const [links, setLinks]= useState([])
  const linksRef = useRef();
  linksRef.current = links;






  window.initDiagram =function() {
    const $ = go.GraphObject.make;  
    const myDiagram =
        $(go.Diagram, 
          { "undoManager.isEnabled": true,
            allowHorizontalScroll: true,
            allowVerticalScroll: false,
            mouseDrop: function(e) { finishDrop(e, null); },
            // layout:  // Diagram has simple horizontal layout
            //   $(go.GridLayout,
            //     { wrappingWidth: Infinity, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1) }),
            "commandHandler.archetypeGroupData": { isGroup: true, text: "Group", horiz: false },
            
            model: $(go.GraphLinksModel,
                  {
                    linkKeyProperty: 'keyOfLink',
                    linkCategoryProperty:'category'
                    
                  }),


            layout: $(go.TreeLayout, {isOngoing: false })

          });

          function makeLayout(horiz) {  // a Binding conversion function
            if (horiz) {
              return $(go.GridLayout,
                {
                  wrappingWidth: Infinity, alignment: go.GridLayout.Position,
                  cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                });
            } else {
              return $(go.GridLayout,
                {
                  wrappingColumn: 1, alignment: go.GridLayout.Position,
                  cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                });
            }
          }

          function highlightGroup(e, grp, show) {
            if (!grp) return;
            e.handled = true;
            if (show) {
              // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
              // instead depend on the DraggingTool.draggedParts or .copiedParts
              var tool = grp.diagram.toolManager.draggingTool;
              var map = tool.draggedParts || tool.copiedParts;  // this is a Map
              // now we can check to see if the Group will accept membership of the dragged Parts
              if (grp.canAddMembers(map.toKeySet())) {
                grp.isHighlighted = true;
                return;
              }
            }
            grp.isHighlighted = false;
          }

          function finishDrop(e, grp) {
            var ok = (grp !== null
              ? grp.addMembers(grp.diagram.selection, true)
              : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
            if (!ok) e.diagram.currentTool.doCancel();
          }
          function defaultColor(horiz) {  // a Binding conversion function
            return horiz ? "#FFDD33" : "#33D3E5";
          }
    
          function defaultFont(horiz) {  // a Binding conversion function
            return horiz ? "bold 18px sans-serif" : "bold 16px sans-serif";
          }

          myDiagram.groupTemplate =
          $(go.Group, "Auto",
            {
              background: "transparent",
              ungroupable: false,
              // highlight when dragging into the Group
              mouseDragEnter: function(e, grp, prev) { highlightGroup(e, grp, true); },
              mouseDragLeave: function(e, grp, next) { highlightGroup(e, grp, false); },
              computesBoundsAfterDrag: true,
              // when the selection is dropped into a Group, add the selected Parts into that Group;
              // if it fails, cancel the tool, rolling back any changes
              mouseDrop: finishDrop,
              handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
              // Groups containing Groups lay out their members horizontally
              layout: makeLayout(false)
            },
            new go.Binding("layout", "horiz", makeLayout),
            new go.Binding("background", "isHighlighted", function(h) {
              return h ? "rgba(255,0,0,0.2)" : "transparent";
            }).ofObject(),
            $(go.Shape, "Rectangle",
              { fill: null, stroke: defaultColor(false), strokeWidth: 2 },
              new go.Binding("stroke", "horiz", defaultColor),
              new go.Binding("stroke", "color")),
            $(go.Panel, "Vertical",  // title above Placeholder
              $(go.Panel, "Horizontal",  // button next to TextBlock
                { stretch: go.GraphObject.Horizontal, background: defaultColor(false) },
                new go.Binding("background", "horiz", defaultColor),
                new go.Binding("background", "color"),
                $("SubGraphExpanderButton",
                  { alignment: go.Spot.Right, margin: 5 }),
                $(go.TextBlock,
                  {
                    alignment: go.Spot.Left,
                    editable: true,
                    margin: 5,
                    font: defaultFont(false),
                    opacity: 0.75,  // allow some color to show through
                    stroke: "#404040"
                  },
                  new go.Binding("font", "horiz", defaultFont),
                  new go.Binding("text", "text").makeTwoWay())
              ),  // end Horizontal Panel
              $(go.Placeholder,
                { padding: 5, alignment: go.Spot.TopLeft })
            )  // end Vertical Panel
          );
      function nodeStyle(name) {
        return [
          new go.Binding("location", "loc",new go.Binding("fill","fill")
          , go.Point.parse).makeTwoWay(go.Point.stringify),
          {
            locationSpot: go.Spot.Center,
            // resize the Shape, not the Node

            selectionObjectName: name
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
        
        var _CachedArrays = [];
        function tempArray() {
          var temp = _CachedArrays.pop();
          if (temp === undefined) return [];
          return temp;
        };
        
        /**
          * @ignore
          * @param {Array} a
          */
        function freeArray(a) {
          a.length = 0;  // clear any references to objects
          _CachedArrays.push(a);
        };

        function createPolygon(sides) {
          // Point[] points = new Point[sides + 1];
          var points = tempArray();
          var radius = .5;
          var center = .5;
          var offsetAngle = Math.PI * 1.5;
          var angle = 0;
        
          // Loop through each side of the polygon
          for (var i = 0; i < sides; i++) {
            angle = 2 * Math.PI / sides * i + offsetAngle;
            points[i] = new go.Point((center + radius * Math.cos(angle)), (center + radius * Math.sin(angle)));
          }
        
          // Add the last line
          // points[points.length - 1] = points[0];
          points.push(points[0]);
          return points;
        };

        function getIntersection(p1x, p1y, p2x, p2y, q1x, q1y, q2x, q2y, result) {
          var dx1 = p1x - p2x;
          var dx2 = q1x - q2x;
          var x;
          var y;
        
          if (dx1 === 0 || dx2 === 0) {
            if (dx1 === 0) {
              var m2 = (q1y - q2y) / dx2;
              var b2 = q1y - m2 * q1x;
              x = p1x;
              y = m2 * x + b2;
            }
            else {
              var m1 = (p1y - p2y) / dx1;
              var b1 = p1y - m1 * p1x;
              x = q1x;
              y = m1 * x + b1;
            }
          }
          else {
            var m1 = (p1y - p2y) / dx1;
            var m2 = (q1y - q2y) / dx2;
            var b1 = p1y - m1 * p1x;
            var b2 = q1y - m2 * q1x;
        
            x = (b2 - b1) / (m1 - m2);
            y = m1 * x + b1;
          }
        
          result.x = x;
          result.y = y;
          return result;
        };
        
        function createStar(points) {
          // First, create a regular polygon
          var polygon = createPolygon(points);
          // Calculate the points inbetween
          var pts = tempArray(); // new Point[points * 2 + 1];
        
          var half = Math.floor(polygon.length / 2);
          var count = polygon.length - 1;
          var offset = (points % 2 === 0) ? 2 : 1;
        
          for (var i = 0; i < count; i++) {
            // Get the intersection of two lines
            var p0 = polygon[i];
            var p1 = polygon[i + 1];
            var q21 = polygon[(half + i - 1) % count];
            var q2off = polygon[(half + i + offset) % count];
            pts[i * 2] = p0;
            pts[i * 2 + 1] = getIntersection(p0.x, p0.y,
              q21.x, q21.y,
              p1.x, p1.y,
              q2off.x, q2off.y, new go.Point());  // ?? not currently managed
          }
        
          pts[pts.length] = pts[0];
        
          freeArray(polygon);
          return pts;
        };

        var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);

        go.Shape.defineFigureGenerator("Database", function(shape, w, h) {
          var geo = new go.Geometry();
          var cpxOffset = KAPPA * .5;
          var cpyOffset = KAPPA * .1;
          var fig = new go.PathFigure(w, .1 * h, true);
          geo.add(fig);
        
          // Body
          fig.add(new go.PathSegment(go.PathSegment.Line, w, .9 * h));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, h, w, (.9 + cpyOffset) * h,
            (.5 + cpxOffset) * w, h));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, .9 * h, (.5 - cpxOffset) * w, h,
            0, (.9 + cpyOffset) * h));
          fig.add(new go.PathSegment(go.PathSegment.Line, 0, .1 * h));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, 0, 0, (.1 - cpyOffset) * h,
            (.5 - cpxOffset) * w, 0));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, w, .1 * h, (.5 + cpxOffset) * w, 0,
            w, (.1 - cpyOffset) * h));
          var fig2 = new go.PathFigure(w, .1 * h, false);
          geo.add(fig2);
          // Rings
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .2 * h, w, (.1 + cpyOffset) * h,
            (.5 + cpxOffset) * w, .2 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, 0, .1 * h, (.5 - cpxOffset) * w, .2 * h,
            0, (.1 + cpyOffset) * h));
          fig2.add(new go.PathSegment(go.PathSegment.Move, w, .2 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .3 * h, w, (.2 + cpyOffset) * h,
            (.5 + cpxOffset) * w, .3 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, 0, .2 * h, (.5 - cpxOffset) * w, .3 * h,
            0, (.2 + cpyOffset) * h));
          fig2.add(new go.PathSegment(go.PathSegment.Move, w, .3 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .4 * h, w, (.3 + cpyOffset) * h,
            (.5 + cpxOffset) * w, .4 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, 0, .3 * h, (.5 - cpxOffset) * w, .4 * h,
            0, (.3 + cpyOffset) * h));
          geo.spot1 = new go.Spot(0, .4);
          geo.spot2 = new go.Spot(1, .9);
          return geo;
        });
        
        

        go.Shape.defineFigureGenerator("FivePointedStar", function(shape, w, h) {
          var starPoints = createStar(5);
          var geo = new go.Geometry();
          var fig = new go.PathFigure(starPoints[0].x * w, starPoints[0].y * h, true);
          geo.add(fig);
        
          for (var i = 1; i < 10; i++) {
            fig.add(new go.PathSegment(go.PathSegment.Line, starPoints[i].x * w, starPoints[i].y * h));
          }
          fig.add(new go.PathSegment(go.PathSegment.Line, starPoints[0].x * w, starPoints[0].y * h).close());
          freeArray(starPoints);
          geo.spot1 = new go.Spot(.266, .333);
          geo.spot2 = new go.Spot(.733, .733);
          return geo;
        });

        go.Shape.defineFigureGenerator("Hexagon", function(shape, w, h) {
          var points = createPolygon(6);
          var geo = new go.Geometry();
          var fig = new go.PathFigure(points[0].x * w, points[0].y * h, true);
          geo.add(fig);
        
          for (var i = 1; i < 6; i++) {
            fig.add(new go.PathSegment(go.PathSegment.Line, points[i].x * w, points[i].y * h));
          }
          fig.add(new go.PathSegment(go.PathSegment.Line, points[0].x * w, points[0].y * h).close());
          freeArray(points);
          geo.spot1 = new go.Spot(.07, .25);
          geo.spot2 = new go.Spot(.93, .75);
          return geo;
        });

        go.Shape.defineFigureGenerator("MicroformProcessing", function(shape, w, h) {
          var geo = new go.Geometry();
          var param1 = shape ? shape.parameter1 : NaN;
          if (isNaN(param1)) param1 = .25; // How far from the top/bottom the points are
          var fig = new go.PathFigure(0, 0, true);
          geo.add(fig);
        
          fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, param1 * h));
          fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
          fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
          fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, (1 - param1) * h));
          fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
          //??? geo.spot1 = new go.Spot(0, param1);
          //??? geo.spot2 = new go.Spot(1, 1 - param1);
          return geo;
        });

        go.Shape.defineFigureGenerator("DataStorage", function(shape, w, h) {
          var geo = new go.Geometry();
          var fig = new go.PathFigure(0, 0, true);
          geo.add(fig);
        
          fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, .75 * w, h, w, 0, w, h));
          fig.add(new go.PathSegment(go.PathSegment.Line, 0, h));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, 0, .25 * w, .9 * h, .25 * w, .1 * h).close());
          geo.spot1 = new go.Spot(.226, 0);
          geo.spot2 = new go.Spot(.81, 1);
          return geo;
        });

        go.Shape.defineFigureGenerator("ExternalProcess", function(shape, w, h) {
          var geo = new go.Geometry();
          var fig = new go.PathFigure(.5 * w, 0, true);
          geo.add(fig);
        
          // Body
          fig.add(new go.PathSegment(go.PathSegment.Line, w, .5 * h));
          fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, h));
          fig.add(new go.PathSegment(go.PathSegment.Line, 0, .5 * h).close());
          var fig2 = new go.PathFigure(.1 * w, .4 * h, false);
          geo.add(fig2);
          // Top left triangle
          fig2.add(new go.PathSegment(go.PathSegment.Line, .1 * w, .6 * h));
          // Top right triangle
          fig2.add(new go.PathSegment(go.PathSegment.Move, .9 * w, .6 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Line, .9 * w, .4 * h));
          // Bottom left triangle
          fig2.add(new go.PathSegment(go.PathSegment.Move, .6 * w, .1 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Line, .4 * w, .1 * h));
          // Bottom right triangle
          fig2.add(new go.PathSegment(go.PathSegment.Move, .4 * w, .9 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Line, .6 * w, .9 * h));
          geo.spot1 = new go.Spot(.25, .25);
          geo.spot2 = new go.Spot(.75, .75);
          return geo;
        });
        go.Shape.defineFigureGenerator("ExternalOrganization", function(shape, w, h) {
          var geo = new go.Geometry();
          var param1 = shape ? shape.parameter1 : NaN;
          if (isNaN(param1) || param1 < .2) param1 = .2; // Minimum
          var fig = new go.PathFigure(0, 0, true);
          geo.add(fig);
        
          // Body
          fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
          fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
          fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
          var fig2 = new go.PathFigure(param1 * w, 0, false);
          geo.add(fig2);
          // Top left triangle
          fig2.add(new go.PathSegment(go.PathSegment.Line, 0, param1 * h));
          // Top right triangle
          fig2.add(new go.PathSegment(go.PathSegment.Move, w, param1 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - param1) * w, 0));
          // Bottom left triangle
          fig2.add(new go.PathSegment(go.PathSegment.Move, 0, (1 - param1) * h));
          fig2.add(new go.PathSegment(go.PathSegment.Line, param1 * w, h));
          // Bottom right triangle
          fig2.add(new go.PathSegment(go.PathSegment.Move, (1 - param1) * w, h));
          fig2.add(new go.PathSegment(go.PathSegment.Line, w, (1 - param1) * h));
          //??? geo.spot1 = new go.Spot(param1 / 2, param1 / 2);
          //??? geo.spot2 = new go.Spot(1 - param1 / 2, 1 - param1 / 2);
          return geo;
        });

        go.Shape.defineFigureGenerator("DiskStorage", function(shape, w, h) {
          var geo = new go.Geometry();
          var cpxOffset = KAPPA * .5;
          var cpyOffset = KAPPA * .1;
          var fig = new go.PathFigure(w, .1 * h, true);
          geo.add(fig);
        
          // Body
          fig.add(new go.PathSegment(go.PathSegment.Line, w, .9 * h));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, h, w, (.9 + cpyOffset) * h,
            (.5 + cpxOffset) * w, h));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, .9 * h, (.5 - cpxOffset) * w, h,
            0, (.9 + cpyOffset) * h));
          fig.add(new go.PathSegment(go.PathSegment.Line, 0, .1 * h));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, 0, 0, (.1 - cpyOffset) * h,
            (.5 - cpxOffset) * w, 0));
          fig.add(new go.PathSegment(go.PathSegment.Bezier, w, .1 * h, (.5 + cpxOffset) * w, 0,
            w, (.1 - cpyOffset) * h));
          var fig2 = new go.PathFigure(w, .1 * h, false);
          geo.add(fig2);
          // Rings
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .2 * h, w, (.1 + cpyOffset) * h,
            (.5 + cpxOffset) * w, .2 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, 0, .1 * h, (.5 - cpxOffset) * w, .2 * h,
            0, (.1 + cpyOffset) * h));
          fig2.add(new go.PathSegment(go.PathSegment.Move, w, .2 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .3 * h, w, (.2 + cpyOffset) * h,
            (.5 + cpxOffset) * w, .3 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Bezier, 0, .2 * h, (.5 - cpxOffset) * w, .3 * h,
            0, (.2 + cpyOffset) * h));
          geo.spot1 = new go.Spot(0, .3);
          geo.spot2 = new go.Spot(1, .9);
          return geo;
        });
    

        function createShape(name){
        myDiagram.nodeTemplateMap.add(name,  
        $(go.Node, "Auto",nodeStyle(name), new go.Binding("hello"),
          $(go.Panel,  "Auto",
            $(go.Shape, name,
              { fill: "#C0D7E9", stroke: "#8696a3", strokeWidth: 2},
              new go.Binding("figure", "figure"), new go.Binding("fill","fill")),
            $(go.TextBlock, textStyle(),
              {
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
              },
              new go.Binding("text").makeTwoWay(),
              )
          ),
          makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
          makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
          makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
          makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
        ));

        }

        let arrayOfShapes = ["Database","RoundedRectangle","FivePointedStar","Hexagon","DataStorage","DiskStorage","ExternalOrganization","ExternalProcess","MicroformProcessing","Ellipse","Circle","Diamond"]

        var arrayLength = arrayOfShapes.length;
        for (var i = 0; i < arrayLength; i++) {
            createShape(arrayOfShapes[i])
        }

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
            { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT",portId: "", fromLinkable: true, toLinkable: true }),
          $(go.Shape,  
            { isPanelMain: true, stroke: "gray", strokeWidth: 2,portId: "", fromLinkable: true, toLinkable: true },
            new go.Binding("stroke", "isSelected", function(sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
          $(go.Shape,  
            { toArrow: "Standard", strokeWidth: 0, fill: "gray",portId: "", fromLinkable: true, toLinkable: true }, new go.Binding("toArrow","arrow").makeTwoWay()
            ),
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
       

        var inspector = new Inspector('myInspector', myDiagram,
        {
          properties: {
            // key would be automatically added for nodes, but we want to declare it read-only also:
            // "key": { readOnly: true, show: Inspector.showIfPresent },
            // fill and stroke would be automatically added for nodes, but we want to declare it a color also:
            "fill": { show: Inspector.showIfPresent, type: 'color' },
            "stroke": { show: Inspector.showIfPresent, type: 'color' },
            "backend": {show: Inspector.showIfPresent,type: 'boolean'},
            "users": {show: Inspector.showIfPresent,type: 'number'},

          }
        });


    myDiagram.select(myDiagram.nodes.first())
    console.log(myDiagram.nodes.first)

      myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
      myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

      var array = []

      function arrayToList(array) {
        let list = null;
        for (let i = array.length - 1; i >= 0; i--) {
            list = { value: array[i], rest: list };
        }
        return list;
    }


      myDiagram.addDiagramListener('Modified', function() {
      
        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        // const last = array.nodeDataArray
        // const lastNode = last[last.length-1]
        // //lastNode["name"] = stateRef.current.nameOfDiagram;

        // // DiagramVisualService.createDiagramVisual(lastNode)

        // let listOfNodes = arrayToList(array.nodeDataArray)
        // let listOfLinks = arrayToList(array.linkDataArray)
        
        setLinks(array.linkDataArray)

        let diagram = {
          name: stateRef.current.nameOfDiagram,
          links: null,
          diagramVisuals: array.nodeDataArray,
          businessCapabilities: null
        }

        // DiagramService.createDiagram(diagram
        // //updateDataVisual(array.nodeDataArray)
        // //updateLinks(array.linkDataArray) 
      
        
        // BusinessCapabilityService.getBusinessCapabilities().then(res=>{
        // })
      });
      myDiagram.addDiagramListener('ExternalObjectsDropped',function(){
        for (var it = myDiagram.selection.iterator; it.next(); ) {
          var part = it.value;  // part is now a Node or a Group or a Link or maybe a simple Part
          if (part instanceof go.Node) {
            
          
        }
          else if (part instanceof go.Link) {  }
        }
       
        
       

        
        array = JSON.parse(myDiagram.model.toJson())
        console.log(array)
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)
        setModalContent(true)
       

      });
      myDiagram.addDiagramListener('LinkDrawn',function(){
        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)

      });
      myDiagram.addDiagramListener('LinkRelinked',function(){
        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)

      });
      myDiagram.addDiagramListener('TextEdited',function(){
        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)

      });
      myDiagram.addDiagramListener('SelectionDeleted', function() {

        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)
      

        
      });

      myDiagram.addDiagramListener('ChangedSelection', function() {

        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)

       

      

        
      });
      myDiagram.addDiagramListener('ChangingSelection', function(e) {

        myDiagram.selection.each( function(part){
        console.log(part.data)

           // part is now a Node or a Group or a Link or maybe a simple Part
          if (part instanceof go.Node) {
            myDiagram.model.startTransaction();
            myDiagram.model.setDataProperty(part.data, "frontend", businessRef.current.frontend);
            myDiagram.model.setDataProperty(part.data,"backend",businessRef.current.backend);
            myDiagram.model.setDataProperty(part.data,"users",businessRef.current.user);
            myDiagram.model.setDataProperty(part.data,"date",businessRef.current.date);
            myDiagram.model.commitTransaction("modified properties");
        
            array = JSON.parse(myDiagram.model.toJson())

            console.log(array.nodeDataArray)


          
        }
          else if (part instanceof go.Link) {  }
      });
        

        console.log(array.nodeDataArray)

        console.log("changed")
        

      });
      myDiagram.addDiagramListener('SelectionMoved', function() {
       
        console.log(myDiagram.model.toJson());
      });


      return myDiagram
    
      };


      useEffect(()=>{

        setDiagramName(nameOfDiagram)
        console.log(saved.saved)
        setSaved(saved.saved)
        if(saved){
          console.log("printsaved")
          console.log(nameOfDiagram.nameOfDiagram)
          console.log(diagramRef.current)

          var diagramNodes ={
            name: nameOfDiagram.nameOfDiagram,
            diagramVisuals: diagramRef.current,
            links:linksRef.current,
            businessCapabilities:null
          }
          console.log(diagramNodes)


          DiagramService.createDiagram(diagramNodes).then((res) => {
            if (res.status === 200) {
              swal("Success", "Your data is saved", "success");
            } else {
              swal("Failure", "Your data is not saved, try again", "error");
            }
          }).catch(err => {
            if (err) {
              swal("Oh noes!", "Something  wrong happened with your data!", "error");
            } else {
              swal.stopLoading();
              swal.close();
            }
          })
          
          setSaved(false)
        }
        
    
        
    },[nameOfDiagram,saved,business]);


  
return (

  
    <>
    <BusinessCapabilities.Provider value = {{business,updateBusiness}}>
    <OpenPopup.Provider value = {{modalContent,updateOpen}}>
    <div>
    <ReactDiagram
          initDiagram={window.initDiagram}
          divClassName='myDiagramDiv'
          nodeDataArray = {diagramRef.current.diagram}
          linkDataArray={linksRef.current.links}/>
          {modelRef.current ? <PopupExample open = {modelRef.current} /> : null }
    

    </div>
    </OpenPopup.Provider>
    </BusinessCapabilities.Provider>
</>
);
});

export default React.memo(Diagram);
