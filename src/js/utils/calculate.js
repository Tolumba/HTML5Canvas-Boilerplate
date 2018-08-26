
const getDistance = ( obj1, obj2 ) => {

	if(!(('x' in obj1) && ('y' in obj1) && ('x' in obj2) && ('y' in obj2))){
		return 0;
	}

	return Math.sqrt(Math.pow((obj1.x - obj2.x), 2) + Math.pow((obj1.y - obj2.y), 2));
}

const resolveCollision = ( obj1, obj2 ) => {

	const 
		sx = Math.abs(obj1.x - obj2.x),
		sy = Math.abs(obj1.y - obj2.y),
		ang = Math.atan2(sy, sx);


}

export { getDistance, resolveCollision };
