import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Board from './components/Board';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
      <Board />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
