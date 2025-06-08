export function runInorder(root, setHighlight) {
  const traverse = async (node) => {
    if (!node || node.value === "null") return;

    await traverse(node.children?.[0]); // left
    setHighlight(node.value);
    await new Promise((res) => setTimeout(res, 800)); // Pause for visual
    await traverse(node.children?.[1]); // right
  };

  traverse(root).then(() => setHighlight(null));
}
