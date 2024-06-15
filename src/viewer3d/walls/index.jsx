import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

const Wall = ({
    x = 2   ,
    height = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
}, ...rest)=>{
    const wallShape = new THREE.Shape();
    wallShape.moveTo(0, 0);
    wallShape.lineTo(x, 0);
    wallShape.lineTo(x, height);
    wallShape.lineTo(0, height);
    wallShape.lineTo(0, 0);

    const wallGeometry = new THREE.ExtrudeGeometry(wallShape, {
        depth: 0.1,
        bevelEnabled: false
    });
    

    return (
        <mesh geometry={wallGeometry} material={new THREE.MeshStandardMaterial({ color: 0xff9999 , wireframe : true})}
            position={position}
            rotation={rotation}
            {...rest}
        >
        </mesh>
    )
}

const Test = ({
    len = 4,
    height = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    ee = 0,
    ee1 = 0,
    ss = 0,
    ss1 = 0,
})=>{
    const geometry = new THREE.BufferGeometry();
  
    const thickness = 0.1;
    const vertices = new Float32Array([
        -height/2, -thickness,  0 - ss, // v0
        height/2, -thickness,  0 - ss, // v1
        height/2,  thickness,  0 - ss1, // v2
        -height/2,  thickness,  0 - ss1, // v3
        -height/2, -thickness, -len + ee, // v4
        height/2, -thickness, -len + ee, // v5
        height/2,  thickness, -len + ee1, // v6
        -height/2,  thickness, -len + ee1 // v7
    ]);

    // transform vertices rotation
    const angle = Math.PI / 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const z = vertices[i + 1];
        vertices[i] = x * cos - z * sin;
        vertices[i + 1] = z * cos + x * sin;
    }
    
    const indices = new Uint32Array([
        0, 1, 2, // front face
        2, 3, 0,
        1, 5, 6, // right face
        6, 2, 1,
        7, 6, 5, // top face
        5, 4, 7,
        4, 0, 3, // left face
        3, 7, 4,
        3, 2, 6, // back face
        6, 7, 3,
        0, 4, 5, // bottom face
        5, 1, 0
    ]);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));        
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 , wireframe : true} );

    let _pos = [
        position[0],
        height/2 - 1,
        -position[2]
    ]

    let colors = [
        0xff0000,
        0x00ff00,
        0x0000ff,
        0xff00ff
    ]

    return (
        <mesh material={material} geometry={geometry}
            position={_pos}
            rotation={[rotation[0],rotation[1] - Math.PI/2,rotation[2]]}
        >
        </mesh>
    )
}

const Index = ()=>{
    let p1 = {x : 0, y : 0}
    let p2 = {x : 1, y : 2}
    let p3 = {x : 2, y : 2}

    let _ = get(p1, p2, p3, 0.1);
   

    let {len, angle} = cordinateConverter(p1, p2);
    let {len : len2, angle : angle2} = cordinateConverter(p2, p3);
    let t = 0.1;

    

    return (
        <>
            <Test 
                len={len} 
                height={1}
                position={[p1.x   , -1, p1.y]}
                rotation={[0, angle, 0]}
                ee1 = {-0.06}
                ee = {0.05}
            />
            <Test 
                len={len2} 
                height={1}
                position={[p2.x   , -1, p2.y]}
                rotation={[0, angle2, 0]}
            />
            {/* <Test 
                len={_.len} 
                height={1}
                position={[_.pp.x, -1, _.pp.y]}
                rotation={[0, _.angle, 0]}
            /> */}
        </>
    )
}

const cordinateConverter = (p1 , p2)=>{
    let len = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    return {
        len,
        angle
    }
}

const get = (_p1 , _p2 , _p3 , thickness)=>{
    let len1 = Math.sqrt(Math.pow(_p1.x - _p2.x, 2) + Math.pow(_p1.y - _p2.y, 2));
    let len2 = Math.sqrt(Math.pow(_p2.x - _p3.x, 2) + Math.pow(_p2.y - _p3.y, 2));
    let len3 = Math.sqrt(Math.pow(_p3.x - _p1.x, 2) + Math.pow(_p3.y - _p1.y, 2));
    console.log(len1, len2, len3)
    
    let m1 = (_p2.y - _p1.y) / (_p2.x - _p1.x);
    let m2 = (_p3.y - _p2.y) / (_p3.x - _p2.x);
    let c1 = _p1.y - m1 * _p1.x;
    let c2 = _p2.y - m2 * _p2.x;

    // find the angle between the two lines
    let _angle = Math.atan((m2 - m1) / (1 + m1 * m2));
    // value only from 0 to 180 or 0 to -180
    _angle = _angle < 0 ? _angle + Math.PI : _angle;

    
    return null;
}


export default Index;