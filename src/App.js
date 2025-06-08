import React, { useState, useEffect } from 'react';
import TreeCanvas from './components/TreeCanvas';
import ControlPanel from './components/ControlPanel';
import { runDFS } from "./algorithms/dfs";
import { runBFS } from "./algorithms/bfs";
import { runLevelOrder } from "./algorithms/levelorder";
import { runInorder } from "./algorithms/inorder";
import { runPostorder } from "./algorithms/postorder";
import { runBoundaryOrder } from './algorithms/boundaryOrder';
import { runPreorder } from './algorithms/preorder';
import { runVerticalOrder } from './algorithms/verticalOrder';
import { runZigzagTraversal } from './algorithms/zigzagOrder';



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
  const [inputValue, setInputValue] = useState("");

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

    const handleDeleteNode = (value) => {
        if (!treeData || value === "") return;

        const newTree = JSON.parse(JSON.stringify(treeData));
        const deleted = deleteLeafNode(newTree, value);

        if (deleted) {
          setTreeData(newTree.value === "null" ? null : { ...newTree }); // 👈 Force rerender
        } else {
          alert("Node either not found or not a leaf node.");
        }
      };

      


const deleteLeafNode = (node, target) => {
  if (!node || node.value === "null") return false;

  // Try deleting left child
  if (
    node.children?.[0] &&
    node.children[0].value === target &&
    node.children[0].children?.every(c => !c || c.value === "null")
  ) {
    node.children[0] = { id: Date.now(), value: "null" };
    return true;
  }

  // Try deleting right child
  if (
    node.children?.[1] &&
    node.children[1].value === target &&
    node.children[1].children?.every(c => !c || c.value === "null")
  ) {
    node.children[1] = { id: Date.now(), value: "null" };
    return true;
  }

  // Recurse
  return (
    deleteLeafNode(node.children?.[0], target) ||
    deleteLeafNode(node.children?.[1], target)
  );
};

const handleRunAlgorithm = (algorithm) => {
  switch (algorithm) {
    case "dfs":
      runDFS(treeData, setHighlighted);
      break;
    case "bfs":
      runBFS(treeData, setHighlighted);
      break;
    case "levelorder":
      runLevelOrder(treeData, setHighlighted);
      break;
    case "inorder":
      runInorder(treeData, setHighlighted);
      break;
    case "postorder":
      runPostorder(treeData, setHighlighted);
      break;
    case "boundaryorder":
      runBoundaryOrder(treeData, setHighlighted);
      break;
    case "preorder":
      runPreorder(treeData, setHighlighted);
      break;
    case "verticalorder":
      runVerticalOrder(treeData, setHighlighted);
      break;
    case "zigzag":
      runZigzagTraversal(treeData, setHighlighted);
      break;  

    default:
      alert("Algorithm not implemented.");
  }
};


//   const handleTraversal = (type) => {
//   if (!treeData) {
//     alert("Tree is empty!");
//     return;
//   }

//   if (type === 'bfs') {
//     bfs(treeData, setHighlighted);
//   } else {
//     dfs(treeData, setHighlighted);
//   }
// };

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
        //onTraverse={handleTraversal}
        onReset={handleReset}
        isEmpty={!treeData}
        onRunAlgorithm={handleRunAlgorithm}
      />
      {/* <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleTraversal('bfs')}>Run BFS</button>
        <button onClick={() => handleTraversal('dfs')}>Run DFS</button>
      </div> */}
      <TreeCanvas tree={treeData} highlighted={highlighted} />
    </div>
  );
}

export default App;
{/* <ControlPanel
        onInsertNode={handleInsert}
        onDeleteNode={handleDeleteNode} // ✅ passed here
        onTraverse={handleTraverse}
      /> */}