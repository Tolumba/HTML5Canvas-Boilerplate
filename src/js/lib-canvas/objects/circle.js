/**
 * Circle Class
 */
export default class Circle{

	constructor( x, y, radius, style, phisics ){

		const
			_style = Object.assign({
				fillStyle: 'transparent',
				strokeStyle: 'black',
			}, style),

			_phisics = Object.assign({
				dx: 0,
				dy: 0,
				dragx: 0,
				dragy: 0,
				mass: 1,
			}, phisics);

		this.x = x;
		this.y = y;
		this.radius = radius;

		this.dx = _phisics.dx;
		this.dy = _phisics.dy;
		this.dragx = _phisics.dragx;
		this.dragy = _phisics.dragy;
		this.mass = _phisics.mass;

		this.fillStyle   = _style.fillStyle;
		this.strokeStyle = _style.strokeStyle;
	}

	draw( ctx ){
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.strokeStyle = this.strokeStyle;
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI*2 );
		ctx.fill();
		ctx.stroke();
	}

	update( ctx ){
		const
			canvas = ctx.canvas;

		if( this.x + this.radius > canvas.width || this.x - this.radius < 0 ){
			this.dx = -this.dx;
		}else{
			this.dx = this.dx + this.dragx;
		}

		if( this.x + this.radius > canvas.width ){
			this.x = canvas.width - this.radius;
		}

		if( this.x - this.radius < 0 ){
			this.x = this.radius;
		}

		if( this.y + this.radius > canvas.height || this.y - this.radius < 0 ){
			this.dy = -this.dy;
		}else{
			this.dy = this.dy + this.dragy;
		}

		if( this.y + this.radius > canvas.height ){
			this.y = canvas.height - this.radius;
		}

		if( this.y - this.radius < 0 ){
			this.y = this.radius;
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	render( ctx ){
		this.update( ctx );
		this.draw( ctx );
	}
}