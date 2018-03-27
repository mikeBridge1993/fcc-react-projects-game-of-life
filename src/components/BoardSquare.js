import React from 'react';

const BoardSquare = (props) => (
  <div className={props.squareClass} onClick={props.onSquareClick} id={props.id}></div>
)

export default BoardSquare;


