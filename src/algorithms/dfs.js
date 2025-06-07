export const dfs = async (root, setHighlightedNode) => {
  const dfsHelper = async (node) => {
    if (!node || node.value === 'null') return;
    setHighlightedNode(node.value);
    await new Promise(r => setTimeout(r, 500));

    for (const child of node.children || []) {
      await dfsHelper(child);
    }
  };

  await dfsHelper(root);
};
