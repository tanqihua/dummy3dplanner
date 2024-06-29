import { useEffect, useMemo } from 'react';
import CanvasSvg from './components/canvas';
import { useState } from 'react';
import {findParallelLineEquation , findIntersection} from "../viewer3d/walls/helper";
import { useControls } from 'leva';
import { useStore } from '../store';
import Wall2d from "./components/wall";

const Index = () => {
    const {
      isDrawWall,
      switchveiew
    } = useControls({
      isDrawWall: true,
      switchveiew : true
    });
    

    const store = useStore();
    const {tempWalls} = store;

    useMemo(() => {
      if(isDrawWall){
        window.startPos = null;
        window.endPos = null;
      }

      let view3d = document.getElementById("3dviewContainer");
      let view2d = document.getElementById("2dviewContainer");
      if(switchveiew && view2d && view3d){
        view2d.style.zIndex = 1;
        view3d.style.zIndex = 0;
        view2d.style.opacity = 1;
        view3d.style.opacity = 0;
      }
      else if(view2d && view3d){
        view2d.style.zIndex = 0;
        view3d.style.zIndex = 1;
        view2d.style.opacity = 0;
        view3d.style.opacity = 1;
      }
    }, [isDrawWall , switchveiew]);

    return (
        <CanvasSvg
          isDrawWall={isDrawWall}
        >
          {isDrawWall && <line x1="0" y1="0" x2="0" y2="0" stroke='red' id='showline' pointerEvents={"none"}/>}
          {tempWalls.map((pos , index)=>{
            return (
              <Wall2d key={index} pos={pos} />
            )
          })}
        </CanvasSvg>
    )
}



export default Index;