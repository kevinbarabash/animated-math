document.body.style.background = 'gray';
document.body.style.margin = '0';

var canvas = document.createElement('canvas');

var ratio = window.devicePixelRatio;

canvas.width = 800 * ratio;
canvas.height = 600 * ratio;
canvas.style.width = "800px";
canvas.style.height = "600px";
canvas.style.background = 'white';

document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

ctx.scale(ratio, ratio);

ctx.font = '100 84px Helvetica Neue';

let math = "x + 1 = 5";
let [left, right] = math.split("=");

let space = ctx.measureText(" ").width;

let createRun = function(math) {
    let regex = /[a-z]|[0-9]|[\+\-\=]|[\u0374-\u03FF]/g;
    let m, x = 0, y = 0;
    let children = [];
    let anchor = { x:0, y:0 };
    while (m = regex.exec(math)) {
        let codePoint = m[0].charCodeAt(0);

        if (/[a-z]/.test(m[0])) {
            //codePoint = m[0].charCodeAt(0) - 97 + 0x1D44E;
        }
        if (m[0] === "-") {
            codePoint = 0x2212;
        }
        if (/[\+\-=]/.test(m[0])) {
            x += space;
        }
        let glyph = String.fromCodePoint(codePoint);
        let width = ctx.measureText(glyph).width;

        children.push({ glyph, x, y });
        if (m[0] === "=") {
            anchor.x = x + width / 2;
        }

        x += width;
        if (/[\+\-=]/.test(m[0])) {
            x += space;
        }
    }

    return {
        children, anchor
    };
};

let drawRun = function(run, x, y) {
    for (let glyph of run.children) {
        ctx.fillText(
            glyph.glyph,
            glyph.x + x - run.anchor.x,
            glyph.y + y - run.anchor.y
        );
    }
};


let drawAxes = function() {
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 600);
    ctx.moveTo(0, 300);
    ctx.lineTo(800, 300);
    ctx.stroke();
};


let run = createRun(math);

let draw = function() {
    ctx.clearRect(0, 0, 800, 600);
    run = createRun(math);
    drawRun(run, 800 / 2, 600 / 2 + 21);
    //drawAxes();
    //requestAnimationFrame(draw);
};

draw();

let updateButton = document.getElementById('updateButton');
let updateText = document.getElementById('updateText');

updateButton.addEventListener('click', function() {
    console.log(updateText.value);
    ctx.clearRect(0, 0, 800, 600);

    left += updateText.value;
    right += updateText.value;

    math = [left, right].join("=");

    run = createRun(math);

    draw();
});
