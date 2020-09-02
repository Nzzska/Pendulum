const canvas = document.getElementById('sandbox');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// freefall acceleration on Earth's surface
var g = 0.1;

function circle (x, y, radius, colour)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = colour;

//v - velocity a - acceleration
    // SI units

    this.ropeLength = Math.sqrt(Math.pow(canvas.width / 4, 2) + Math.pow(canvas.height / 2, 2));
    this.vx = 0;
    this.vy = 0;
    this.ax;
    this.ay;
    this.angle;
    this.centripetalAcceleration;

    this.draw = function() 
    {
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'brown';
        ctx.moveTo(canvas.width/2, 0);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = this.colour;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'pink';
        ctx.fillStyle= 'pink';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + g*1000);
        ctx.lineTo(this.x + 10, this.y + g*1000 -10);
        ctx.lineTo(this.x, this.y + g*1000);
        ctx.lineTo(this.x - 10, this.y + g*1000 -10);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';
        ctx.fillStyle= 'white';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x + Math.cos(Math.PI/2 - this.angle) * this.centripetalAcceleration * 1000, 
            this.y - Math.sin(Math.PI/2 - this.angle) * this.centripetalAcceleration * 1000
            );
        ctx.stroke();
        ctx.closePath();
    }

    this.animate = function() {
        this.angle = Math.atan((canvas.width / 2 - this.x)/(this.y));
        this.centripetalAcceleration = (Math.pow(this.vx, 2) + Math.pow(this.vy, 2))/this.ropeLength + g * Math.cos(this.angle);
        this.ax = this.centripetalAcceleration * Math.sin(this.angle);
        this.ay = -this.centripetalAcceleration * Math.cos(this.angle) + g;
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
        this.draw();
    }
}

function Update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pendulum.animate();
    requestAnimationFrame(Update);
}


pendulum = new circle(canvas.width/4, canvas.height/2, 50, 'red');
Update();