import * as THREE from 'three';

export const Wall = ({
    len = 4,
    height = 2,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    ee = 0,
    ee1 = 0,
    ss = 0,
    ss1 = 0,
    thickness = 0.2
})=>{
    const geometry = new THREE.BufferGeometry();
  
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
    const material = new THREE.MeshBasicMaterial( { color: 0x000000 , wireframe : true} );

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
