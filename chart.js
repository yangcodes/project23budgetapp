const chart = document.querySelector(".chart");
const canvas = document.createElement("canvas");

//dimensions
canvas.height = 120;
canvas.width = 120;

chart.appendChild(canvas);

//initializing a 2d context
const context2D = canvas.getContext("2d");

context2D.linewidth = 10;

const radius = 50;

//drawCircle function
function drawCircle(color, ratio, anticlockwise) {
  context2D.strokeStyle = color;
  context2D.beginPath();
  context2D.arc(60, 60, radius, 0, ratio * Math.PI * 2, anticlockwise);
  context2D.stroke();
}

drawCircle("red", 0.25, false);
drawCircle("green", 0.25, true);
