import React, {Component} from 'react';

import './Tile.css';

export default class Node extends Component {
    render() {
        const {
            r, a, s, b,
            vertices,
            isFinish,
            isStart,
            isWall
          } = this.props;

        const extraClassName = isFinish
          ? 'node-finish'
          : isStart
          ? 'node-start'
          : isWall
          ? 'node-wall'
          : '';

        return (
            <div
              id={`tile-${r}-${a}-${s}-${b}`}
              className={`tile ${extraClassName}`}
            ></div>
          );
    }
}
