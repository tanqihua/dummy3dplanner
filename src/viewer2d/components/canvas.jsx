import React, { useMemo, useState } from 'react';
import {useStore} from "../../store"


function DraggableDiv({
    children,
    isDrawWall
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [hoverPos , setHoverPos] = useState({x : 0 , y : 0});
  const store = useStore();

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = (e) => {
    if(isDrawWall && window.startPos){
      HanderMouseWallMove([e.clientX , e.clientY] , scale);
    }

    if (isDragging && !isDrawWall) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }else{
      setHoverPos({
        x : e.clientX,
        y : e.clientY,
      })
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    let newScale = e.deltaY < 0 ? scale * 1.1 : scale * 0.9; // Zoom in or out
  
    const mousePointTo = {
        x: hoverPos.x - position.x,
        y: hoverPos.y - position.y,
    };



    const newScalePoint = {
        x: mousePointTo.x * (newScale / scale),
        y: mousePointTo.y * (newScale / scale),
    };



    setPosition({
        x: hoverPos.x - newScalePoint.x,
        y: hoverPos.y - newScalePoint.y,
    });


    setScale(newScale);
  };


  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
      id='2dviewContainer'
    >
  
      <div
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onWheel={handleWheel}
        style={{
          width: "4000px",
          height: "4000px",
          position: 'absolute',
          transformStyle: 'preserve-3d',
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin : "0 0",
          cursor: isDragging ? 'grabbing' : 'grab',
          willChange: 'auto',
        }}


      >
        <svg width="100%" height="100%"
          viewBox='0 0 4000 4000'
        >
          <g
            etype="TPaper"
            transform="translate(-0.5, -0.5)scale(1)"
          >
            <pattern id="uid10" patternUnits="userSpaceOnUse" x="0.5" y="0.5" spreadMethod="pad" width="100" height="100">
              <image x="0" y="0" width="100" height="100" style={{ imageRendering: "auto" }} href="https://static.planner5d.com/textures/bg_1_fill_clear.png"/>
            </pattern>
            <rect fill="url(#uid10)" id="uid5" etype="rect" x="0" y="0" width="4000" height="4000"
              onClick={(e)=>{
                const svgElement = document.getElementById('uid5');
                const rect = svgElement.getBoundingClientRect();
        
                // Adjusting click coordinates
                let clickPos = [(e.clientX - rect.left) / scale, (e.clientY - rect.top) / scale]; 
                
                if(isDrawWall){
                    DrawWallHander(store , clickPos);
                }
              }}
            ></rect>

            {
                children
            }
          </g>
        </svg>
      </div>
    </section>
  );
}

const DrawWallHander = (store , pos)=>{
  const {addTempWall} = store;
  if(!window.startPos){
    window.startPos = pos;
    return;
  }
  else if(!window.endPos){
    window.endPos = pos;
    addTempWall({
      start : window.startPos,
      end : window.endPos
    });
    window.startPos = window.endPos;
    window.endPos = null;
    document.getElementById('showline').setAttribute('x1' , window.startPos[0]);
    document.getElementById('showline').setAttribute('y1' , window.startPos[1]);
  }
}

const HanderMouseWallMove = (pos , scale)=>{
  const svgElement = document.getElementById('uid5');
  const rect = svgElement.getBoundingClientRect();

  // Adjusting click coordinates
  let movingPos = [(pos[0] - rect.left) / scale, (pos[1] - rect.top) / scale]; 

  if(window.startPos){
    let line = document.getElementById('showline');
    line.setAttribute('x2' , movingPos[0]);
    line.setAttribute('y2' , movingPos[1]);
    line.setAttribute('x1' , window.startPos[0]);
    line.setAttribute('y1' , window.startPos[1]);
  }
}



export default DraggableDiv;