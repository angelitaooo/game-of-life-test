import React, { Component } from 'react';
import './App.css';

class App extends Component {
  rows = 5;
  cols = 5;
  constructor() {
    super();
    this.state = {
      grid: this.createGrid()
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

  printGrid = () => {
    return this.state.grid.map((rows, rowKey) => {
      const cell = rows.map((col, colKey) => {
        return <td key={colKey}>{col ? 1 : 0}</td>;
      })
      return <tr key={rowKey}>{cell}</tr>;
    })
  }
  render() {
    console.log(this.createGrid());
    return (
      <div className="App">
        <table>
          <tbody>{this.printGrid()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
