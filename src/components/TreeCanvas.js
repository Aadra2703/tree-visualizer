// src/components/TreeCanvas.js
import React from 'react';

// Helper function to calculate tree depth
const getTreeDepth = (node) => {
  if (!node || node.value === 'null') return 0;
  const [left, right] = node.children;
  const leftDepth = left && left.value !== 'null' ? getTreeDepth(left) : 0;
  const rightDepth = right && right.value !== 'null' ? getTreeDepth(right) : 0;
  return 1 + Math.max(leftDepth, rightDepth);
};

// Helper function to count nodes at each level
const getNodesAtLevel = (node, targetLevel, currentLevel = 0) => {
  if (!node || node.value === 'null') return 0;
  if (currentLevel === targetLevel) return 1;
  
  const [left, right] = node.children;
  const leftCount = left && left.value !== 'null' ? getNodesAtLevel(left, targetLevel, currentLevel + 1) : 0;
  const rightCount = right && right.value !== 'null' ? getNodesAtLevel(right, targetLevel, currentLevel + 1) : 0;
  return leftCount + rightCount;
};

// Calculate required width for the tree
const calculateTreeWidth = (tree, maxDepth) => {
  let maxNodesAtLevel = 1;
  for (let level = 0; level < maxDepth; level++) {
    const nodesAtLevel = getNodesAtLevel(tree, level);
    maxNodesAtLevel = Math.max(maxNodesAtLevel, nodesAtLevel);
  }
  return Math.max(800, maxNodesAtLevel * 80 + 200); // minimum spacing + padding
};

const renderTree = (node, x, y, level, highlighted, maxDepth, availableWidth) => {
  if (!node || node.value === 'null') return [];

  // Calculate responsive scaling
  const baseRadius = 20;
  const baseFontSize = 12;
  const baseYOffset = 70;
  
  // Scale down for very deep trees
  const depthScale = Math.min(1, 6 / Math.max(1, maxDepth - 3));
  
  const radius = Math.max(10, baseRadius * depthScale);
  const fontSize = Math.max(8, baseFontSize * depthScale);
  const yOffset = Math.max(50, baseYOffset * depthScale);
  
  // Calculate horizontal spacing based on available width and level
  const nodesAtNextLevel = Math.pow(2, level + 1);
  const minSpacing = radius * 2.5; // minimum space between node centers
  const xOffset = Math.max(minSpacing, availableWidth / (nodesAtNextLevel * 2));

  const elements = [];
  const isHighlighted = node.value === highlighted;

  // Draw node circle
  elements.push(
    <circle
      key={`circle-${node.id}`}
      cx={x}
      cy={y}
      r={radius}
      fill={isHighlighted ? 'orange' : 'lightblue'}
      stroke="black"
      strokeWidth={depthScale}
    />
  );

  // Draw node text
  elements.push(
    <text
      key={`text-${node.id}`}
      x={x}
      y={y + fontSize/3}
      textAnchor="middle"
      fontSize={fontSize}
      fill="black"
    >
      {node.value}
    </text>
  );

  const [left, right] = node.children;

  // Draw left subtree
  if (left && left.value !== 'null') {
    const childX = x - xOffset;
    const childY = y + yOffset;

    elements.push(
      <line
        key={`line-left-${node.id}`}
        x1={x}
        y1={y + radius}
        x2={childX}
        y2={childY - radius}
        stroke="black"
        strokeWidth={Math.max(1, depthScale)}
      />
    );
    elements.push(...renderTree(left, childX, childY, level + 1, highlighted, maxDepth, availableWidth));
  }

  // Draw right subtree
  if (right && right.value !== 'null') {
    const childX = x + xOffset;
    const childY = y + yOffset;

    elements.push(
      <line
        key={`line-right-${node.id}`}
        x1={x}
        y1={y + radius}
        x2={childX}
        y2={childY - radius}
        stroke="black"
        strokeWidth={Math.max(1, depthScale)}
      />
    );
    elements.push(...renderTree(right, childX, childY, level + 1, highlighted, maxDepth, availableWidth));
  }

  return elements;
};

const TreeCanvas = ({ tree, highlighted }) => {
  if (!tree) return <p>No tree to display.</p>;

  // Calculate tree dimensions
  const maxDepth = getTreeDepth(tree);
  const treeWidth = calculateTreeWidth(tree, maxDepth);
  const treeHeight = Math.max(400, maxDepth * 80 + 100);

  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <svg 
        width={treeWidth} 
        height={treeHeight}
        style={{ minWidth: '100%' }}
        viewBox={`0 0 ${treeWidth} ${treeHeight}`}
        preserveAspectRatio="xMidYMin meet"
      >
        {renderTree(tree, treeWidth / 2, 50, 0, highlighted, maxDepth, treeWidth * 0.8)}
      </svg>
    </div>
  );
};

export default TreeCanvas;