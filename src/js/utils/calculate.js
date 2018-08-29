
const getDistance = ( obj1, obj2 ) => {
	return Math.sqrt(Math.pow((obj1.x - obj2.x), 2) + Math.pow((obj1.y - obj2.y), 2));
};

const rotateVector = ( dx, dy, angle ) =>{
	const 
		_dx = dx * Math.cos(angle) - dy * Math.sin(angle),
		_dy = dx * Math.sin(angle) + dy * Math.cos(angle);

	return { dx:_dx, dy:_dy };
};

const resolveCollision = ( obj1, obj2 ) => {

	const 
		v1 = getObjSpeed(obj1),
		v2 = getObjSpeed(obj2),
		t1 = getObjSpeedAngle(obj1),
		t2 = getObjSpeedAngle(obj2),
		sx = obj1.x - obj2.x,
		sy = obj1.y - obj2.y,
		fi = Math.atan2(sy, sx),
		m1 = obj1.mass,
		m2 = obj2.mass,
		V1xr = v1*Math.cos(t1-fi),
		V1yr = v1*Math.sin(t1-fi),
		V2xr = v2*Math.cos(t2-fi),
		V2yr = v2*Math.sin(t2-fi);

		obj1.dx = Math.cos( fi ) * (V1xr * (m1 - m2) + 2 * m2 * V2xr) / (m1 + m2) +
			V1yr * Math.cos(fi + .5 * Math.PI),
		obj1.dy = Math.sin( fi ) * (V1xr * (m1 - m2) + 2 * m2 * V2xr) / (m1 + m2) +
			V1yr * Math.sin(fi + .5 * Math.PI),

		obj2.dx = Math.cos( fi ) * (V2xr * (m1 - m2) + 2 * m2 * V1xr) / (m1 + m2) +
			V2yr * Math.cos(fi + .5 * Math.PI),
		obj2.dy = Math.sin( fi ) * (V2xr * (m1 - m2) + 2 * m2 * V1xr) / (m1 + m2) +
			V2yr * Math.sin(fi + .5 * Math.PI);
};

const getObjSpeed = (obj) => {
	return Math.sqrt(Math.pow(obj.dx, 2) + Math.pow(obj.dy, 2));
};

const getObjSpeedAngle = (obj) => {
	return Math.atan2(obj.dy, obj.dx);
};

export { getDistance, rotateVector, resolveCollision };
