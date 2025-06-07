import React from 'react';

function TreeCanvas({ root, highlightedNode }) {
  // Recursive function to render nodes and edges
  const renderNode = (node, x, y, levelGap) => {
    if (!node) return null;

    const nodeRadius = 20;
    const childY = y + levelGap;
    return (
      <g key={node.value}>
        {/* Draw lines to children */}
        {node.left && <line x1={x} y1={y} x2={x - 60} y2={childY} stroke="black" />}
        {node.right && <line x1={x} y1={y} x2={x + 60} y2={childY} stroke="black" />}
        
        {/* Draw current node */}
        <circle
          cx={x}
          cy={y}
          r={nodeRadius}
          fill={highlightedNode === node ? 'orange' : 'skyblue'}
          stroke="black"
        />
        <text x={x} y={y + 5} textAnchor="middle">{node.value}</text>

        {/* Recursively render children */}
        {renderNode(node.left, x - 60, childY, levelGap)}
        {renderNode(node.right, x + 60, childY, levelGap)}
      </g>
    );
  };

  return (
    <svg width="100%" height="400">
      {renderNode(root, 300, 50, 80)}
    </svg>
  );
}

export default TreeCanvas;
