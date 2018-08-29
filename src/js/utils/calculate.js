
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
		sx = obj2.x - obj1.x,
		sy = obj2.y - obj1.y,

		dvx = obj1.dx - obj2.dx,
		dvy = obj1.dy - obj2.dy;

	if( sx*dvx + sy*dvy < 0 ){
		return;
	}

	const
		ang = -Math.atan2(sy, sx),
		m1 = obj1.mass,
		m2 = obj2.mass;

	let
		u1 = rotateVector(obj1.dx, obj1.dy, ang),
		u2 = rotateVector(obj2.dx, obj2.dy, ang),
		dx1 = u1.dx * (m1 - m2) / (m1 + m2) + u2.dx * 2 * m2 / (m1 + m2),
		dy1 = u1.dy,
		dx2 = u2.dx * (m2 - m1) / (m1 + m2) + u1.dx * 2 * m1 / (m1 + m2),
		dy2 = u2.dy;

	u1 = rotateVector(dx1, dy1, -ang);
	u2 = rotateVector(dx2, dy2, -ang);

	obj1.dx = u1.dx;
	obj1.dy = u1.dy;
	obj2.dx = u2.dx;
	obj2.dy = u2.dy;
	
};

export { getDistance, rotateVector, resolveCollision };
