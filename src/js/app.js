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
		dx: randomInRange(-settings.velocity, settings.velocity),
		dy: randomInRange(-settings.velocity, settings.velocity),
		dragx: settings.wind,
		dragy: settings.gravity,
		mass: settings.density*radius,
	};

	while( phisics.dx == 0 ){
		phisics.dx = randomInRange(-settings.velocity, settings.velocity);
	}

	while( phisics.dy == 0 ){
		phisics.dy = randomInRange(-settings.velocity, settings.velocity);
	}

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

		objects_num = 300,
		objects = [],
		object;

	const
		generatorSettings = {
			min_radius: 90,
			max_radius: 100,
			velocity: 4,
			gravity: 0,
			wind: 0,
			density: 1,

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

	const
		retry_limit = 2000;

	let
		iterations = 0;

	while( objects.length < objects_num ){

		object = generateCircle( generatorSettings );

		isValidObject( object, objects ) && objects.push( object );

		if( iterations++ > retry_limit ){
			break;
		};
	}
	
/*
	objects.push( new Circle( 600, 700, 100, {}, {dx:-6, dy:-6, mass:100} ) );
	objects.push( new Circle( 100, 200, 80, {}, {dx:6, dy:6, mass:80} ) );
*/
	canvas = new Canvas(element, {
		styles: styles,
		objects: objects,
	});


	document.body.addEventListener('click', (e) =>{
		canvas.idle = !canvas.idle;
		canvas.render();
		/*
		if( canvas.idle ){
			canvas.detectCollisions();
			for( let obj of canvas.config.objects ){
				console.log( obj );
			}
		}
		*/
	});

	canvas.render();

	return element;
}


document.body.appendChild(component());
