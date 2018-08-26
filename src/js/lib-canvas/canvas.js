import { getDistance, resolveCollision } from '../utils/calculate.js';

/**
 *  Canvas Class
 */
"use strict";
export default class Canvas{
	constructor( element, settings ){

		const 
			_defaults = {
				context: '2d',
				contextAtts: {},
				objects: [],
				styles: {}
			},
			_settings = settings||{},
			DOMRender = self => {
				self._canvas = document.createElement('canvas');

				self._canvas.id = self.config.styles.canvas || 'canvas';

				self.element.appendChild( self._canvas );
				self._context = self.getContext( self.config.context, self.config.contextAtts);

				self.resize( window.innerWidth, window.innerHeight );
				self.update();
			};

		this.element = false;
		switch(true){
			case element instanceof HTMLElement:
				this.element = element;
				break;
			case 'string' === typeof element:
			default:
				this.element = document.getElementById(element);
				break;
		}

		if( !this.element ){
			throw( new TypeError( 'Expect first parameter to be a valid element ID(String) or a HTMLElement reference' ) );
			return;
		}

		this.config = Object.assign( {}, _defaults, _settings );

		DOMRender(this);

		window.addEventListener( 'resize', this.onWindowResize.bind(this) );
	}

	onWindowResize(e){

		if( this._resizeTimeout ){
			clearTimeout( this._resizeTimeout );
		}

		this._resizeTimeout = setTimeout( this.resize.bind(this), 50, innerWidth, innerHeight );
	}

	resize( width, height ){
		this._canvas.width = width;
		this._canvas.height = height;
	}

	update(){
		for( let object of this.config.objects ){
			object && 'function' == typeof object.render && object.update(this._context);
		}
		this.detectCollisions();
	}

	detectCollisions(){
		let
			distance,
			objects = this.config.objects;


		for( let object of objects ){

			for( let i=0; i < objects.length; i++ ){

				if( object === objects[i] ) {
					continue;
				};

				distance = getDistance( object, objects[i] );

				if( distance <= (object.radius + objects[i].radius) ){
					//object.fillStyle = 'red';
					resolveCollision( object, objects[i] );
				}
			}
		}
	}

	draw(){
		for( let object of this.config.objects ){
			object && 'function' == typeof object.draw && object.draw(this._context);
		}
	}

	render(){
		window.requestAnimationFrame( this.render.bind(this) );
		this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
		
		this.update();
		this.draw();
	}

	getContext( context, contextAtts ){
		return this._context = this._canvas.getContext(context, contextAtts);
	}

	get canvas(){
		return this._canvas;
	}

	get context(){
		return this._context;
	}
}
