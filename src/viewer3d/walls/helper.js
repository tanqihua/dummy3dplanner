export const cordinateConverter = (p1 , p2)=>{
    let len = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    return {
        len,
        angle
    }
}

export const get = (_p1 , _p2 , _p3 , thickness)=>{
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
    let p = findHalfAnglePointB(_p1, _p2, _p3 , Math.acos(cosB));
    let midm3 = (p.y - _p2.y) / (p.x - _p2.x);
    let midc3 = _p2.y - midm3 * _p2.x;
    // thickness line
    let thicknessEquation = findParallelLineEquation(m1, c1, thickness);
    let crossPoint1 = findIntersection(midm3, midc3, thicknessEquation.m, thicknessEquation.c1);
    let crossPoint2 = findIntersection(midm3, midc3, thicknessEquation.m, thicknessEquation.c2);
    // create a fomular from _p2 to parallel line 1
    let mm1 = -1 / m1;
    let cc1 = _p2.y - mm1 * _p2.x;
    let crossPoint3 = findIntersection(mm1, cc1, thicknessEquation.m, thicknessEquation.c1);
    let crossPoint4 = findIntersection(mm1, cc1, thicknessEquation.m, thicknessEquation.c2);

    let len = distanceBetweenTwoPoints(crossPoint1, crossPoint3);
    let len2 = distanceBetweenTwoPoints(crossPoint2, crossPoint4);
    
    // direction
    let c1Length = distanceBetweenTwoPoints(_p1, crossPoint1);
    let c2Length = distanceBetweenTwoPoints(_p1, crossPoint3);


    let check = _p1.x - _p2.x < 0 ? true : false;
    
    if(c1Length < c2Length && check){
        len = -len;
    }
    else{
        len2 = -len2;
    }

    return {
        l1 : len || 0,
        l2 : len2 || 0
    }
}

export function findParallelLineEquation(m, c, d) {
    let denominator = Math.sqrt(m * m + 1);    
    let c1 = c + d * denominator;
    let c2 = c - d * denominator;        
    return {
        m : m,
        c1 : c1,
        c2 : c2
    };
}

export function findHalfAnglePointB(A, B, C) {
    const AB = Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2);
    const BC = Math.sqrt((C.x - B.x) ** 2 + (C.y - B.y) ** 2);

    const D = {
        x: (A.x * BC + C.x * AB) / (AB + BC),
        y: (A.y * BC + C.y * AB) / (AB + BC)
    };
    
    return D
}

export const findIntersection = (m1, c1, m2, c2) => {
    let x = (c2 - c1) / (m1 - m2);
    let y = m1 * x + c1;

    return { x: x, y: y };
}

export const distanceBetweenTwoPoints = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}