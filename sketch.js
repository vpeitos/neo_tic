
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

  if(roundNr == 10) {

    initialState();

    roundNr = 0;
  }







}

function initialState() {

  background(248);
  /*<--- Tablo --->*/
  noStroke();
  fill(138 , 133, 189);
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

function mousePressed() {

  if(roundNr%2 == 0){
    drawX();
  }
  else {
    drawCircle();
  }

  roundNr++;
  console.log(roundNr);
}

function drawCircle() {
  noFill();
  strokeWeight(9);
  /*<--- Circle --->*/
  stroke(115, 220, 230);
  ellipse(mouseX, mouseY, 63, 63);
}

function drawX() {
  noStroke();
  fill(58, 59, 99);

  rect(mouseX- 36, mouseY-4, 73, 9);  //horizontal
  rect(mouseX-4, mouseY-36, 9, 73); //vertical
}
