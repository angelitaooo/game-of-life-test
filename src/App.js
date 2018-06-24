import React, { Component } from 'react';
import './App.css';

class App extends Component {
  rows = 5;
  cols = 5;
  constructor() {
    super();
    this.state = {
      grid: this.createGrid(),
      initialLiveCells: [[0,0], [0,1], [1,0], [1,3], [2,1], [2,2]],
      intervalId: 0
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

   getRandomPosition = (min = 0, max = this.rows - 1) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
   }

  checkNeighbors = (x, y) => {
    return [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ]
  }

  validateNeighbors = (neighbors) => {
    return neighbors.filter(coord => {
      return !(coord.includes(-1) || coord.includes(this.rows));
    })
  }

  countAliveCells = (neighbors) => {
    const aliveNeighbors = neighbors.filter(neighbor => {
      const x = neighbor[0];
      const y = neighbor[1]
      return this.state.grid[x][y] === true;
    });
    return aliveNeighbors.length;
  }

  gameRules = (totalAliveNeighbors, x, y) => {
    const cell = this.state.grid[x][y];
    if( cell === true && totalAliveNeighbors < 2) {
      this.toggleStateOfCells(x, y);
    }
    if( cell === true && totalAliveNeighbors > 3) {
      this.toggleStateOfCells(x, y);
    }
    if(cell === false && totalAliveNeighbors === 3){
      this.toggleStateOfCells(x, y);
    }
  }


  playGame = () => {
    this.updateCells();
    const interval = setInterval(()=> {
      const x = this.getRandomPosition();
      const y = this.getRandomPosition();
      const neighbors = this.checkNeighbors(x, y);
      const validNeighbors = this.validateNeighbors(neighbors);
      const totalAliveNeighbors = this.countAliveCells(validNeighbors);
      this.gameRules(totalAliveNeighbors, x, y);
    }, 100)
    this.setState({intervalId: interval})
  }

  stopGame = () => {
    clearInterval(this.state.intervalId);
  }



  render() {
    return (
      <div className="App">
        <table>
          <tbody>{this.printGrid()}</tbody>
        </table>
        <button onClick={this.playGame}>Play</button>
        <button onClick={this.stopGame}>Stop</button>
      </div>
    );
  }
}

export default App;
