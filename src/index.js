import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import * as d3 from 'd3'

const data = [1, 2, 3, 10, 4, 5, 6]

// An array of nice colors for the chart
const colors = d3.schemeSet2

// Creates a function that returns the path 'd' attribute
// for some set of arc properties
const arcGenerator = d3
  .arc()
  .outerRadius(4)
  .innerRadius(0)
  .startAngle(0)

// Create an array of arc properties
const pieArcs = d3.pie()(data)

// Create the 'd' attrbutes from the arc properties
const arcPaths = pieArcs.map(arcGenerator)

const App = () => (
  <svg viewBox="0 0 10 10">
    <g transform="translate(5, 5)">
      {arcPaths.map((arc, i) => <path d={arc} fill={colors[i]} />)}
    </g>
  </svg>
)

ReactDOM.render(<App />, document.getElementById('root'))
