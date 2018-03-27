import React from 'react';

const Dashboard = (props) => (
  <div className="alert alert-primary d-flex align-items-center justify-content-between dashboard">
  <div className=" d-flex align-items-center justify-content-between">
    <div className="card border-primary">
      <h5 className="card-header bg-primary text-light p-1">Generation</h5>
      <div className="card-body p-0 pt-1">
          <h5 className="card-title text-center mb-1">{props.generation}</h5>
      </div>
    </div>
    <div className="card mx-1 border-purple">
      <h5 className="card-header p-1 text-light bg-purple">Live Cells</h5>
      <div className="card-body p-0 pt-1">
          <h5 className="card-title text-center mb-1">{props.aliveCells}</h5>
      </div>
    </div>
    <div className="card border-grey">
      <h5 className="card-header p-1  text-light bg-grey">Dead Cells</h5>
      <div className="card-body p-0 pt-1">
          <h5 className="card-title text-center mb-1 ">{500-props.aliveCells}</h5>
      </div>
    </div>
  </div>
  <div>
  </div>
  <div className=" d-flex align-items-center justify-content-between">
    <button className="btn btn-success mx-1" onClick={props.onRun}>Run </button>
    <button className="btn btn-danger  mx-1" onClick={props.onPause}>Pause </button>
    <button className="btn btn-secondary  mx-1" onClick={props.onReset}> Reset </button>
  </div>
  </div>
)

export default Dashboard;
