import React, {Component} from "react"
import "./DNAChart.css"

class DNAChart extends Component {
  // GET MAX & MIN X & Y
  getMinX() {
    const {data} = this.props;
    return data[0].x;
  }
  getMaxX() {
    const {data} = this.props;
    return data[data.length - 1].x;
  }
  getMinY() {
    const {data} = this.props;
    return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
  }
  getMaxY() {
    const {data} = this.props;
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
  }
  // GET SVG COORDINATES OF X & Y
  getSvgX(x) {
    const {svgWidth} = this.props;
    return (x / this.getMaxX() * svgWidth);
  }
  getSvgY(y) {
    const {svgHeight} = this.props;
    return svgHeight - (y / this.getMaxY() * svgHeight);
  }
  // AXIS
  makeAxis() {
  const minX = this.getMinX(), maxX = this.getMaxX();
  const minY = this.getMinY(), maxY = this.getMaxY();

  return (
    <g className="dnachart_axis">
      <line
        x1={this.getSvgX(minX)} y1={this.getSvgY(minY)+15}
        x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)+15} />
      <line
        x1={this.getSvgX(minX)} y1={this.getSvgY(minY)+15}
        x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)+15} />
    </g>
    );
  }
  // BUILD DATA POINTS
  makeDataPoints() {
    const {data, color} = this.props;
    return (
      <g>
        {
          data.map((point, i) => {
            return (
              <circle
                key={i}
                className='dnachart_point'
                style={{stroke: color}}
                r={(Math.random(point.x))*15} // 3rd COORDINATE DEFINES THE RADIUS OF CIRCLE
                cx={this.getSvgX(point.x)}
                cy={this.getSvgY(point.y)}
              />
            );
          })
        }
      </g>
    );
  }
  // RETURN SVG PATH AND AXIS
  render() {
    const {svgHeight, svgWidth} = this.props;

    return (
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={'dnachart'}>
        {this.makeAxis()}
        {this.makeDataPoints()}
      </svg>
    );
  }
}
// DEFAULT PROPS
DNAChart.defaultProps = {
  data: [],
  color: '#2196F3',
  svgHeight: 300,
  svgWidth: 700
}

export default DNAChart;
