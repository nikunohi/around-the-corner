let canvas;
let font;

let bttns = [];
let quantity = 10;


function preload() {
    font = loadFont('../typefaces/OverusedGrotesk-SemiBold.otf');
}
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    background(225);
    textFont(font);


    for (let i= 0; i < quantity; i++) {
        let b = createButton("GRATIFY ME");
        b.position(random(width-50), random(height-30));
        b.mousePressed(redirect);
        bttns.push(b);
    }
    bttn = createButton("GRATIFY ME");
    bttn.mousePressed(redirect);


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    clear();

    fill("#ff0000");
    textSize(22);
    text("Things that are uncertain, things that are mercurial and entropic, things that go beyond our expectations create potential for gratification.", mouseX, mouseY, 275, 500);




}

function redirect() {
    window.location.href = "../index.html";
}