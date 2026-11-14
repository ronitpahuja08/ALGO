// Interactive axis-aligned bounding box (AABB) collision visualizer.
var movingRect, fixedRect, isPointerMode = true;
var collisions = 0, wasOverlapping = false;
var INITIAL_MOVING = { x: 180, y: 180 };
var INITIAL_FIXED = { x: 470, y: 210 };
var lastStatus = '';
function setup() {
  var canvas = createCanvas(800, 410);
  canvas.parent('demo');
  fixedRect = createSprite(INITIAL_FIXED.x, INITIAL_FIXED.y, 145, 120);
  movingRect = createSprite(INITIAL_MOVING.x, INITIAL_MOVING.y, 130, 95);
  select('#reset-lab').mousePressed(resetLab);
}
function resetLab() {
  collisions = 0; wasOverlapping = false; isPointerMode = false;
  movingRect.position.x = INITIAL_MOVING.x; movingRect.position.y = INITIAL_MOVING.y;
}
function mouseMoved() { isPointerMode = true; }
function touchMoved() { isPointerMode = true; return false; }
function keyPressed() {
  if ([37, 38, 39, 40].indexOf(keyCode) !== -1) isPointerMode = false;
  if (key === 'r' || key === 'R') resetLab();
}
function draw() {
  background(245, 248, 252);
  if (isPointerMode && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    movingRect.position.x = mouseX;
    movingRect.position.y = mouseY;
  } else if (!isPointerMode) {
    if (keyIsDown(LEFT_ARROW)) movingRect.position.x -= 4;
    if (keyIsDown(RIGHT_ARROW)) movingRect.position.x += 4;
    if (keyIsDown(UP_ARROW)) movingRect.position.y -= 4;
    if (keyIsDown(DOWN_ARROW)) movingRect.position.y += 4;
  }
  movingRect.position.x = constrain(movingRect.position.x, movingRect.width / 2, width - movingRect.width / 2);
  movingRect.position.y = constrain(movingRect.position.y, movingRect.height / 2, height - movingRect.height / 2);
  const fixedBounds = { x: fixedRect.position.x, y: fixedRect.position.y, width: fixedRect.width, height: fixedRect.height };
  const movingBounds = { x: movingRect.position.x, y: movingRect.position.y, width: movingRect.width, height: movingRect.height };
  const overlap = intersectionRectangle(fixedBounds, movingBounds);
  const overlapping = overlap !== null;
  const status = overlapping ? 'Collision detected' : 'No collision';
  if (status !== lastStatus) { select('#lab-status').html(status); lastStatus = status; }
  if (overlapping && !wasOverlapping) collisions++;
  wasOverlapping = overlapping;
  fixedRect.shapeColor = overlapping ? color(255, 199, 93) : color(87, 111, 233);
  movingRect.shapeColor = overlapping ? color(250, 83, 111) : color(55, 181, 144);
  drawSprites();
  if (overlap) {
    push(); noFill(); stroke(25, 40, 65); strokeWeight(2); rectMode(CENTER);
    rect(overlap.x, overlap.y, overlap.width, overlap.height); pop();
  }
  noStroke(); fill(25, 40, 65); textSize(18);
  text(status.toUpperCase(), 18, 30);
  textSize(13); text('Collision entries: ' + collisions, 18, 52);
  text('Overlap area: ' + Math.round(overlap ? overlap.width * overlap.height : 0) + ' px²', 18, 74);
  fill(255, 255, 255, 210); rect(16, height - 45, 290, 28, 6);
  fill(45, 55, 70); textSize(12); text('AABB: overlapping along X AND Y', 25, height - 26);
}
