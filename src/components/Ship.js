import React from 'react';
import PropTypes from 'prop-types';

class Ship extends React.Component {
  static contextTypes = {
    canvasContext: PropTypes.object
  }

  static defaultProps = {
    width: 30,
    y: 150
  }

  constructor(props) {
    super(props);
    this.state = {
      x: 0
    }
    this.onUpdate = this.onUpdate.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.requestAnimationFrame(this.onUpdate);
  }
  
  onMouseMove(e) {
    this.setState({
      x: e.pageX
    });
  }

  onUpdate() {
    window.requestAnimationFrame(this.onUpdate);
    this.drawShip();
  }

  drawShip() {
    const { width, y } = this.props;
    const { x } = this.state;
    const ctx = this.context.canvasContext;
    ctx.fillStyle = 'blue';
    ctx.fillRect(x - (width / 2), y + 5, width, 10);
    ctx.fillRect(x + 12 - (width / 2), y, 5, 5);
  }

  render() {
    return null;
  }
}

export default Ship;