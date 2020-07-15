import React, {Component} from 'react';
//import Tile from './Tile/Tile';

import './PTVis.css';

const START_NODE_R = 0;
const START_NODE_S = 1;
const START_NODE_A = 0;
const START_NODE_B = 0;

const FINISH_NODE_R = 3;
const FINISH_NODE_S = 4;
const FINISH_NODE_A = 4;
const FINISH_NODE_B = 4;

const TILE_SIZE = 10;

export default class PTvis extends Component {
    constructor(props) {
      super(props);
      this.state = {
        vertices: [],
        canvasSize: { canvasWidth: 800, canvasHeight: 600},
        center: {x: 400, y: 300}
      };
      this.drawTile.bind(this);
      this.drawLine.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var verts = nextProps.vertices;
        this.setState({ vertices: verts=verts });

        const context = this.canvasHex.getContext('2d');
        context.clearRect(0, 0, this.state.canvasSize.canvasWidth, this.state.canvasSize.canvasHeight);

        for (let i = 0; i<verts.length; i++) {
            let vertexL = verts[i];
            this.drawTile(this.canvasHex, vertexL);
        }
    }

    componentDidMount() {
        const {canvasWidth, canvasHeight} = this.state.canvasSize;
        this.canvasHex.width = canvasWidth;
        this.canvasHex.height = canvasHeight;
        //const multigrid = getInitialGrid(this.state.dim, this.state.size, this.state.sV);
    }

    drawTile(canvasID, vertices) {
        for (let i = 0; i < 3; i++) {
            let start = vertices[i];
            let end = vertices[i+1];
            this.drawLine(canvasID, start, end);
        }
        this.drawLine(canvasID, vertices[3], vertices[0])
    }

    drawLine(canvasID, start, end) {
        const ctx = canvasID.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(start[0] + this.state.center.x, start[1] + this.state.center.y);
        
        ctx.lineTo(end[0] + this.state.center.x, end[1] + this.state.center.y);
        ctx.stroke();
        ctx.closePath();
    }

    render() {
        //const {dim, size, sV} = this.state;
        // const normVect = genNormVect(this.state.dim);
        // const multigrid = getInitialGrid(dim, size, sV);



        return (
            <>
                {/* <Form/> */}

                {/* <Form2/> */}

                <div>
                    <canvas ref={ canvasHex => this.canvasHex = canvasHex}></canvas>
                </div>

                {/* <div className="multigrid">
                    {multigrid.map((tile, pIdx) => {
                        const {r, a, s, b, vertices, isFinish, isStart} = tile;
                        return (
                            <Tile
                                key={pIdx}
                                r={r}
                                s={s}
                                a={a}
                                b={b}
                                vertices={vertices}
                                isFinish={isFinish}
                                isStart={isStart}
                            ></Tile>
                        );
                    })}
                </div> */}
            </>
        );
    }
}

// const getInitialGrid = (dim, size, sV) => {
//     const multigrid = [];
//     for (let r = 0; r < dim; r++) {
//         for (let a = -size; a < size+1; a++) {
//             for (let s = r+1; s < dim; s++) {
//                 for (let b = -size; b < size+1; b++) {
//                     if(dim%2 === 0 && s === r+((dim/2)-1)) {
//                         continue
//                     }
//                     multigrid.push(createTile(dim, sV, r, a, s, b));
//                 }
//             }
//         }
//     }
//     return multigrid;
// };
// 
// 
// const genNormVect = (dim) => {
//     const normVect = [];
//     for (let d = 0; d < dim; d++) {
//         const norm = [Math.cos((2*Math.PI*d)/dim), Math.sin((2*Math.PI*d)/dim)];
//         normVect.push(norm);
//     }
//     return normVect;
// };

// const createTile = (dim, sV, r, a, s, b) => {
//     return {
//       r, a, s, b,
//       vertices: genTileVerts(dim, sV, r, a, s, b),
//       isStart: r === START_NODE_R && s === START_NODE_S && a === START_NODE_A && b === START_NODE_B,
//       isFinish: r === FINISH_NODE_R && s === FINISH_NODE_S && a === FINISH_NODE_A && b === FINISH_NODE_B,
//       distance: Infinity,
//       isVisited: false,
//       isWall: false,
//       previousNode: null,
//     };
// };
// 
// const genTileVerts = (dim, sV, r, a, s, b) => {
//     const nV = genNormVect(dim);
//     var kp_x = 0;
//     var kp_y = 0;
//     var kp = [0,0];
//     if(nV[s-r][1] === 0) {
//         kp_x = (nV[r][0]*(b-sV[s]) - nV[s][0]*(a-sV[r])) / 0.0000001;
//         kp_y = (nV[r][1]*(b-sV[s]) - nV[s][1]*(a-sV[r])) / 0.0000001;
//         kp = [-kp_y, kp_x];
//     } else {
//         kp_x = (nV[r][0]*(b-sV[s]) - nV[s][0]*(a-sV[r])) / nV[s-r][1];
//         kp_y = (nV[r][1]*(b-sV[s]) - nV[s][1]*(a-sV[r])) / nV[s-r][1];
//         kp = [-kp_y, kp_x];
//     }
//     // Calculate the index of the tile, k
//     const k = [];
//     for (let d = 0; d < dim; d++) {
//         const i = nV[d];
//         const t = sV[d];
//         const kd = 1 + Math.floor(t+divComp(kp[0], kp[1], i[0], i[1]));
//         k.push(kd);
//     }
//     // Calculate vertex from an adjusted k
//     var kv = [];
//     const vertices = [];
//     const kr = [a, a+1, a+1, a];
//     const ks = [b, b, b+1, b+1];
//     for (let v = 0; v < 4; v++) {
//         kv = [];
//         for (let i = 0; i < k.length; i++) {
//             var k_v = 0;
//             if (i===r) {
//                 k_v = kr[v];
//             } else if (i===s) {
//                 k_v = ks[v];
//             } else {
//                 k_v = k[i];
//             }
//             kv.push(k_v);
//         }
//         var xV = 0;
//         var yV = 0;
//         for (let i = 0; i < k.length; i++) {
//             const t = nV[i];
//             const x = kv[i];
//             xV += x*t[0];
//             yV += x*t[1];
//         }
//         vertices.push([xV*TILE_SIZE, yV*TILE_SIZE]);
//     }
//     return vertices;
// };

// const divComp = (a, b, c, d) => {
//     var re = 0;
//     if (d < c) {
//         var doc = d/c;
//         re = (a + b*doc)/(c+d*doc);
//     } else {
//         var cod = c/d;
//         re = (b + a*cod)/(d + c*cod)
//     }
//     return re;
// };

