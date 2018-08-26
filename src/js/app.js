import styles from './../scss/styles.scss';

import Canvas from './lib-canvas/canvas.js';
import Circle from './lib-canvas/objects/circle.js';
import { randomIntInRange, randomInRange, oneOf } from './utils/randomise.js';
import { getDistance } from './utils/calculate.js';

const generateCircle = (settings) => {

	let x, y, radius, style, phisics;

	radius = randomIntInRange( settings.min_radius, settings.max_radius );
	x = randomIntInRange( radius, innerWidth - radius );
	y = randomIntInRange( radius, innerHeight - radius );

	style = {
		fillStyle: oneOf(settings.colors),
		strokeStyle: oneOf(settings.colors),
	};

	phisics = {
		dx: randomInRange(settings.min_velocity, settings.max_velocity),
		dy: randomInRange(settings.min_velocity, settings.max_velocity),
		dragx: settings.wind,
		dragy: settings.gravity,
	};

	/*while( phisics.dx == 0 ){
		phisics.dx = randomIntInRange( settings.min_velocity, settings.max_velocity );
	}

	while( phisics.dy == 0 ){
		phisics.dy = randomIntInRange( settings.min_velocity, settings.max_velocity );
	}*/

	return new Circle( x, y, radius, style, phisics );
};

const isValidObject = (obj, collection) => {

	let distance;

	if( collection.length == 0 ){
		return true;
	}

	for( let i=0; i < collection.length; i++ ){

		if( obj === collection[i] ) {
			continue;
		};

		distance = getDistance( obj, collection[i] );

		if( distance <= (obj.radius + collection[i].radius) ){
			console.log('invalid');
			return false;
		}
	}

	return true;
}

const component = () => {

	const
		element = document.createElement('div');

	element.id = styles.app;
	element.innerHTML = `<h1 class="${styles.title}">Hello World!</h1>`;

	let
		canvas,

		objects_num = 100,
		objects = [],
		object;

	const
		generatorSettings = {
			min_radius: 20,
			max_radius: 40,
			min_velocity: -2,
			max_velocity: 2,
			gravity: .04,
			wind: .01,

			colors: [
				'#D4018F',
				'#4C0033',
				'#87005B',
				'#EC85CB',
				'#F059BF',
				'#FF9302',
				'#633900',
				'#B16500',
				'#FFCF90',
				'#FFBB5F',
				'#5E12C4',
				'#1F0343',
				'#370678',
				'#B18AE5',
				'#9D64EA',
				'#FFE802',
				'#635A00',
				'#B1A100',
				'#FFF590',
				'#FFF15F',
			],
		};

	while( objects.length < objects_num ){

		object = generateCircle( generatorSettings );

		isValidObject( object, objects ) && objects.push( object ) && console.log( object );
	}
	
	canvas = new Canvas(element, {
		styles: styles,
		objects: objects,
	});

	canvas.render();

	return element;
}

document.body.appendChild(component());
