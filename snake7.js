// rewrite snake code with global variables of xspeed and yspeed, a snake object, 
//and then a function wthin snake object that draws the snake, which is what we set to interval timers.
//event listners are global and change the global speed variables, which is then applied to thh snake when it is redrawn.

let xSpeed = 20;
let ySpeed = 0;
const snake = document.querySelector('.snake');
const board = document.querySelector('.board');
const fruit = document.querySelector('.fruit');
let xPosition = 60;
let yPosition = 20;
let tail = document.getElementsByClassName("tail"); //this is an html array like object
let fruitX;
let fruitY;
let count = 0;
let score = document.querySelector('.score');


function newFruit() {
    fruitX = Math.floor(Math.random() * 15) * 20;
    fruitY = Math.floor(Math.random() * 15) * 20;
   
    fruit.style.left = fruitX + 'px'
    fruit.style.top = fruitY + 'px'
}

newFruit();

let theSnake = {
    updateSnake: function() {
        //sets up event listener.
        //this used to be global but this caused a "quick turn" problem.
        //solved this but calling the event listener once per tick.
        listen();


        //tail array initializer variables
        let xpositions = [];
        let ypositions = [];

        //stores initial tail positions in an array to pass downward during update tail.
        for (i = 0; i<tail.length; i++) {
            xpositions.push(tail[i].style.left);
            ypositions.push(tail[i].style.top);
        }
    
        //updates position based on speed, but does not apply the update quiet yet. boundaries need to adjust first!
        xPosition += xSpeed;
        yPosition += ySpeed;
    
        //Moving these beneath the boundary conditions solved the gap problem!
        // snake.style.left = xPosition + 'px';
        // snake.style.top = yPosition + 'px';

       
        // console.log(xSpeed);

        

        //boundary - I THINK I NEED TO ABSTRACT THE VALUE FOR SNAKE.STYLE.LEFT INTO ANOTHER VARIABLE THAT I CAN ALTER.
        //Problem solved: storing xPosition and yPosition globally, as a single value, and with no recursive reference to snake.style.left.

       
            if (yPosition > 280) {
                yPosition = 0;
            }
            
            if (yPosition < 0) {
                yPosition = 280;
            }
            
            if (xPosition > 280) {
                xPosition = 0;
            }
            
            if (xPosition < 0) {
                xPosition = 280;
            }
            

            
            // moving this down below the boundary adjustments fixed the gap problem!
            //Now that boundary conditions have adjusted the x and y positions, we can display the new position.
            snake.style.left = xPosition + 'px';
            snake.style.top = yPosition + 'px';

        
        //zintis console log request
        // console.log(xpositions);
        // console.log(ypositions);

        // console.log(snake.style.left);
        // console.log(fruit.style.left);

        //tail inherits old positions.
        for (i = 1; i < tail.length; i++) {
            tail[i].style.left = xpositions[i-1];
            tail[i].style.top = ypositions[i-1];
            }

            // console.log(tail[1].style.left);
            
        
         //check snake for collision
         function checkCollision(){
            for (i = 1; i < tail.length; i++) {
                if (snake.style.left === xpositions[i] && snake.style.top === ypositions[i]){
                    clearInterval(loop);
                    alert('game over, your score is ' + count + '.');
                }
            }
        }

        checkCollision();

        //check for fruit
        function eatFruit(){
            if (snake.style.left == fruit.style.left && snake.style.top == fruit.style.top){
                newFruit();
                increaseTail();
                count += 1;
                score.innerHTML = count;
            }
        }

        eatFruit();
       

        function increaseTail(){
            let newTail = document.createElement('DIV');
            newTail.className = 'tail';
            board.appendChild(newTail);
            
        }
        } //end snake.update       


        
} //end snake object




function listen(){

    function listener(e) {
        switch (e.keyCode) {
            //up
            case 38:
            if (ySpeed !== 20) {
            ySpeed = -20;
            xSpeed = 0;
            window.removeEventListener("keydown", listener); //solves quickturn problem
            }
            break;
    
            //down
            case 40:
            if (ySpeed !== -20) {
            ySpeed = 20;
            xSpeed = 0;
            window.removeEventListener("keydown", listener);
            }
            break;
    
            //left
            case 37:
            if (xSpeed !== 20) {
            xSpeed = -20;
            ySpeed = 0;
            window.removeEventListener("keydown", listener);
            }
            break;
            
            //right
            case 39:
            if (xSpeed !== -20) {
            xSpeed = 20;
            ySpeed = 0;
            window.removeEventListener("keydown", listener);
            }
            break;
        }
    }

    window.addEventListener("keydown", listener);
} //end listen()



let loop = setInterval(theSnake.updateSnake, 150);
