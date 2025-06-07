export function dfs(node, visitCallback) {
  if (!node) return;
  visitCallback(node);
  dfs(node.left, visitCallback);
  dfs(node.right, visitCallback);
}

export function bfs(root, visitCallback) {
  if (!root) return;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    visitCallback(node);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
