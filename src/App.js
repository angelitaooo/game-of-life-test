import React, { Component } from 'react';
import './App.css';

class App extends Component {
  rows = 5;
  cols = 5;
  constructor() {
    super();
    this.state = {

    }
  }

  createGrid = (rows = this.rows, cols = this.cols) => {
    const grid = [];
    for(let i = 0; i < rows; i++) {
      const rows = [];
      for(let j = 0; j < cols; j++) {
        rows.push(false);
      }
      grid.push(rows);
    }
    return grid;
  }
  render() {
    console.log(this.createGrid());
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
