// Final Coding Project PRACTICE
// Adeeb Rahman
// 1.15.2025
//

let gorillaIdle = [];
let gorillaSwipe = [];
let gorillaState = 0; //0 = idle, 1 = swipe
let idleIndex = 0; 
let swipeIndex = 0;

let spirals = []; //for objects later on...
let spiralObjects = [];

function preload() {
  for (let i = 1; i <=6 ; i++) {
    gorillaIdle.push(loadImage("assets/Gorilla/idle" + i + ".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe" + i + ".png"));
  }


  //spiral images
  for (let i = 0; i <=15; i++) {
    if (i < 10) {
      spirals.push(loadImage("assets/Circle/Circle Animation0" + i + ".png"));
    }
    else {
      spirals.push(loadImage("assets/Circle/Circle Animation" + i + ".png"));
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  spiralObjects.push(new Spiral(mouseX, mouseY));
}

function draw() {
  background(220);

  //Gorilla Code
  if (gorillaState === 0) { //idle
    image(gorillaIdle[idleIndex], width/2, height/2);
    if (frameCount % 7 === 0) {
      idleIndex++;
      if (idleIndex > 5) {
        idleIndex = 0;
      }
    }
  }
    

  else if (gorillaState === 1) {
    image(gorillaSwipe[swipeIndex], width/2, height/2);
    if (frameCount % 7 === 0) {
      swipeIndex++;
      if (swipeIndex > 5) {
        swipeIndex = 0;
      }
    }
  }

  //spiral code
  for (let i  = 0; i < spiralObjects.length; i++) {
    let s = spiralObjects[i];
    s.display();
    if (s.active === false) {
      spiralObjects.splice(i, 1);
      i--;
    }
  }
}


function keyPressed() {
  if (gorillaState === 0) {
    gorillaState = 1;
  }
  else {
    gorillaState = 0;
  }
}

class Spiral {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentFrame = 0;
    this.active = true;
  }

  //class methods
  display() {
    if (this.currentFrame > 15) {
      this.active = false;
    }
    else {
      image(spirals[this.currentFrame], this.x, this.y);
      if (frameCount % 3 === 0) {
        this.currentFrame++;
      }
    }
  }
}
