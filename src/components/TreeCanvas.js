// src/components/TreeCanvas.js
import React from 'react';

const renderTree = (node, x = 400, y = 50, level = 0, highlighted) => {
  if (!node || node.value === 'null') return [];

  const radius = 20;
  const xOffset = 150 / (level + 1); // spread nodes horizontally
  const yOffset = 80;

  const elements = [];

  const isHighlighted = node.value === highlighted;

  elements.push(
    <circle
      key={`circle-${node.id}`}
      cx={x}
      cy={y}
      r={radius}
      fill={isHighlighted ? 'orange' : 'lightblue'}
      stroke="black"
    />
  );

  elements.push(
    <text
      key={`text-${node.id}`}
      x={x}
      y={y + 5}
      textAnchor="middle"
      fontSize="12"
    >
      {node.value}
    </text>
  );

  const [left, right] = node.children;

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
      />
    );
    elements.push(...renderTree(left, childX, childY, level + 1, highlighted));
  }

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
      />
    );
    elements.push(...renderTree(right, childX, childY, level + 1, highlighted));
  }

  return elements;
};


const TreeCanvas = ({ tree, highlighted }) => {
  if (!tree) return <p>No tree to display.</p>;

  return (
    <svg width="100%" height="500">
      {renderTree(tree, 400, 50, 0, highlighted)}
    </svg>
  );
};

export default TreeCanvas;
