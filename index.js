const canvasSketch = require('canvas-sketch')
const p5 = require('p5')

new p5()

const settings = {
  p5: true,
  animate: true,
  context: 'webgl',
  attributes: { antialias: true }
}

const A = 10
const B = 28
const C = 8 / 3
const dt = 0.01
const COLOR_STROKE = color(239, 22, 191, 12)
const COLOR_BACKGROUND = '#2B262D'

const state = {
  angle: 0,
  lastPos: createVector(0.1, 0, 0),
  points: [],
  increment: true
}

const sketch = () => draw

const draw = () => {
  let { angle, lastPos, points, increment } = state

  if (increment === true) {
    const d = p5.Vector.mult(createVector(
      A * (lastPos.y - lastPos.x),
      lastPos.x * (B - lastPos.z) - lastPos.y,
      lastPos.x * lastPos.y - C * lastPos.z
    ), dt)
    lastPos.add(d)
    points.push(lastPos.copy())
    if (points.length >= 1000) increment = false
  } else {
    points.shift()
    if (points.length === 0) increment = true
  }

  clear()
  background(COLOR_BACKGROUND)
  translate(0, 0, -50)
  rotateY(angle)
  rotateX(angle / 2)
  scale(8)
  stroke(COLOR_STROKE)  
  noFill()
  beginShape()
  points.forEach((pos, index) => {
    strokeWeight(index / 2)
    vertex(pos.x, pos.y, pos.z)
  })
  endShape()
  angle += 0.015
}

canvasSketch(sketch, settings)
