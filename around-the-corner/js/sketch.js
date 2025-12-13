let canvas;

let number = 3500;


let speedXlist = [];
let speedYlist = [];
let loXlist = [];
let loYlist = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
  
    for (let i = 0; i < number; i++) {
        loXlist[i] = width / 2;
        loYlist[i] = height / 2;

        speedXlist[i] = random(-5, 5);
        speedYlist[i] = random(-5, 5);
    }

}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    clear();
    // First one (item 0)


    for (let i = 0; i < loXlist.length; i++) {
        if ((loXlist[i] < 0) || (loXlist[i] > width - 52)) {
            speedXlist[i] = -speedXlist[i];
        }
        if ((loYlist[i] < 0 + 10) || (loYlist[i] > height)) {
            speedYlist[i] = -speedYlist[i];
        }

        loXlist[i] += speedXlist[i];
        loYlist[i] += speedYlist[i];
        // fill(255);


    }

    let groupSize = floor(number / 3);

    for (let i = 0; i < number; i++) {
        if (i < groupSize) {
            angleMode(DEGREES);
            fill(255);
            rotate(3);
        }
        else if (i < groupSize * 2) {
            fill(225);
        }
        else {
            fill(230);
            angleMode(DEGREES);
            rotate(3);
        }
        textAlign(CENTER, CENTER);
        text("where..?.", loXlist[i], loYlist[i]);
    }

}



