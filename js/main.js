class Shooter{
    constructor(x , y, bulletController){
        this.positionX =x;
        this.positionY = y;
        this. bulletController = bulletController ;
        this.width = 1;
        this.height = 10;
        this.speed = 4;
        this.positionX = 50 - this.width/2;
        this.positionY = 10;

        this.domElement = null; // we will store a ref. to the dom element of the player

        this.createDomElement();
        this.shoot();
    }
shoot() {
  console.log("shoot the target");
    const bullet = new Bullet(this.positionX) 
    bulletArr.push(bullet);
        //this.bulletController.shoot(bulletX, bulletY, speed, delay, damage)
}
    createDomElement(){
        // step1: create the element
        this.domElement = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.id = "shooter";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }

    moveLeft(){
        this.positionX--; //modify the position
        this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
        
    }
    moveRight(){
        this.positionX++; //modify the position
        this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    }
}

let bulletArr = [];
class Bullet {
    constructor(x){
    this.positionX = x;
    this.positionY = 18;
    this.width = 0.3;
    this.height = 2;

    this.domElement = null;
    this.createDomElement ();
    }
    createDomElement(){
        this.domElement = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.className = "bullet";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
       
    }
    moveUp(){
        this.positionY++;
        this.domElement.style.bottom = this.positionY + "vh";
    }

}

setInterval(() => {
    bulletArr.forEach((bulletInstance) => {

        // Move current obstacle
        bulletInstance.moveUp();
    });
}, 60);


class Obstacle {
    constructor(){
        this.width = 5;
        this.height = 10;
       // this.randomX = Math.random() * 50
       this.positionX = Math.floor(Math.random() * (100 - this.width));
        this.positionY = 100;

        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        // step1: create the element
        this.domElement = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //step3: append to the dom: `parentElm.appendChild()`
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }
    moveDown(){
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
}
 

const shooter = new Shooter();
//const bulletController = new BulletController();
const obstaclesArr = []; // will store instances of the class Obstacle


// Create new obstacles
setInterval(() => {
   const newObstacle = new Obstacle();
   obstaclesArr.push(newObstacle);
}, 2000);


// Update obstacles
setInterval(() => {
    obstaclesArr.forEach((obstacleInstance) => {

        // Move current obstacle
        obstacleInstance.moveDown();

        // Detect collision
        if (obstacleInstance.positionX < shooter.positionX + shooter.width &&
            obstacleInstance.positionX + obstacleInstance.width > shooter.positionX &&
            obstacleInstance.positionY < shooter.positionY + shooter.height &&
            obstacleInstance.height + obstacleInstance.positionY > shooter.positionY) {
            console.log("game over my fren");
            location.href = './gameover.html';
        }

        // Detect if obstacle needs to be removed
        if(obstacleInstance.positionY < 0 - obstacleInstance.height){

            //1. remove elm from the dom
            obstacleInstance.domElement.remove();

            //2. remove from the array of obstacles
            obstaclesArr.shift(); //remove from the array

        }

    });
}, 60);


// Attach event listeners...
document.addEventListener("keydown", (event) => {
    if(event.code === "ArrowLeft"){
        shooter.moveLeft();
    } else if (event.code === "ArrowRight"){
        shooter.moveRight();
    }
})
document.addEventListener('click', (event) => {
           shooter.shoot(); 
});

