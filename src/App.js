import React from 'react';
import './App.css';
import PTVis from './PTVis/PTVis';

//import Example from "./components/Example";
import GetV from "./components/GetV";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dim: 4,
      size: 2,
      sV: [0,0,0,0],
      vertices: []
    }
  }
  
  render() {
    return (
      <div className="App">

        <Form submitHandler={s => {
          var dim = s.dim;
          var size = s.size;
          var sV = s.sV;
          this.setState({ dim: dim=dim, size: size=size, sV: sV=sV },() => 
          console.log("Form submit handled, state after (this should be updated w/ state): ", this.state));
        }}/>

        <GetV dim={this.state.dim} size={this.state.size} sV={this.state.sV}
              verticesHandler={v => {
                this.setState({ vertices: v=v },() => console.log("Vertices submit handled, state after (this should be updated w/ v)", this.state));
              }
        }/>
        <PTVis  vertices={ this.state.vertices }/>

      </div>
    );
  }
}



class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dim: 5,
      size: 3,
      sV: [0,0,0,0,0],
    };
    this.handleDim = this.handleDim.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleSV = this.handleSV.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDim = (event) => {
    console.log("Dim", event.target.value);
    this.setState({ dim: event.target.value=event.target.value })
  }

  handleSize = (event) => {
    console.log("Size", event.target.value);
    this.setState({ size: event.target.value=event.target.value })
  }

  handleSV = (event) => {
    console.log("sV", event.target.value);
    this.setState({ sV: event.target.value=event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitHandler( this.state );
  };

  render() {
    return (
      <div className="Form">
        <form>
          <label htmlFor="idim">Dimmension: {this.state.dim}</label>
          <input type="int" id="idim" name="idim" onChange={this.handleDim}/>
          <br></br>
          <label htmlFor="isize">Size: {this.state.size}</label>
          <input type="int" id="isize" name="isize" onChange={this.handleSize}/>
          <br></br>
          <label htmlFor="lsV">Shift Vector:  {this.state.sV}</label>
          <input type="text" id="lsV" name="lsV" onChange={this.handleSV}/>
          <br></br>
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
          <br></br>
          <br></br>
        </form>
      </div>
    );
  }
}

export default App;
