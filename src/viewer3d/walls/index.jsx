import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import { compressNormals } from 'three/examples/jsm/utils/GeometryCompressionUtils.js';

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
    let p1 = {x : -8, y : 0}
    let p2 = {x : -7, y : -3}
    let p3 = {x : -3, y : 1}
    let p4 = {x : -1, y : 0}

    // let _ = get(p1, p2, p3, 0.1);
    let _2 = get(p2, p3, p4, 0.1);

    let {len, angle} = cordinateConverter(p1, p2);
    let {len : len2, angle : angle2} = cordinateConverter(p2, p3);
    let {len : len3, angle : angle3} = cordinateConverter(p3, p4);


    return (
        <>
            <Test 
                len={len} 
                height={1}
                position={[p1.x   , -1, p1.y]}
                rotation={[0, angle, 0]}
                ee = {-0.166}
                ee1 = {0.166}
            />
            <Test 
                len={len2} 
                height={1}
                position={[p2.x   , -1, p2.y]}
                rotation={[0, angle2, 0]}
                ss = {-0.166}
                ss1 = {0.166}
            />
            <Test
                len={len3} 
                height={1}
                position={[p3.x   , -1, p3.y]}
                rotation={[0, angle3, 0]}
            />
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
    let c = distanceBetweenTwoPoints(_p1, _p2);
    let a = distanceBetweenTwoPoints(_p2, _p3);
    let b = distanceBetweenTwoPoints(_p3, _p1);
    
    let m1 = (_p2.y - _p1.y) / (_p2.x - _p1.x);
    let c1 = _p1.y - m1 * _p1.x;
    let m2 = (_p3.y - _p2.y) / (_p3.x - _p2.x);
    let c2 = _p2.y - m2 * _p2.x;
    let m3 = (_p1.y - _p3.y) / (_p1.x - _p3.x);
    let c3 = _p3.y - m3 * _p3.x;
    
    let cosB = (a*a + c*c - b*b) / (2 * a * c);
    let p = findHalfAnglePointB(_p1, _p2, _p3);
    console.log(p);
    let midm3 = (p.y - _p2.y) / (p.x - _p2.x);
    let midc3 = _p2.y - midm3 * _p2.x;

    let thicknessEquation = findParallelLineEquation(m1, c1, thickness * 2);
    let crossPoint1 = findIntersection(midm3, midc3, thicknessEquation.m, thicknessEquation.c1);
    let crossPoint2 = findIntersection(midm3, midc3, thicknessEquation.m, thicknessEquation.c2);
    // create a fomular from _p2 to parallel line 1
    let mm1 = -1 / m1;
    let cc1 = _p2.y - mm1 * _p2.x;
    let crossPoint3 = findIntersection(mm1, cc1, thicknessEquation.m, thicknessEquation.c1);
    let crossPoint4 = findIntersection(mm1, cc1, thicknessEquation.m, thicknessEquation.c2);

    return p;
}

function findParallelLineEquation(m, c, d) {
    let denominator = Math.sqrt(m * m + 1);    
    let c1 = c + d * denominator;
    let c2 = c - d * denominator;        
    return {
        m : m,
        c1 : c1,
        c2 : c2
    };
}

function findHalfAnglePointB(A, B, C) {
    // Extract coordinates of points A, B, C
    let xA = A.x, yA = A.y;
    let xB = B.x, yB = B.y;
    let xC = C.x, yC = C.y;
    
    // Calculate vectors AB and AC
    let ABx = xB - xA;
    let ABy = yB - yA;
    let ACx = xC - xA;
    let ACy = yC - yA;
    
    // Calculate dot product and lengths of vectors
    let dot_product = ABx * ACx + ABy * ACy;
    let length_AB = Math.sqrt(ABx * ABx + ABy * ABy);
    let length_AC = Math.sqrt(ACx * ACx + ACy * ACy);
    
    // Calculate angle between vectors AB and AC
    let cos_angleB = dot_product / (length_AB * length_AC);
    let angleB = Math.acos(cos_angleB);
    
    // Calculate half of angleB
    let half_angleB = angleB / 2;
    
    // Calculate direction and length of vector AD
    let AD_length = length_AC * Math.tan(half_angleB);
    let AD_direction = [ACx / length_AC, ACy / length_AC];
    
    // Calculate coordinates of point D
    let xD = xA + AD_length * AD_direction[0];
    let yD = yA + AD_length * AD_direction[1];
    
    return [xD, yD];
}

const findIntersection = (m1, c1, m2, c2) => {
    let x = (c2 - c1) / (m1 - m2);
    let y = m1 * x + c1;

    return { x: x, y: y };
}

const distanceBetweenTwoPoints = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export default Index;