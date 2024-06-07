import * as THREE from 'three';
import {Text} from '@react-three/drei'
export const Verticle = ({
  width = 10,
  height = 10,
  step = 0.1,
}) => {
  let arr = []
  let counter = 0

  for(let i=0; i<=width; i+=step){
      let geometry = new THREE.BufferGeometry()
      geometry.setFromPoints([
          new THREE.Vector3(i, 0, 0),
          new THREE.Vector3(i, 0, -height)
      ])
    
      let color = "#aaa"
      let material = new THREE.LineBasicMaterial({ color })

      arr.push(
          <line geometry={geometry} material={material} key={"v" + i}/>
      )

      
      if(counter % 5 === 0){
        arr.push(
          <Text
            key={"t" + i}
            position={[i, 0, 0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            fontSize={0.2}
            color={"#aaa"}
          >
            {i}
          </Text>
        )
      }

      counter++
  }

  
  return (
      <group
          name="grid"
      >
          {
              arr
          }
      </group>
  )
}


export const Horizontal = ({
  width = 10,
  height = 10,
  step = 0.1,
}) => {
  let arr = []
  let counter = 0

  for(let i=0; i<=height; i+=step){
      let geometry = new THREE.BufferGeometry()
      geometry.setFromPoints([
          new THREE.Vector3(0, 0, -i),
          new THREE.Vector3(width, 0, -i)
      ])
    
      let color = "#aaaaaa"
      let material = new THREE.LineBasicMaterial({ color })

      arr.push(
          <line geometry={geometry} material={material} key={"h" + i}/>
      )

      if(counter % 5 === 0 && i !== 0){
        arr.push(
          <Text
            key={"t" + i}
            position={[-0.2, 0, -i]}
            rotation={[-Math.PI/2, 0, 0]}
            fontSize={0.2}
            color={"#aaa"}
          >
            {i}
          </Text>
        )
      }

      counter++
  }

  
  return (
      <group
          name="grid"
      >
          {
              arr
          }
      </group>
  )
}

export default function({width = 20, height = 20, step = 1}){
  return (
      <group
        position={[-width/2, -1, height/2]}
      >
          <Verticle width={width} height={height} step={step}/>
          <Horizontal width={width} height={height} step={step}/>
      </group>
  )
}