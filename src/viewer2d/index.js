import React, { useEffect, useState } from 'react'
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';
import { useRef } from 'react';

const Index = () => {
  const Viewer = useRef(null);

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  /* Read all the available methods in the documentation */
  const _zoomOnViewerCenter = () => Viewer.current.zoomOnViewerCenter(1.1)
  const _fitSelection = () => Viewer.current.fitSelection(40, 40, 200, 200)
  const _fitToViewer = () => Viewer.current.fitToViewer()

  let width = window.innerWidth;
  let height = window.innerHeight;
  const [end , setEnd] = useState({x : 500 , y : 500});
  const getPathD = (start, end) => `M ${start.x + width /2},${start.y + height / 2} L ${end.x},${end.y}`;


  return (
    <div>
      <UncontrolledReactSVGPanZoom
        ref={Viewer}
        width={window.innerWidth} height={window.innerHeight}
        zoom={1}
        onZoom={e => console.log('zoom')}
        onPan={e => console.log('pan')}

        onMouseMove={event => {
          setEnd({
            x : event.x,
            y : event.y
          })
        }}
      >
        <svg width={width} height={height}>
          <path d={getPathD({x : 0 , y : 0}, {x : end.x , y : end.y})} fill="none" stroke="black" />
        </svg>
      </UncontrolledReactSVGPanZoom>
    </div>
  )
}

export default Index