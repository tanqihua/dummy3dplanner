import { useMemo } from 'react';
import CanvasSvg from './components/canvas';


const Index = () => {
    return (
        <CanvasSvg>
          <Circle/>
        </CanvasSvg>
    )
}

const Circle = ({position})=>{
    
    return (
      <g>
        <circle cx="4000" cy="4000" r="40" stroke="black" strokeWidth="3" fill="red" />
      </g>
    )
}

export default Index;