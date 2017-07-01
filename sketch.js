colorMode(RGB, 255, 255, 255, 1);

var roundNr;

function Game() {       //the Game Object

        this.cells = [];    //array that keeps track of which Cell is filled with Xs or Os
        this.play = true;   //boolean that shows play or pause state

        this.testWin = function() { //the function tests all possible win cases for X or O
            var winner = -1;

            for(var i = 0; i < 3; i++){
                if(game.cells[0 + i] != 0   //Horizontal Check
                    && game.cells[0 + i] == game.cells[3 + i]
                    && game.cells[3 + i] == game.cells[6 + i]){

                        winner = game.cells[0 + i];

                }
                else if(game.cells[i * 3] != 0   //Vertical Check
                        && game.cells[i * 3] == game.cells[(i * 3)+1]
                        && game.cells[(i * 3)+1] == game.cells[(i * 3)+2]){

                            winner = game.cells[i * 3];
                }
                else if(game.cells[0] != 0      //Diagonal Check 1
                        && game.cells[0] == game.cells[4]
                        && game.cells[4] == game.cells[8]) {

                            winner = game.cells[4];
                }
                else if(game.cells[2] != 0      //Diagonal Check 2
                        && game.cells[2] == game.cells[4]
                        && game.cells[4] == game.cells[6]) {

                            winner = game.cells[4];
                }

            }
            if(winner != -1){           //if there is a winner
                wonState(winner);       //draw the winner Screen
                this.play = false;
                showNewGameButton();    //show New Game Button to start a new Game
            }
        }

        this.testEnd = function() {     //Checks if the Board is full
            var isThisTheEnd = true;

            for(var i = 0; i < 9; i++){
                if(game.cells[i] == 0){ //if at least one cell is empty go on
                    isThisTheEnd = false;
                }
            }

            if(isThisTheEnd){
                this.play = false;
                showNewGameButton();    //show New Game Button to start a new Game
            }

        }

        this.restart = function() {     //Restart the Game
            this.play = true;
            game.fillArray();           //empty the Cell array (fill it with 0s)
            initialState();             //draw the empty board
        }

        this.fillArray = function() {   ////The function that empties the Cell array (filling it with 0s)
            for(var i=0; i<9; i++){
                this.cells[i] = 0;
            }
        }
}

/*<--- SETUP --->*/
function setup() {

    createCanvas(467, 487); //width 467px, height 487px

    game = new Game();  //Create new Game Object
    game.fillArray();   //initializes the board Cells with 0's

    initialState();     //draws a blank Board

    roundNr = 0;        //counter keeps the number of rounds mostly to decide whos turn it is
}

/*<--- DRAW --->*/
function draw() {

    if(game.play){
        whosTurn();     //Shows whos turn it is
    }

    game.testWin();     //has anybody won already?
    game.testEnd();     //is the Board filled?

}

function initialState() {           //Draw an empty Board

    background(248);

    /*<--- Text --->*/
    fill(110);
    textSize(32);
    textAlign(CENTER);
    text("TICK TACK", 233, 45);

    /*<--- Tablo --->*/
    noStroke();
    fill(138, 133, 189);
    rect(0, 68, 467, 354);

    fill(0, 0, 0, 30); //Color: Black opacity 30

    /*<--- Vertical Lines --->*/
    rect(177, 91, 9, 306);
    rect(282, 91, 9, 306);

    /*<--- Horizontal Lines --->*/
    rect(81, 187, 306, 9);
    rect(81, 292, 306, 9);
}

function wonState(winner) {

    //Grey background
    noStroke();
    fill(236, 236, 238); // Color: Light Grey
    rect(0, 68, 467, 354);

     if (winner == 2) { // 2 for Winner is the player with O's
        circleO(234, 225, 134, 15);    //Big Circle
    }
    else if(winner == 1) { // 1 for Winner is the player with X's
        crossX(234, 225, 134, 15);      //Big Cross
    }

    //text: Won the game
    fill(184, 184, 190);
    noStroke();
    textSize(32);
    textAlign(CENTER);
    text("WON THE GAME", 234, 346);

}

