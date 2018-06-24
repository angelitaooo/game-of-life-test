import React, { Component } from 'react';
import './App.css';

class App extends Component {
  rows = 5;
  cols = 5;
  constructor() {
    super();
    this.state = {
      grid: this.createGrid(),
      initialLiveCells: [[0,0], [0,1], [1,0], [1,3], [2,1], [2,2]]
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

  toggleStateOfCells = (x, y) => {
    const newGrid = [...this.state.grid];
    newGrid[x][y] = !newGrid[x][y];
    this.setState({grid: newGrid});
  }

  updateCells = () => {
    this.state.initialLiveCells.forEach(cell => {
      const x = cell[0];
      const y = cell[1];
      this.toggleStateOfCells(x, y);
    });
   } 

  playGame = () => {
    this.updateCells();
  }




  render() {
    return (
      <div className="App">
        <table>
          <tbody>{this.printGrid()}</tbody>
        </table>
        <button onClick={this.playGame}>Play</button>
      </div>
    );
  }
}

export default App;
