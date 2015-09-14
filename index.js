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
ctx.font = '60px XitsMath';

var msg = "Hello, world";
ctx.fillText(msg, 100, 100);


msg = "\u{1D44E}\u{1D44F}" + String.fromCodePoint(0x1D450);
ctx.fillText(msg, 100, 200);
console.log(msg.charCodeAt(0).toString(16));




