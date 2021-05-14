let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = [
    '#01BEFE',
    '#FFDD00',
    '#FF7D00',
    '#FF006D',
    '#ADFF02',
    '#8F00FF',
];

// const colors = [
//     '#45F002',
//     '#1F6B01',
// ];

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};


addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height =innerHeight;

    init();
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFromRange(min, max) {
    return (Math.random() * (max - min) + min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = randomFromRange(0.03, 0.05);
    this.distanceFromCenter = randomIntFromRange(50, 120);
    this.lastMouse = {x: x, y: y};

    this.update = function() {
        const lastPoint = {
            x: this.x,
            y: this.y
        };
        this.radians += this.velocity;

        //Drag Effect
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    };

    this.draw = function(lastPoint) {
        c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        // c.fillStyle = this.color;
        // c.fill();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y)
        c.lineTo(this.x, this.y)
        c.stroke()
        c.closePath();
    };
}

let particles;
function init() {
    particles = [];

    for (let index = 0; index < 100; index++) {
        const radius = (Math.random() * 5) + 2;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));

    }
}

function animate() {
    requestAnimationFrame(animate);
    // c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgba(0, 0, 0, 0.10)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();