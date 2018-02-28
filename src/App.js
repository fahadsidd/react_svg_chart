import React, { Component } from 'react';
import './App.css';
import DNAChart from './DNAChart';

class App extends Component {
  createRAWData(){
    // This function creates raw random data 
    const data = []

    for (let x = 0; x <= 10; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
    return data;
  }

  render() {
    return (
      <div className="App">
        <div className="header">Chart useing react svg </div>
        <DNAChart data={this.createRAWData()} />
      </div>
    );
  }
}

export default App;