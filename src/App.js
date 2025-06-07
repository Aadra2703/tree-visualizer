import React, { useState, useEffect } from 'react';
import TreeCanvas from './components/TreeCanvas';
import ControlPanel from './components/ControlPanel';
import { bfs } from './algorithms/bfs';
import { dfs } from './algorithms/dfs';

// Define TreeNode class or structure here or import from a helper file
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function App() {
  // Build sample tree
  const [treeData, setTreeData] = useState(null); // null = empty tree
  const [highlighted, setHighlighted] = useState(null);
  <TreeCanvas tree={treeData} highlighted={highlighted} />
  const handleAddNode = (value, parentValue, position) => {
    if (value.toLowerCase() === 'null') return; // skip inserting if user enters "null"

    const newNode = {
      id: Date.now(),
      value,
      children: []
    };

    // If tree is empty, make this the root
    if (!treeData) {
      setTreeData(newNode);
      return;
    }

    const newTree = JSON.parse(JSON.stringify(treeData));
    const inserted = insertNode(newTree, value, parentValue, position);
    if (inserted) {
      setTreeData(newTree);
    } else {
      alert(`Parent node ${parentValue} not found or position ${position} already filled!`);
    }
  };

  const insertNode = (node, value, parentValue, position) => {
    if (node.value === parentValue) {
      // Ensure binary: max 2 children
      const [left, right] = node.children;

      if (position === 'left' && (!left || left.value === 'null')) {
        node.children[0] = {
          id: Date.now(),
          value,
          children: []
        };
        return true;
      }

      if (position === 'right' && (!right || right.value === 'null')) {
        if (!node.children[0]) node.children[0] = { id: Date.now(), value: 'null', children: [] }; // preserve left if empty
        node.children[1] = {
          id: Date.now(),
          value,
          children: []
        };
        return true;
      }

      return false;
    }

    for (let child of node.children) {
      if (insertNode(child, value, parentValue, position)) return true;
    }
    return false;
  };

  const handleDeleteNode = (valueToDelete) => {
    if (!treeData) return;

    if (treeData.value === valueToDelete) {
      setTreeData(null); // deleting root
      return;
    }

    const newTree = JSON.parse(JSON.stringify(treeData));
    const deleted = deleteNode(newTree, valueToDelete);
    if (deleted) {
      setTreeData(newTree);
    } else {
      alert(`Node ${valueToDelete} not found!`);
    }
  };

  const deleteNode = (node, valueToDelete) => {
    node.children = node.children.filter((child) => child?.value !== valueToDelete);
    for (let child of node.children) {
      if (deleteNode(child, valueToDelete)) return true;
    }
    return false;
  };

  const handleTraversal = (type) => {
  if (!treeData) {
    alert("Tree is empty!");
    return;
  }

  if (type === 'bfs') {
    bfs(treeData, setHighlighted);
  } else {
    dfs(treeData, setHighlighted);
  }
};

  // const handleReset = () => {
  //   setHighlighted(null);
  // };

  

  //const [highlightedNode, setHighlightedNode] = useState(null);

  // Helper to animate traversal steps
  function animateTraversal(nodes) {
    nodes.forEach((node, idx) => {
      setTimeout(() => {
      setHighlighted(node);
      }, idx * 700);
    });
  }

  // function handleDFS() {
  //   const visited = [];
  //   dfs(root, node => visited.push(node));
  //   animateTraversal(visited);
  // }

  // function handleBFS() {
  //   const visited = [];
  //   bfs(root, node => visited.push(node));
  //   animateTraversal(visited);
  // }

  function handleReset() {
    setHighlighted(null);
  }

  return (
    <div className="App">
      <h1>Interactive Tree Visualizer</h1>
      <ControlPanel
        onAddNode={handleAddNode}
        onDeleteNode={handleDeleteNode}
        onTraverse={handleTraversal}
        onReset={handleReset}
        isEmpty={!treeData}
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleTraversal('bfs')}>Run BFS</button>
        <button onClick={() => handleTraversal('dfs')}>Run DFS</button>
      </div>
      <TreeCanvas tree={treeData} highlighted={highlighted} />
    </div>
  );
}

export default App;
