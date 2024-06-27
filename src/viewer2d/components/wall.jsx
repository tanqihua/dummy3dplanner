import { useMemo } from "react";
import { findIntersection, findParallelLineEquation } from "../../viewer3d/walls/helper";

const LinePath = (props)=>{  
    const {start , end} = props?.pos;
    let line = useMemo(()=>{
      let m1 = (start[1] - end[1]) / (start[0] - end[0]);
      let c1 = start[1] - m1 * start[0];
    
      let thickness = 10;
      let thicknessEquation = findParallelLineEquation(m1, c1, thickness);
    
      let nm = -1 / m1;
      let nc = start[1] - nm * start[0];
      let ncEnd = end[1] - nm * end[0];
    
      let crossPoint1 = findIntersection(nm, nc, thicknessEquation.m, thicknessEquation.c1);
      let crossPoint2 = findIntersection(nm, nc, thicknessEquation.m, thicknessEquation.c2);
  
      let crossPoint3 = findIntersection(nm , ncEnd , thicknessEquation.m , thicknessEquation.c1);
      let crossPoint4 = findIntersection(nm , ncEnd , thicknessEquation.m , thicknessEquation.c2);
  
      return `
        M ${crossPoint1.x} ${crossPoint1.y}
        L ${crossPoint3.x} ${crossPoint3.y}
        L ${crossPoint4.x} ${crossPoint4.y}
        L ${crossPoint2.x } ${crossPoint2.y}
        Z
      `
    },[])
  
    return (
      <g>
        <path d={line} />
      </g>
    )
}



export default LinePath;