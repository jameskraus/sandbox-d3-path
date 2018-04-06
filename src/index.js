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
  .innerRadius(2)

// Our BarChart, lightly adapted to take a onHover callback
// and the index of the currently hovered item
const BarChart = ({ data, onHover, hoverIndex }) => {
  const minXPos = 1
  const maxXPos = 9
  const maxYPos = 9

  const totalWidth = maxXPos - minXPos
  const widthPerElement = totalWidth / (data.length * 2 - 1)

  const scaleValue = d3
    .scaleLinear()
    .domain([0, Math.max(...data)])
    .range([0, 8])

  const scalePosition = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([minXPos, maxXPos - widthPerElement])

  const boxes = data.map((value, i) => {
    const xPos = scalePosition(i)
    const height = scaleValue(value)
    const yPos = maxYPos - height
    return {
      xPos,
      yPos,
      height,
    }
  })

  return (
    <svg viewBox="0 0 10 10">
      {boxes.map(({ xPos, yPos, height }, i) => (
        <rect
          x={xPos}
          y={yPos}
          width={widthPerElement}
          height={height}
          r="0.25"
          fill={colors[i]}
          stroke={hoverIndex === i ? '#333' : ''}
          onMouseEnter={() => onHover(i)}
        />
      ))}
    </svg>
  )
}

// Our pie chart, modified to take the onHover callback
// and hoverIndex
const PieChart = ({ data, onHover, hoverIndex }) => {
  const pieArcs = d3.pie()(data)
  const arcPaths = pieArcs.map(arcGenerator)

  return (
    <svg viewBox="0 0 10 10">
      <g transform="translate(5, 5)">
        {arcPaths.map((arc, i) => (
          <path
            d={arc}
            fill={colors[i]}
            stroke={hoverIndex === i ? '#333' : ''}
            onMouseEnter={() => onHover(i)}
          />
        ))}
      </g>
    </svg>
  )
}

// Our app container which stores the state
class App extends React.Component {
  state = {
    hoverIndex: null,
  }

  onHover = hoverIndex => {
    this.setState({ hoverIndex })
  }

  render() {
    return (
      <div>
        <BarChart
          onHover={this.onHover}
          hoverIndex={this.state.hoverIndex}
          data={this.props.data}
        />
        <PieChart
          onHover={this.onHover}
          hoverIndex={this.state.hoverIndex}
          data={this.props.data}
        />
      </div>
    )
  }
}

ReactDOM.render(<App data={data} />, document.getElementById('root'))
