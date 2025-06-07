import React from 'react';

function ControlPanel({ onDFS, onBFS, onReset }) {
  return (
    <div style={{ margin: '20px' }}>
      <button onClick={onDFS}>Run DFS</button>
      <button onClick={onBFS}>Run BFS</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default ControlPanel;
