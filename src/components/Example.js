import React from 'react';

import axios from 'axios';

export default class Example extends React.Component {
    dim = 3;
    state = {
        dim: this.dim,
        vertices: [0]*this.dim
    };


    componentDidMount() {
        axios.get("/api/example").then(response => {
            console.log(response.data);
            this.setState({ vertices: response.data.example });
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <p>Dim: {this.state.dim}</p>
                <p>Vertices: {this.state.vertices}</p>
            </div>
        )
    }
}
