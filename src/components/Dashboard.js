import React from 'react';

const Dashboard = (props) => (
  <div className="alert alert-primary d-flex align-items-center justify-content-between dashboard">
  <div className=" d-flex align-items-center justify-content-between">
    <div className="info mx-2"> <span class="badge badge-primary d-flex align-items-center justify-content-center"> Generation: {props.generation}</span></div>
    <div className="info mx-2 "><span class="badge badge-danger d-flex align-items-center justify-content-center"> Live Cells: {props.aliveCells}</span></div>
    <div className="info mx-2"><span class="badge badge-warning d-flex align-items-center justify-content-center"> Dead Cells: {props.aliveCells}</span></div>
  </div>
  <div className=" d-flex align-items-center justify-content-between">
    <button className="btn btn-success mx-1" onClick={props.onRun}>Run </button>
    <button className="btn btn-secondary  mx-1" onClick={props.onPause}>Pause </button>
    <button className="btn btn-primary  mx-1" onClick={props.onReset}> Reset </button>
  </div>
  </div>
)

export default Dashboard;
