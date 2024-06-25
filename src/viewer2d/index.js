import { useEffect, useMemo } from 'react';
import CanvasSvg from './components/canvas';
import { useState } from 'react';
import {findParallelLineEquation , findIntersection} from "../viewer3d/walls/helper";
const Index = () => {
    return (
        <CanvasSvg>
          <Circle/>
          {/* <LinePath/> */}
        </CanvasSvg>
    )
}

const Circle = ({position})=>{
    const [circlePosition , setCirclePosition] = useState({x : 2000 , y : 2000});

    useEffect(()=>{
      window.setCirclePosition = (position)=>{
        setCirclePosition(position);
      };
    },[position])
    return (
      <g>
        <circle 
          onClick={(e)=>{
            e.stopPropagation();
            console.log("clicked");
          }}
        cx={circlePosition.x} cy={circlePosition.y} r="180" stroke="black" strokeWidth="3" fill="red" />
      </g>
    )
}


const LinePath = ()=>{
  // M 28 31 L 259 29 L 247 39 L 28 40 z
  const [circlePosition , setCirclePosition] = useState({x : 2500 , y : 2500});

  useEffect(()=>{
    window.setCirclePosition = (position)=>{
      setCirclePosition(position);
    };
  },[])

  let centerX = 2000;
  let centerY = 2000;


  let line = useMemo(()=>{
    let m1 = (centerY - circlePosition.y) / (centerX - circlePosition.x);
    let c1 = centerY - m1 * centerX;
  
    let thickness = 10;
    let thicknessEquation = findParallelLineEquation(m1, c1, thickness);
  
    let nm = -1 / m1;
    let nc = centerY - nm * centerX;
    let ncEnd = circlePosition.y - nm * circlePosition.x;
  
    let crossPoint1 = findIntersection(nm, nc, thicknessEquation.m, thicknessEquation.c1);
    let crossPoint2 = findIntersection(nm, nc, thicknessEquation.m, thicknessEquation.c2);

    let crossPoint3 = findIntersection(nm , ncEnd , thicknessEquation.m , thicknessEquation.c1);
    let crossPoint4 = findIntersection(nm , ncEnd , thicknessEquation.m , thicknessEquation.c2);

    return `
      M ${crossPoint1.x} ${crossPoint1.y}
      L ${crossPoint3.x} ${crossPoint3.y}
      L ${crossPoint4.x} ${crossPoint4.y}
      L ${crossPoint2.x} ${crossPoint2.y}
      Z
    `
    
  
  },[circlePosition])




  return (
    <g>
      <path d={line} />
    </g>
  )
}

export default Index;