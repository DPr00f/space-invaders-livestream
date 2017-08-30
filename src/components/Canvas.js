import React from 'react';
import PropTypes from 'prop-types';

const PIXEL_RATIO = (() => {
   const ctx = document.createElement("canvas").getContext("2d");
   const dpr = window.devicePixelRatio || 1;
   const bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
  return dpr / bsr;
})();

class Canvas extends React.Component {
  static childContextTypes = {
    canvasContext: PropTypes.object,
    canvas: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      mounted: false
    };
    this.onResize = this.onResize.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  getChildContext() {
    return {
      canvasContext: this.context,
      canvas: this.canvas
    };
  }

  componentDidMount() {
    this.context = this.canvas.getContext('2d');
    this.makeCanvasHiPPI(this.canvas);
    window.addEventListener('resize', this.onResize);
    window.requestAnimationFrame(this.onUpdate);
    this.setState({
      mounted: true
    });
  }

  componentDidUpdate() {
    this.makeCanvasHiPPI(this.canvas);
  }

  onResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  onUpdate() {
    window.requestAnimationFrame(this.onUpdate);
    const ctx = this.context;
    ctx.clearRect(0, 0, this.state.width, this.state.height);
  }

  makeCanvasHiPPI(canvas) {
    const { offsetWidth, offsetHeight } = canvas;
    canvas.style.width = offsetWidth + "px";
    canvas.style.height = offsetHeight + "px";
  
    canvas.width = offsetWidth * PIXEL_RATIO;
    canvas.height = offsetHeight * PIXEL_RATIO;
  
    const context = canvas.getContext('2d');
    context.scale(PIXEL_RATIO, PIXEL_RATIO);
  }
  
  render() {
    const { width, height } = this.state;
    return (
      <canvas ref={c => (this.canvas = c)} width={width} height={height}>
        {this.state.mounted ? this.props.children : null}
      </canvas>
    );
  }
}

export default Canvas;