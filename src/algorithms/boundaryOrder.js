export function runBoundaryOrder(root, setHighlight) {
  if (!root || root.value === "null") return;

  const result = [];
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const isLeaf = (node) => {
    if (!node) return false;
    return (!node.children?.[0] || node.children[0].value === "null") &&
           (!node.children?.[1] || node.children[1].value === "null");
  };

  const addLeftBoundary = (node) => {
    let curr = node.children?.[0]; // left child
    while (curr) {
      if (!isLeaf(curr)) result.push(curr.value);
      curr = curr.children?.[0] && curr.children[0].value !== "null"
        ? curr.children[0]
        : curr.children?.[1];
      if (curr?.value === "null") break;
    }
  };

  const addRightBoundary = (node) => {
    let curr = node.children?.[1]; // right child
    const temp = [];
    while (curr) {
      if (!isLeaf(curr)) temp.push(curr.value);
      curr = curr.children?.[1] && curr.children[1].value !== "null"
        ? curr.children[1]
        : curr.children?.[0];
      if (curr?.value === "null") break;
    }
    temp.reverse();
    result.push(...temp);
  };

  const addLeaves = (node) => {
    if (!node || node.value === "null") return;
    if (isLeaf(node)) {
      result.push(node.value);
      return;
    }
    addLeaves(node.children?.[0]);
    addLeaves(node.children?.[1]);
  };

  // Begin traversal
  if (!isLeaf(root)) result.push(root.value);
  addLeftBoundary(root);
  addLeaves(root);
  addRightBoundary(root);

  // Animate the boundary traversal
  (async () => {
    for (let value of result) {
      setHighlight(value);
      await delay(800);
    }
    setHighlight(null);
  })();
}
