var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var c = canvas.getContext('2d');

var mouse = {
  x:undefined,
  y:undefined
}

var colorArray = [
  "#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66", "#ff1100", "rgb(136, 173, 246)"
]


// Event Listeners
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})
//For working even in the case of resizing, in simple words we 
// are trying to make it responsive
window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();//on changing the screen size, all the stuff should need to be reinitialized
})



// Objects
var Ball = function(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.gravity = 1;
    this.friction = 0.95;

  this.draw = function(){
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    this.update();
  }
  this.update = function() {
      if(this.y + this.radius + 5 > window.innerHeight){
          this.dy = -this.dy * this.friction;
      }
      else{
        this.dy += this.gravity;
      }
      if(this.x+(2*this.radius) > window.innerWidth || (this.x-(2*this.radius)) < 0) {
        this.dx = -this.dx;
      }
      this.y += this.dy;
      this.x += this.dx;
  }
}

function randomIntFromRange(mini, maxi){
  return Math.floor((Math.random()*(maxi-mini)) + mini);
}


var ballArray;
function init() {
  ballArray = [];
  for(let i=0; i<200; i++){
      let radius = randomIntFromRange(20, 40);
      let x = randomIntFromRange(radius, canvas.width-(radius));
      let y = randomIntFromRange(radius, canvas.height-(radius));
      let dx = randomIntFromRange(-3, 3);
      let dy = randomIntFromRange(2, 5);
      let color = colorArray[randomIntFromRange(0, colorArray.length-1)];
      ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  for(let i=0; i<ballArray.length; i++){
      ballArray[i].draw();
  }
}

init()
animate();
//dont recall animate as it is already running even on resizing the screen size;