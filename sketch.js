colorMode(RGB, 255, 255, 255, 100);

var roundNr;

/*<--- SETUP --->*/
function setup() {

    createCanvas(467, 487);
    background(248);
    initialState();

    roundNr = 0;
}

/*<--- DRAW --->*/
function draw() {

    whosTurn();

    if (roundNr == 10) {
        wonState();
    }

    if (roundNr == 11) {

        initialState();

        roundNr = 0;
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

function wonState() { //add later: parameter for circle and cross

    var tempVar = true;

    //Grey background
    noStroke();
    fill(236, 236, 238);
    rect(0, 68, 467, 354);

     if (tempVar) {
        //redundant
        noFill();
        strokeWeight(15);
        /*<--- Circle --->*/
        stroke(115, 220, 230);
        ellipse(234, 225, 134, 134);

    }
    else {

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

    roundNr++;
    console.log(roundNr);
}

function whosTurn() {
    noStroke();
    fill(248);
    rect(171,434,41,41);

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

function drawCircle() {
    noFill();
    strokeWeight(9);
    /*<--- Circle --->*/
    stroke(115, 220, 230);

    var x = drawOnGridX();
    var y = drawOnGridY();
    ellipse(x, y, 63, 63);
}

function drawCrossX() {
    noStroke();
    fill(58, 59, 99);

    var x = drawOnGridX();
    var y = drawOnGridY();
    crossX(x, y, 73, 9);
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

    if(x != -1) {
        return x;
    }
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

    if(y != -1) {
        return y;
    }

}
