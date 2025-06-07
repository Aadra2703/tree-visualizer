import React, { useState, useEffect } from 'react';
import TreeCanvas from './components/TreeCanvas';
import ControlPanel from './components/ControlPanel';
import { dfs, bfs } from './algorithms/bfsDfs';

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
  const [root, setRoot] = useState(() => {
    const n1 = new TreeNode(1);
    const n2 = new TreeNode(2);
    const n3 = new TreeNode(3);
    const n4 = new TreeNode(4);
    const n5 = new TreeNode(5);
    n1.left = n2;
    n1.right = n3;
    n2.left = n4;
    n2.right = n5;
    return n1;
  });

  const [highlightedNode, setHighlightedNode] = useState(null);

  // Helper to animate traversal steps
  function animateTraversal(nodes) {
    nodes.forEach((node, idx) => {
      setTimeout(() => {
        setHighlightedNode(node);
      }, idx * 700);
    });
  }

  function handleDFS() {
    const visited = [];
    dfs(root, node => visited.push(node));
    animateTraversal(visited);
  }

  function handleBFS() {
    const visited = [];
    bfs(root, node => visited.push(node));
    animateTraversal(visited);
  }

  function handleReset() {
    setHighlightedNode(null);
  }

  return (
    <div>
      <h1>Tree Visualizer</h1>
      <ControlPanel onDFS={handleDFS} onBFS={handleBFS} onReset={handleReset} />
      <TreeCanvas root={root} highlightedNode={highlightedNode} />
    </div>
  );
}

export default App;
