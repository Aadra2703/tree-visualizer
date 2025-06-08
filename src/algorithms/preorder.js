export function runPreorder(root, setHighlight) {
  if (!root || root.value === "null") return;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const result = [];

  const traverse = (node) => {
    if (!node || node.value === "null") return;

    result.push(node.value);                     // visit root
    traverse(node.children?.[0]);                // left
    traverse(node.children?.[1]);                // right
  };

  traverse(root);

  (async () => {
    for (let value of result) {
      setHighlight(value);
      await delay(800);
    }
    setHighlight(null);
  })();
}
