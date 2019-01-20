const canvasSketch = require('canvas-sketch')
const p5 = require('p5')

new p5()

const settings = {
  p5: true,
  animate: true,
  context: 'webgl',
  attributes: { antialias: true }
}

const SIGMA = 10
const RHO = 28
const BETA = 8 / 3
const DT = 0.01
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
  if (state.increment === true) {
    const d = p5.Vector.mult(createVector(
      SIGMA * (state.lastPos.y - state.lastPos.x),
      state.lastPos.x * (RHO - state.lastPos.z) - state.lastPos.y,
      state.lastPos.x * state.lastPos.y - BETA * state.lastPos.z
    ), DT)
    state.lastPos.add(d)
    state.points.push(state.lastPos.copy())
    if (state.points.length >= 1000) state.increment = false
  } else {
    state.points.shift()
    if (state.points.length === 0) state.increment = true
  }

  clear()
  background(COLOR_BACKGROUND)
  translate(0, 0, -50)
  rotateY(state.angle)
  rotateX(state.angle / 2)
  scale(8)
  stroke(COLOR_STROKE)  
  noFill()
  beginShape()
  state.points.forEach((pos, index) => {
    strokeWeight(index / 2)
    vertex(pos.x, pos.y, pos.z)
  })
  endShape()
  state.angle += 0.015
}

canvasSketch(sketch, settings)