function mousePressed() {

    if(game.play){                  //While we are still playing
        if (roundNr % 2 == 0) {     //for even round numbers draw a Cross in the Cell
            drawCrossX();
        }
        else {
            drawCircle();           //for odd round numbers draw a Circle in the Cell
        }
    }
    else {                          //when the game is paused cause of full Board or Winner (New game button is showing)
        if((mouseX > 155 && mouseX < 312) && (mouseY > 433 && mouseY < 475)){      // Click on New Game Button
            game.restart();                                                        // and start a new Game
        }
    }
}

function whosTurn() {
    //Hide Message Whos Turn it is
    noStroke();
    fill(248);
    rect(171,434,150,41);

    if(game.play) {             //While we are playing Show whos turn it is
        if(roundNr%2 == 0) {

            crossX(192, 454, 35, 4);
        }
        else{

            circleO(192, 454, 35, 4);

        }

        //text = "s TURN"
        fill(184, 184, 190);
        noStroke();
        textSize(15);
        textAlign(LEFT,CENTER);
        text("s TURN", 215, 455);
    }
}




function showNewGameButton() {  //When the game is paused show the New Game Button to start a new game
    fill(33, 195, 168);
    noStroke();
    rect(155, 433, 157, 43);
    ellipse(159,455,42,43);
    ellipse(312,455,42,43);

    fill(255);
    textSize(15);
    textAlign(CENTER);
    text("NEW GAME", 234, 454);
}

function drawCircle() {     //draw a circle

    var x = drawOnGridX();  //draw it in the Cell boundaries
    var y = drawOnGridY();  // the x, y values contain the Coordinates of the center of the cell

    if(x != -1 && y != -1){
        index = translateCoordToCell(x,y);  //returns in which cell the player clicked
        if(game.cells[index] == 0){
            game.cells[index] = 2; // 1 for Cross, 0 for Circle
            roundNr++;
            circleO(x, y, 63, 9);
        }

    }

}

function drawCrossX() {

    var x = drawOnGridX();
    var y = drawOnGridY();

    if(x != -1 && y != -1) {
        index = translateCoordToCell(x,y);
        if(game.cells[index] == 0){
            game.cells[index] = 1; // 1 for Cross, 0 for Circle
            roundNr++;
            crossX(x, y, 73, 9);
        }
    }
}

/*<--- Custom Shape Function Cross --->*/
function crossX(x, y, w, h) {
    rectMode(CENTER);

    noStroke();
    fill(58, 59, 99);               //Color: Dark blue for Cross

    rect(x, y, w, h);
    rect(x, y, h, w);

    rectMode(CORNER);
}

function circleO(x, y, radius, lineStroke) {
    noFill();
    strokeWeight(lineStroke);
    stroke(115, 220, 230);    //Color: teal for Circle

    ellipse(x, y, radius, radius);
}

// Cross and Circles are placed on the Grid
function drawOnGridX() { //returns the center (middle) x Coordinate of each cell

    var x = -1;

    if(mouseX > 81 && mouseX < 177) {
        x = 129;
    }
    else if(mouseX > 186 && mouseX < 282) {
        x = 234;
    }
    else if(mouseX > 291 && mouseX < 387) {
        x = 339;
    }

    return x;
}

function drawOnGridY() {    //returns the center (middle) y Coordinate of each cell

    var y = -1;

    if(mouseY > 91 && mouseY < 187) {
        y = 139;
    }
    else if(mouseY > 196 && mouseY < 292) {
        y = 244;
    }
    else if(mouseY > 301 && mouseY < 397) {
        y = 349;
    }

    return y;
}

function translateCoordToCell(CoordX, CoordY) { //translates the middle coordiantes to the cell number of the array
    if(CoordX == 129){
        x = 0;
    }
    else if(CoordX == 234){
        x = 1;
    }
    else if(CoordX == 339){
        x = 2;
    }

    if(CoordY == 139){
        y = 0;
    }
    else if(CoordY == 244){
        y = 1;
    }
    else if(CoordY == 349){
        y = 2;
    }

    return x+(y*3);
}
