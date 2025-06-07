// src/components/ControlPanel.js
import React, { useState } from 'react';

const ControlPanel = ({ onAddNode, onDeleteNode, onTraverse, onReset, isEmpty }) => {
  const [nodeValue, setNodeValue] = useState('');
  const [parentValue, setParentValue] = useState('');
  const [position, setPosition] = useState('left');
  const [deleteValue, setDeleteValue] = useState('');

  const handleAdd = () => {
    if (!nodeValue) return alert('Enter node value!');
    if (!isEmpty && !parentValue) return alert('Enter parent value!');
    onAddNode(nodeValue, parentValue, position);
    setNodeValue('');
    setParentValue('');
  };

  const handleDelete = () => {
    if (!deleteValue) return alert('Enter value to delete!');
    onDeleteNode(deleteValue);
    setDeleteValue('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Add Node</h3>
      <input
        type="text"
        placeholder="Node Value"
        value={nodeValue}
        onChange={(e) => setNodeValue(e.target.value)}
      />
      {!isEmpty && (
        <>
          <input
            type="text"
            placeholder="Parent Value"
            value={parentValue}
            onChange={(e) => setParentValue(e.target.value)}
          />
          <select value={position} onChange={(e) => setPosition(e.target.value)}>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </>
      )}
      <button onClick={handleAdd}>Add Node</button>

      <h3>Delete Node</h3>
      <input
        type="text"
        placeholder="Node Value"
        value={deleteValue}
        onChange={(e) => setDeleteValue(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>

      <div style={{ marginTop: '10px' }}>
        <button onClick={() => onTraverse('dfs')}>DFS</button>
        <button onClick={() => onTraverse('bfs')}>BFS</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default ControlPanel;
