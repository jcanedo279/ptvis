import React from 'react';

import axios from 'axios';

export default class GetV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dim: 5,
            size: 5,
            sV: [0,0,0,0,0],
            numTiles: 1210,
            vertices: [],
        };
        this.factorial.bind(this);
        this.apiCall.bind(this);
    }

    factorial(num) {
        var rval=1;
        for (var i = 2; i <= num; i++)
            rval = rval * i;
        return rval;
    }

    apiCall() {
        console.log("getV input props", this.props.dim, this.props.size, this.props.sV);
        axios.get("/api/getV", {
                params: {
                    dim: this.props.dim,
                    size: this.props.size,
                    sV: this.props.sV
                }
            }
        ).then(response => {
            var vertices = response.data.vertices
            // this.setState({ vertices: vertices=vertices });
            this.props.verticesHandler(response.data.vertices);
        })
        .catch(error => {
            console.log("Error in getV.apiCall(), error:" + error)
        });
    }

    componentWillReceiveProps(nextProps) {
        var d = nextProps.dim;
        var s = nextProps.size;
        var sv = nextProps.sV;
        console.log("getV componentWillReceiveProps", [d, s, sv]);
        if(d!=this.state.dim || s!=this.state.size || sv!=this.state.sV) {
            var tilesInGrid = ((2*s + 1)**2) * ((this.factorial(d) / (2*this.factorial(d-2))));
            this.setState({ dim: d=d, size: s=s, sV: sv=sv, numTiles: tilesInGrid=tilesInGrid });
            this.apiCall();
        }
    }

    render() {
        return (
            <div>
                <p>Dimmension: {this.state.dim}</p>
                <p>Size: {this.state.size}</p>
                <p>Shift Vector: {this.state.sV}</p>
                <br></br>
                <br></br>
                <p>Output:</p>
                <p>Num Tiles: { this.state.numTiles }</p>
                <p>Vertices Length: {this.state.vertices.length}</p>
            </div>
        )
    }
}