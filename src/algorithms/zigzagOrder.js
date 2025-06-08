export const runZigzagTraversal = async (root, setHighlightedNode) => {
  if (!root) return;

  let currentLevel = [root];
  let leftToRight = true;

  while (currentLevel.length > 0) {
    // We'll collect nodes of the current level and show them in zigzag order
    const nextLevel = [];
    const levelValues = [];

    for (const node of currentLevel) {
      levelValues.push(node);
    }

    // If direction is right to left, reverse the order for processing
    if (!leftToRight) {
      levelValues.reverse();
    }

    // Highlight nodes in the order for this level
    for (const node of levelValues) {
      setHighlightedNode(node.value);
      await new Promise(r => setTimeout(r, 500));
    }

    // Collect children for the next level in normal left-to-right order
    for (const node of currentLevel) {
      for (const child of node.children || []) {
        if (child && child.value !== 'null') {
          nextLevel.push(child);
        }
      }
    }

    // Prepare for next level and flip direction
    currentLevel = nextLevel;
    leftToRight = !leftToRight;
  }
};
