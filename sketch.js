colorMode(RGB, 255, 255, 255, 100);

var roundNr;


/*<--- SETUP --->*/
function setup() {

    createCanvas(467, 487);
    //background(248);
    game = new Game();
    game.fillArray();
    console.log(game.cells[0]);
    initialState();

    roundNr = 0;
}

/*<--- DRAW --->*/
function draw() {

    console.log(game.pause);
    if(!game.pause){
        whosTurn();
    }
    game.testWin();


    if (roundNr == 11) {

        initialState();

        roundNr = 0;
    }


}

function Game() {

        this.cells = [];
        this.pause = false;



        this.testWin = function() {
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
                else if(game.cells[0] != 0
                        && game.cells[0] == game.cells[4]
                        && game.cells[4] == game.cells[8]) {

                            winner = game.cells[4];
                }
                else if(game.cells[2] != 0
                        && game.cells[2] == game.cells[4]
                        && game.cells[4] == game.cells[6]) {

                            winner = game.cells[4];
                }

            }
            if(winner != -1){
                wonState(winner);
            }
        }
        this.testEnd = function() {
            var isThisTheEnd = false;

        }
        this.restart = function() {

        }
        this.fillArray = function() {
            for(var i=0; i<9; i++){
                this.cells[i] = 0;
            }
        }
}


function initialState() {

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

    /*<--- Vertical Lines --->*/
    fill(0, 0, 0, 30);
    rect(177, 91, 9, 306);

    fill(0, 0, 0, 30);
    rect(282, 91, 9, 306);

    /*<--- Horizontal Lines --->*/
    fill(0, 0, 0, 30);
    rect(81, 187, 306, 9);

    fill(0, 0, 0, 30);
    rect(81, 292, 306, 9);
}

function wonState(winner) { //add later: parameter for circle and cross

    game.pause = true;
    //Grey background
    noStroke();
    fill(236, 236, 238);
    rect(0, 68, 467, 354);

     if (winner == 2) {
        //redundant
        noFill();
        strokeWeight(15);
        /*<--- Circle --->*/
        stroke(115, 220, 230);
        ellipse(234, 225, 134, 134);

    }
    else if(winner == 1) {

        noStroke();
        fill(58, 59, 99);

        crossX(234, 225, 134, 15);
    }

    //text: Won the game
    fill(184, 184, 190);
    noStroke();
    textSize(32);
    textAlign(CENTER);
    text("WON THE GAME", 234, 346);

}

function mousePressed() {


    if (roundNr % 2 == 0) {
        drawCrossX();
    }
    else {
        drawCircle();
    }

    console.log("Round Nr = " + roundNr);
}

function whosTurn() {
    //Hide Turn
    noStroke();
    fill(248);
    rect(171,434,150,41);

    if(game.play) {
        if(roundNr%2 == 0) {
            noStroke();
            fill(58, 59, 99);
            crossX(192, 454, 35, 4);
        }
        else{
            noFill();
            stroke(115, 220, 230);
            strokeWeight(4);
            ellipse(192, 454, 35, 35);
        }

        fill(184, 184, 190);
        noStroke();
        textSize(15);
        textAlign(LEFT,CENTER);
        text("s TURN", 215, 455);
    }
}

function translateCoordToCell(CoordX, CoordY) {
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
    console.log(x+(y*3));
    return x+(y*3);
}

function drawCircle() {
    var index = -1;

    noFill();
    strokeWeight(9);
    /*<--- Circle --->*/
    stroke(115, 220, 230);

    var x = drawOnGridX();
    var y = drawOnGridY();

    console.log("drawCircle(): x=" + x + " y = " + y);

    if(x != -1 && y != -1){
        index = translateCoordToCell(x,y);
        if(game.cells[index] == 0){
            game.cells[index] = 2;
            roundNr++;
            ellipse(x, y, 63, 63);
        }

    }

}

function drawCrossX() {
    noStroke();
    fill(58, 59, 99);

    var x = drawOnGridX();
    var y = drawOnGridY();

    if(x != -1 && y != -1) {
        index = translateCoordToCell(x,y);
        if(game.cells[index] == 0){
            game.cells[index] = 1;
            roundNr++;
            crossX(x, y, 73, 9);
        }
    }
}

/*<--- Custom Shape Function Cross --->*/
function crossX(x, y, w, h) {
    rectMode(CENTER);

    rect(x, y, w, h);
    rect(x, y, h, w);
    rectMode(CORNER);
}

// Cross and Circles are placed on the Grid
function drawOnGridX() {

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

function drawOnGridY() {

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
