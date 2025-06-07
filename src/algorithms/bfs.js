export const bfs = async (root, setHighlightedNode) => {
  if (!root) return;
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    setHighlightedNode(node.value);
    await new Promise(r => setTimeout(r, 500));

    for (const child of node.children || []) {
      if (child && child.value !== 'null') {
        queue.push(child);
      }
    }
  }
};
