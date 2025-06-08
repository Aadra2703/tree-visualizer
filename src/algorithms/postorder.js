export function runPostorder(root, setHighlight) {
  const traverse = async (node) => {
    if (!node || node.value === "null") return;

    await traverse(node.children?.[0]); // left
    await traverse(node.children?.[1]); // right
    setHighlight(node.value);
    await new Promise((res) => setTimeout(res, 800)); // Pause for visual
  };

  traverse(root).then(() => setHighlight(null));
}
