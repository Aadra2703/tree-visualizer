export function runLevelOrder(root, setHighlight) {
  if (!root) return;
  const queue = [root];

  const traverse = async () => {
    while (queue.length) {
      const node = queue.shift();
      if (node.value === "null") continue;

      setHighlight(node.id);
      await new Promise((res) => setTimeout(res, 800));

      node.children?.forEach((child) => {
        if (child && child.value !== "null") queue.push(child);
      });
    }

    setHighlight(null);
  };

  traverse();
}
