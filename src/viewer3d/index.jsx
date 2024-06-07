import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useRef } from 'react'
import { OrbitControls , Text} from '@react-three/drei'
import Griddd from './grids/grid-creator'


export default function(){
  
    return (
        <div
            style={{width : "100svw", height : "100svh"}}
        >
            <Canvas>
                <Griddd/>
                <OrbitControls makeDefault/>
            </Canvas>
        </div>
    )
}