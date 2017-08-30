import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './components/Canvas';
import Rect from './components/Rect';
import Ship from './components/Ship';
import './main.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offsetX: 0,
            offsetY: 0
        };
        this.updateOffset = this.updateOffset.bind(this);
    }

    componentDidMount() {
        this.updateOffset();
    }

    updateOffset() {
        this.setState({
            offsetX: this.state.offsetX + 10
        });
        window.setTimeout(this.updateOffset, 1000);
    }

    renderEnemies() {
        const enemies = [];
        for(let i = 0; i < 10; i++) {
            enemies.push(
                <Rect
                    x={this.state.offsetX + ((i + 1) * 24)}
                    y={this.state.offsetY + 20}
                    key={`enemy-${i}`}
                    width={20}
                    height={20}
                    fillStyle='#fff' />
            );
        }
        return enemies;
    }

    render() {
        return (
            <Canvas>
                {this.renderEnemies()}
                <Ship y={400}/>
            </Canvas>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
