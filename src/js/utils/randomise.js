/**
 * Generates random integer in given range
 * @param  Number in1 Range border
 * @param  Number in2 Range border
 * @return Int     Random integer
 */
export const randomIntInRange = ( in1, in2 ) => {
	const 
		_in1 = in1||0,
		_in2 = in2||1,
		_min = Math.min( _in1, _in2 ),
		_max = Math.max( _in1, _in2 ),
		_diff = _max - _min;

	return Math.round( Math.random()*_diff + _min );
};

/**
 * Generates random Number in given range
 * @param  Number in1 Range border
 * @param  Number in2 Range border
 * @return Number     Random integer
 */
export const randomInRange = ( in1, in2 ) => {
	const 
		_in1 = in1||0,
		_in2 = in2||1,
		_min = Math.min( _in1, _in2 ),
		_max = Math.max( _in1, _in2 ),
		_diff = _max - _min;

	return Math.random()*_diff + _min;
};

/**
 * Select random value from given collection(iterable)
 * @param  iterable iterable Collection of smth.
 * @return Mixed          a value from given collection
 */
export const oneOf = (iterable) => {
	if( !( 'length' in iterable ) ){
		return false;
	}

	return iterable[randomIntInRange(0, iterable.length)];
};
