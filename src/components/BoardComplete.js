import React from 'react';
import ReactDOM from 'react-dom';
import BoardSquare from './BoardSquare';
import Dashboard from './Dashboard';

export default class BoardComplete extends React.Component  {
  constructor(props) {
    super(props);
    this.initialSquares = 300;
    this.sqr = 40;

    this.defaultState = {
      alive: Array.from({length: this.initialSquares}, () => ""+Math.floor(Math.random() * Math.pow(this.sqr, 2)+1)).filter((elem, pos, arr) => arr.indexOf(elem) == pos).sort((a,b) => a-b),
      generation: 0
    }

    this.state = this.defaultState;
    
    this.boardComplete = [];
    let boardRow;
    
    for (var i = 1; i <= this.sqr; i++) {
      boardRow = [];
      for (var j = 1; j <= this.sqr; j++) {
        let squareClass = "border border-secondary square";
        let id = j+(i-1)*this.sqr;
        
        if(this.state.alive.indexOf(id+"") > -1) {
          squareClass += " alive-true"
        }

        boardRow.push(<BoardSquare squareClass={squareClass} onSquareClick={this.onSquareClick} key={id}  id={id}/>)
      }
        this.boardComplete.push(
          <div className="d-flex align-items-center justify-content-center flex-row mx-auto" key={"row-" + i}>
            {boardRow}
          </div>
    )}

    this.neighbours = []
    for (var i = 1; i <= this.sqr; i++) { 
      for (var j = 1; j <= this.sqr; j++) {
        this.neighbours.push({
          cell: j+(i-1)*this.sqr,
          neighbours: [[i-1,j-1], [i-1,j], [i-1,j+1], [i,j-1], [i,j+1], [i+1,j-1], [i+1,j], [i+1,j+1]].filter((el) => el[0] > 0 && el[1] > 0 && el[0] <= this.sqr && el[1] <= this.sqr).map( (el) => el[1]+(el[0]-1)*this.sqr)
        });
      }
    }
    
  }

  componentDidMount () {
    this.onRun();
  }

  runGenerations = () => {
    
    let neighboursAliveForEachCell = this.neighbours.map((el) => {
      return el.neighbours.filter((ele) => this.state.alive.indexOf(ele+"") > -1).length
    })
    let cellsToLive = [];
    this.neighbours.map((el,i) => {
      if(this.state.alive.indexOf(el.cell+"") > -1){
        if(neighboursAliveForEachCell[i] == 2 || neighboursAliveForEachCell[i] == 3 ) {
          cellsToLive.push(el.cell+"");
        }
      } else {
        if(neighboursAliveForEachCell[i] == 3) {
          cellsToLive.push(el.cell+"");
        }
      }
    })
  
    let elementsThatDied = this.state.alive.filter((el) => {
      return cellsToLive.indexOf(el) <0;
    })

    let elementsThatWereBorn = cellsToLive.filter((el) => {
      return this.state.alive.indexOf(el) <0;
    })
    
    if(elementsThatDied.length>0){
      for(let i=0; i< elementsThatDied.length; i++) {
        document.getElementById(elementsThatDied[i]).classList.toggle('alive-true')
      }
    }
    
    if(elementsThatWereBorn.length>0){
      for(let j=0; j< elementsThatWereBorn.length; j++) {
        document.getElementById(elementsThatWereBorn[j]).classList.toggle('alive-true')
      }  
    }

    this.setState({alive: cellsToLive, generation: this.state.generation+1});
  }

  onRun = () => {
    if(this.run) {
      return;
    }

    this.run = setInterval(this.runGenerations, 50)
  }

  onPause= () => {
    clearInterval(this.run);
    this.run="";
  }

  onReset = () => {
    clearInterval(this.run);
    this.run=""

 
    for(let i=0; i< this.state.alive.length; i++) {
      document.getElementById(this.state.alive[i]).classList.toggle('alive-true');
    }
    
    this.setState({
      alive: Array.from({length: this.initialSquares}, () => ""+Math.floor(Math.random() * Math.pow(this.sqr, 2)+1)).filter((elem, pos, arr) => arr.indexOf(elem) == pos).sort((a,b) => a-b),
      generation: 0
    }, () => {
        for(let j=0; j< this.state.alive.length; j++) {
          document.getElementById(this.state.alive[j]).classList.toggle('alive-true')
        }  
    });
  }

  onSquareClick = (e) => {
    if(this.run) {
      return;
    }
    let newState;
    if(document.getElementById(e.target.id).classList[3]){
      newState = {alive: this.state.alive.filter((el)=> el !== e.target.id+"")}
    } else {
      newState = {alive: [...this.state.alive, e.target.id+""].sort((a,b) => a-b)};
    };

    document.getElementById(e.target.id).classList.toggle('alive-true');
    this.setState(newState);
  }

  render () { 
    console.log(this.state.alive)
    return (
      <div className="col-12">
        <Dashboard generation={this.state.generation} aliveCells={this.state.alive.length} onRun={this.onRun} onPause={this.onPause} onReset={this.onReset}/>
        {this.boardComplete}
      </div>
    )
  }
}

