import styles from './../scss/styles.scss';

import Canvas from './lib-canvas/canvas.js';
import Circle from './lib-canvas/objects/circle.js';
import { randomIntInRange, randomInRange, oneOf } from './utils/randomise.js';

const component = () => {
	const element = document.createElement('div');
	let canvas;

	element.id = styles.app;
	element.innerHTML = `<h1 class="${styles.title}">Hello World!</h1>`;

	let
		objects_num = 100,
		objects = [],
		min_radius = 30,
		max_radius = 60,
		min_velocity = -5,
		max_velocity = 5,
		gravity = 0,
		wind = 0,
		object,
		x, y, radius, style, phisics;

	const colors = [
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
	];

	for( let i=0; i < objects_num; i++ ){

		radius = randomIntInRange( min_radius, max_radius );
		x = randomIntInRange( radius, innerWidth - radius );
		y = randomIntInRange( radius, innerHeight - radius );

		style = {
			fillStyle: oneOf(colors),
			strokeStyle: oneOf(colors),
		};

		phisics = {
			dx: randomIntInRange( min_velocity, max_velocity ),
			dy: randomIntInRange( min_velocity, max_velocity ),
			dragx: wind,
			dragy: gravity,
		};

		object = new Circle( x, y, radius, style, phisics );
		objects.push( object );
	}
	
	canvas = new Canvas(element, {
		styles: styles,
		objects: objects,
	});

	canvas.render();

	return element;
}

document.body.appendChild(component());
