import React, {useState,useEffect,createRef,useRef,createContext,useContext } from 'react'
import go from 'gojs';
import Inspector from 'gojs/extensions/DataInspector';
import { ReactDiagram} from 'gojs-react';
import "./Diagram.css"
import DiagramVisualService from './ApiService/DiagramVisualService';
import { DataContext, SaveDiagram } from '../DiagramScreen';
import DiagramService from './ApiService/DiagramService';
import PopupExample from './PopupExample';
import PopUpLink from './PopUpLink';
import swal from 'sweetalert';

export const OpenPopup = createContext({
  open: false,
  openLink:false,
  setOpen: () =>{}
});

export const BusinessCapabilities = createContext({
  
    frontend: null,
    backend: null,
    user: null,
    date: "",
    services:"",
    departments:"",
    termination:"",
    license:"",
    version:"",
    creator:"",
    setBusiness:()=>{}
})

export const LinkBusinessCapabilities = createContext({
  
  
  frequency: null,
  bandwidth:null,
  setBusiness:()=>{}
})


const Diagram = (props)=>{

  

  const [modalContent, setModalContent] = React.useState(false);
  const modelRef = useRef()
  modelRef.current = modalContent

  const [business, setBusinessModel] = React.useState(null)
  const businessRef = useRef()
  businessRef.current = business

  const [layout,setLayout] = React.useState("ForceDirectedLayout")
  const layoutRef = useRef();
  layoutRef.current = layout;

  const [field,setField] = React.useState(null)
  const fieldRef = useRef();
  fieldRef.current = field;

  const [linkBusiness, setBusinessLinkModel] = React.useState(null)
  const businessLinkRef = useRef()
  businessLinkRef.current = linkBusiness


  const updateOpen = (property, value) =>
    setModalContent(prevInfo => ({ ...prevInfo, [property]: value }));

    const updateBusiness = (property, value) =>
    setBusinessModel(prevInfo => ({ ...prevInfo, [property]: value }));

    const updateLink = (property, value) =>
    setBusinessLinkModel(prevInfo => ({ ...prevInfo, [property]: value }));


  const {nameOfDiagram, updateName} = useContext(
    DataContext
  );


  const {saved,updateSaved} = useContext(SaveDiagram)

  const [save, setSaved] = useState(false);
  const saveRef = useRef();
  saveRef.current = save;


  const [diagramName, setDiagramName] = useState("");
  const stateRef = useRef();
  stateRef.current = diagramName;
 

  const [mydiagram, setDiagram] = useState([])
  let diagramRef = createRef();
  
  const [links, setLinks]= useState([])
  const linksRef = createRef();
 

  window.initDiagram=function(){


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
                    linkCategoryProperty:'category',
                    nodeGroupKeyProperty:"groupNumber",
                    makeUniqueKeyFunction: (m ,data) => {
                      let k = data.key || 1;
                      while (m.findNodeDataForKey(k)) k++;
                      data.key = k;
                      return k;
                    }
                    
                    
                  }),
                  
                  // layout: makeLayoutForced(layoutRef.current),
                  // "InitialLayoutCompleted": function(e) {
                  //   if (!e.diagram.nodes.all(n => n.location.isReal())) {
                  //     e.diagram.layoutDiagram(true);
                  //   }
                  // },

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
              // layout: makeLayout(false)
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
          new go.Binding("location", "loc"
          ,go.Point.parse).makeTwoWay(go.Point.stringify), new go.Binding("group","groupNumber").makeTwoWay(),
           {
           //  fromSpot: go.Spot.Right,  // coming out from middle-right
          //   toSpot: go.Spot.Left ,
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
            // fromSpot: spot,  
            fromLinkable: output,  
            // toSpot: spot,  
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
          name: "TEXTBLOCK",
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
        $(go.Node, "Auto",nodeStyle(name),
          $(go.Panel,  "Auto",
            $(go.Shape, name,
              { fill: "#C0D7E9", stroke: "#8696a3", strokeWidth: 2},
              new go.Binding("figure", "figure"), new go.Binding("fill","fill")),
            $(go.TextBlock, textStyle(),
              {
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: false
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
            // routing: go.Link.Orthogonal,
            curve: go.Link.JumpOver,
            corner: 5, toShortLength: 4,
            // relinkableFrom: true,
            // relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; link.findObject("HIGHLIGHT").strokeWidth = 4;},
            mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; link.findObject("HIGHLIGHT").strokeWidth = 1; },
            selectionAdorned: true
          },
          new go.Binding("points").makeTwoWay(),
         
          $(go.Shape, 
            { isPanelMain: true, stroke: "transparent", name: "HIGHLIGHT",portId: "", fromLinkable: true, toLinkable: true }),
          $(go.Shape,  
            { isPanelMain: true, stroke: "gray",portId: "", fromLinkable: true, toLinkable: true },
            new go.Binding("stroke", "isSelected", function(sel) { return sel ? "dodgerblue" : "gray"; }).ofObject(),
            new go.Binding("strokeWidth").makeTwoWay(),
            ),
           

          $(go.Shape,  
            { toArrow: "Standard",  fill: "gray",portId: "", fromLinkable: true, toLinkable: true }, new go.Binding("toArrow","arrow").makeTwoWay()
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
        {  visible:false,
          showAllProperties: true,
          properties: {
            // key would be automatically added for nodes, but we want to declare it read-only also:
            "key": { readOnly: true, show: Inspector.showIfPresent },
            // fill and stroke would be automatically added for nodes, but we want to declare it a color also:
            "fill": { show: Inspector.showIfPresent, type: 'color' },
            "stroke": { show: Inspector.showIfPresent, type: 'color' },
            "backend": {show: Inspector.showIfPresent,type: 'checkbox'},
            "frontend":{show: Inspector.showIfPresent,type: 'checkbox'}
            
            
  
          }
        });
       

        


    myDiagram.select(myDiagram.nodes.first())
    

      myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
      myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

      var array = []

   


      myDiagram.addDiagramListener('Modified', function() {
        // myDiagram.layout = makeLayoutForced(layoutRef.current)

      
      });
      myDiagram.addDiagramListener('ExternalObjectsDropped',function(e){

        

        console.log(stateRef.current.nameOfDiagram)

          if(stateRef.current.nameOfDiagram===""|| stateRef.current.nameOfDiagram===undefined){
          swal("Error", "Create name of diagram!", "error");
          setDiagram([])

        } else {
          e.diagram.layoutDiagram(true)

        e.subject.each(function(p) {
          if (p instanceof go.Group) {
            setModalContent(false)} else{
              setModalContent({open:true})
              myDiagram.model.startTransaction();
              myDiagram.model.setDataProperty(p.data, "modified", false);
              myDiagram.model.commitTransaction("modified properties");
            }
            
        })
        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        console.log(array.nodeDataArray)

        }
        

        
         
         
         


      });

     

      myDiagram.addDiagramListener('BackgroundSingleClicked',function(e){
        updateSaved('inspector',false)
      })
      myDiagram.addDiagramListener('BackgroundDoubleClicked',function(e){
        updateSaved('inspector',false)
      })

     
      myDiagram.addDiagramListener('LinkDrawn',function(e){
        updateSaved('inspector',true)
        array = JSON.parse(myDiagram.model.toJson())
        setLinks(array.linkDataArray)
        setModalContent({openLink:true})
        myDiagram.select(myDiagram.findLinkForKey(e.subject.data.keyOfLink));
       

        myDiagram.selection.each( function(part){
  
            if (part instanceof go.Node) {

          }
            else if (part instanceof go.Link) { 

            

              
             }
        });


      });

      myDiagram.addDiagramListener('LayoutCompleted',function(e){
        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)
      })
      myDiagram.addDiagramListener('LinkRelinked',function(){
        array = JSON.parse(myDiagram.model.toJson())
        // setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)

      });
      myDiagram.addDiagramListener('TextEdited',function(){
        array = JSON.parse(myDiagram.model.toJson())
        // setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)

      });
      myDiagram.addDiagramListener('SelectionDeleted', function() {

        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)
        updateSaved('inspector',false)
      

        
      });

      myDiagram.addDiagramListener('ChangedSelection', function() {

        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)
        


        
      });

      myDiagram.addDiagramListener('SelectionDeleting', function(e){
        array = JSON.parse(myDiagram.model.toJson())
        setDiagram(array.nodeDataArray)
        setLinks(array.linkDataArray)
        
      
      })
      myDiagram.addDiagramListener('ChangingSelection', function(e) {
        updateSaved('inspector',true)


        if(modelRef.current.open===false){
         
          

        myDiagram.selection.each( function(part){


         if (part instanceof go.Node) {
           

         
           myDiagram.model.startTransaction();
           myDiagram.model.setDataProperty(part.data, "frontend", businessRef.current.frontend);
           myDiagram.model.setDataProperty(part.data,"backend",businessRef.current.backend);
           myDiagram.model.setDataProperty(part.data,"users",businessRef.current.user);
           myDiagram.model.setDataProperty(part.data,"date",businessRef.current.date);
           myDiagram.model.setDataProperty(part.data,"services",businessRef.current.services);
           myDiagram.model.setDataProperty(part.data,"departments",businessRef.current.departments);
           myDiagram.model.setDataProperty(part.data,"termination",businessRef.current.termination);
           myDiagram.model.setDataProperty(part.data,"license",businessRef.current.license);
           myDiagram.model.setDataProperty(part.data,"version",businessRef.current.version);
           myDiagram.model.setDataProperty(part.data,"creator",businessRef.current.creator);

           myDiagram.model.commitTransaction("modified properties");
       
           array = JSON.parse(myDiagram.model.toJson())

           
           setModalContent(false)
           setBusinessModel(
           {
  
            frontend: null,
            backend: null,
            user: null,
            date: "",
            services:[],
            departments:[],
            termination:"",
            license:"",
            version:"",
            creator:"",
            
        }
           )
           setDiagram(array.nodeDataArray)
           setLinks(array.linkDataArray)
         
       }
        else if (part instanceof go.Link)  {

          
            array = JSON.parse(myDiagram.model.toJson())
            setLinks(array.linkDataArray)
            setModalContent(false)
          }
     });
    }

    if(modelRef.current.openLink===false){

      myDiagram.selection.each( function(part){


        if (part instanceof go.Link) {
          if (businessLinkRef.current.frequency<=250 && businessLinkRef.current.frequency>=1){
          var percentage = businessLinkRef.current.frequency/250
          var stroke = percentage*5
            myDiagram.model.startTransaction();
            myDiagram.model.setDataProperty(part.data,"strokeWidth",stroke);
            
            myDiagram.model.commitTransaction("modified properties");}
            else {
              
              myDiagram.model.setDataProperty(part.data,"strokeWidth",6);
            }
            myDiagram.model.setDataProperty(part.data,"frequency",businessLinkRef.current.frequency);
            myDiagram.model.setDataProperty(part.data,"bandwidth",businessLinkRef.current.bandwidth);
           setLinks(array.linkDataArray)
        
      }
        
          
         
    });

    }

    array = JSON.parse(myDiagram.model.toJson())
    setDiagram(array.nodeDataArray)
    setLinks(array.linkDataArray)
    

    
        

      });
    
      setField(myDiagram)

      return myDiagram

    }

    function makeLayoutForced(pressedLayout){
      
      const $ = go.GraphObject.make;  
      
if (pressedLayout==="LayeredDiagramLayout") {
  
  return   $(go.LayeredDigraphLayout,  // this will be discussed in a later section
{ columnSpacing: 40,
 setsPortSpots: false,isInitial:true,
 isOngoing: false });}
 else if (pressedLayout==="ForceDirectedLayout"){
  
      return $(go.ForceDirectedLayout, {
        maxIterations:100,
        epsilonDistance:100,
        infinityDistance:20,
        arrangementSpacing:new go.Size(100,100),
        defaultGravitationalMass:100,
        defaultSpringStiffness:100,
        defaultSpringLength:100,
        defaultElectricalCharge: 100,
        isInitial:true,
        isOngoing: false, 
        setsPortSpots: false
         
       })
      }
      else if(pressedLayout==="TreeLayout"){
        
        return $(go.TreeLayout, {
          // angle:90,
          layerSpacing:50,
          nodeSpacing:100,
          setsChildPortSpot: false,
          alignment:go.TreeLayout.AlignmentStart,
          sorting: go.TreeLayout.SortingAscending,
          comparer: function(a,b){
            a = a.node; b=b.node;
            if(a.data.key < b.data.key) return -1;
            if(a.data.key > b.data.key) return 1;
            return 0;
          },
           treeStyle: go.TreeLayout.PathDefault,
          

        isOngoing: false, 
        isInitial:true,
          setsPortSpot: false,
          
        }
        )
      }
      return null;
      
    }

      
    useEffect(()=>{
      diagramRef.current = mydiagram;
    },[mydiagram])

    useEffect(()=>{
      linksRef.current = links;

    },[links])

    useEffect(()=>{
      layoutRef.current = layout;
      
      if (fieldRef.current != null){
        
        
      fieldRef.current.layout = makeLayoutForced(layoutRef.current)
      
      }
      

    },[layout])

    useEffect(()=>{
    
    setLayout(saved.layout)
    

    },[saved.layout])

    useEffect(()=>{

      updateSaved('myDiagram',field)

   
    },[field])
      


      useEffect(()=>{


        setDiagramName(nameOfDiagram)
    
 
        if(saved.saved){
         

          
          
          if( stateRef.current!==""){
            var diagramModified=[]
            var newNodes=[]
            var linksModified=[]
            var newLinks = []
            var diagramNodesNew = {}
            var diagramUpdate={}

            console.log(fieldRef.current.model.nodeDataArray)
            console.log(mydiagram)
            
            mydiagram.forEach(function (i) {
              console.log(i)
              
             if(i.modified===false){
               newNodes.push(i)
             } else {
               console.log(i)
               diagramModified.push(i)
             }
            
          });

            links.forEach(function(i){
              if(i.modified===false){
                newLinks.push(i)
              } else {
                linksModified.push(i)
              }
            });

             diagramModified.forEach(function(i){

             
              DiagramVisualService.updateDiagramVisualById(i.name,i).then(()=>{

              })
            });

            linksModified.forEach(function(i){
             
              DiagramVisualService.updateDiagramVisualById(i.name,i).then(()=>{

              })
            });
 
             diagramNodesNew= {
              name: nameOfDiagram.nameOfDiagram,
              diagramVisuals: mydiagram,
              links:links,
              businessCapabilities:null
            }
            

            diagramNodesNew= {
              name: nameOfDiagram.nameOfDiagram,
              diagramVisuals: mydiagram,
              links:links,
              businessCapabilities:null
            }


           
          DiagramService.createDiagram(diagramNodesNew).then((res) => {
            if (res.status === 200) {
              swal("Success", "Your data is saved", "success");
            } else {
              swal("Failure", "Your data is not saved, try again", "error");
            }
          })
          .catch(err => {
            if (err) {
              swal("Oh noes!", "Something  wrong happened with your data!", "error");
            } else {
              swal.stopLoading();
              swal.close();
            }
          })
        }
          else {
            swal("Failure", "Your data is not saved, try again", "error");
          }
          updateSaved('saved',false)
          
          setSaved(false)
          updateName('nameOfDiagram',"")
          
          

          if(field!=null){

            fieldRef.current.clear()
            setDiagram([])
            setLinks([])
            }
        } 
        if(saved.upload){

          DiagramService.getDiagramByName(nameOfDiagram.nameOfDiagram).then((res)=>{
            if (res.status ===200){
              
              setDiagramName(res.data.name)
              var diagram = []

              var node = res.data.diagramVisuals
              var link = res.data.links
              
              
              for (var i=0; i<node.length;i++){

                if (node[i].isGroup===false){

                diagram.push({name:node[i].name,key:node[i].key,frontend:node[i].frontend,loc:node[i].loc,text:node[i].text,users:node[i].users,category:node[i].category,date:node[i].date,backend:node[i].backend,fill:node[i].fill,services:node[i].services,departments:node[i].departments,license:node[i].license,version:node[i].version,termination:node[i].termination,creator:node[i].creator,groupNumber:node[i].groupNumber,modified:true}) }
                else {
                diagram.push({name:node[i].name,key:node[i].key,isGroup:node[i].isGroup,text:node[i].text,horiz:node[i].horiz,groupNumber:node[i].groupNumber,modified:true})
                }
                
              }

              var links = []


              for(var i=0;i<link.length;i++){
                links.push({name:link[i].name,keyOfLink:link[i].keyOfLink,from:link[i].from,to:link[i].to,points:link[i].points,strokeWidth:link[i].strokeWidth,frequency:link[i].frequency,bandwidth:link[i].bandwidth,modified:true})

              }

              setDiagram(diagram)
              setLinks(links)
              updateSaved('upload',false)
     
            }


          }).catch(err => {
            if (err) {
              swal("Oh noes!", "Something  wrong happened with your data!", "error");
            } else {
              swal.stopLoading();
              swal.close();
            }
          })
          
          
        }
        
        
    },[saved]);

    useEffect(()=>{
      setDiagramName(nameOfDiagram.nameOfDiagram)
      console.log(nameOfDiagram)

      if(field!=null){

      fieldRef.current.clear()
      setDiagram([])
      setLinks([])
      }

    },[nameOfDiagram])

    

return (

    <>
    <LinkBusinessCapabilities.Provider value = {{linkBusiness,updateLink}}>
    <BusinessCapabilities.Provider value = {{business,updateBusiness}}>
    <OpenPopup.Provider value = {{modalContent,updateOpen}}>
    <div >
    <ReactDiagram
          initDiagram={window.initDiagram}
          divClassName='myDiagramDiv'
          nodeDataArray = {mydiagram}
          
          linkDataArray={links} />
          
          {modelRef.current.open ? <PopupExample open = {modelRef.current.open} /> : null }
          {modelRef.current.openLink ? <PopUpLink openLink = {modelRef.current.openLink} /> : null }

  

          </div>
    </OpenPopup.Provider>
    </BusinessCapabilities.Provider>
    </LinkBusinessCapabilities.Provider>
    
</>
);
};

export default Diagram;
