import React, { useEffect } from 'react'

import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric'; // Added import for fabric

const Index = () => {
  const { editor, onReady } = useFabricJSEditor();


  const AddLine = (x , y , canvas) => {
    window.line = new fabric.Line([x, y, x, y], {
        stroke: 'red',
        strokeWidth: 15,
    });
    canvas.add(window.line);
    canvas.renderAll();
  }

  return (
    <div>
        <button onClick={()=>AddLine(100, 100)}>Add Line</button>
        <FabricJSCanvas className="sample-canvas" 
            onReady={(canvas)=>{
                canvas.selection = false
                canvas.setWidth(window.innerWidth)
                canvas.setHeight(window.innerHeight)
                onReady(canvas)

                canvas.on('mouse:down', function(options) {
                const pointer = canvas.getPointer(options.e);
                window.mouseDown = true

                AddLine(pointer.x, pointer.y, canvas)
                })
                canvas.on('mouse:up', function(options) {
                const pointer = canvas.getPointer(options.e);
                window.mouseDown = false
            })

            canvas.on('mouse:move', function(options) {
            const pointer = canvas.getPointer(options.e);

            if(window.mouseDown){
                
                window.line.set({ x2: pointer.x, y2: pointer.y });
                canvas.renderAll();
            }
            })
      }}
      />    
    </div>
  )
}

export default Index