import React from 'react';
import PropTypes from 'prop-types';

class Rect extends React.Component {
  static contextTypes = {
    canvasContext: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.onUpdate);
  }

  onUpdate() {
    window.requestAnimationFrame(this.onUpdate);
    this.drawRect();
  }

  drawRect() {
    const { x, y, width, height, fillStyle } = this.props;
    const ctx = this.context.canvasContext;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, width, height);
  }
  
  render() {
    return null;
  }
}

export default Rect;