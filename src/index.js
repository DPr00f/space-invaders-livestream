import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './components/Canvas';
import Rect from './components/Rect';
import './main.scss';

const App = () => (
    <Canvas>
        <Rect x={20} y={20} width={100} height={100} fillStyle='#f00' />
    </Canvas>
);

ReactDOM.render(<App />, document.getElementById('root'));
