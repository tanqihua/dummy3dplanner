import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import {cordinateConverter , get} from './helper';
import { Wall } from './wall';
import {useStore} from "../../store";

const Index = ()=>{
    
    
    
    
    
    
    const {tempWalls} = useStore();

    let ratio = 0.005;

    const converWall = useMemo(()=>{
        let _ = tempWalls.map(({ start, end }) => ({
            start: [(start[0] - 2500) * ratio , (start[1] - 2500) * ratio],
            end: [(end[0] - 2500) * ratio , (end[1] - 2500) * ratio] // Adding 0 as the z-coordinate for the end point
        }));

        let temp = []

        _.map(({start , end})=>{
                let {len , angle} = cordinateConverter(
                    {x : start[0] , y : start[1]},
                    {x : end[0] , y : end[1]}
                )
                
                let __ = {
                    len,
                    angle,
                    start : [start[0] , 0 , start[1]]
                }
            
                temp.push(__)
        })

        return temp;
    },[tempWalls])

    return (
        <>
            {
                converWall && 
                converWall.map((_)=>{
                    return (
                        <Wall
                            position={_.start}
                            len = {_.len}
                            rotation={[0,_.angle,0]}
                        />
                    )
                })
            }
        </>
    )
}



export default Index;