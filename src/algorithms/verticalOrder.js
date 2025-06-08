export function runVerticalOrder(root, setHighlight) {
  if (!root || root.value === "null") return;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Use a Map structure to simulate: map<int, map<int, multiset<int>>>
  const nodeMap = new Map();
  const queue = [{ node: root, hd: 0, level: 0 }];

  while (queue.length > 0) {
    const { node, hd, level } = queue.shift();
    if (!node || node.value === "null") continue;

    if (!nodeMap.has(hd)) nodeMap.set(hd, new Map());
    const levelMap = nodeMap.get(hd);
    if (!levelMap.has(level)) levelMap.set(level, []);
    levelMap.get(level).push(node.value); // we don’t sort here — JS has no multiset

    if (node.children?.[0] && node.children[0].value !== "null") {
      queue.push({ node: node.children[0], hd: hd - 1, level: level + 1 });
    }
    if (node.children?.[1] && node.children[1].value !== "null") {
      queue.push({ node: node.children[1], hd: hd + 1, level: level + 1 });
    }
  }

  // Flatten the map into vertical order result
  const sortedKeys = [...nodeMap.keys()].sort((a, b) => a - b);
  const verticalOrder = [];

  for (const key of sortedKeys) {
    const levels = [...nodeMap.get(key).keys()].sort((a, b) => a - b);
    const col = [];
    for (const level of levels) {
      col.push(...nodeMap.get(key).get(level).sort()); // mimic multiset
    }
    verticalOrder.push(...col); // flatten for animation
  }

  (async () => {
    for (let value of verticalOrder) {
      setHighlight(value);
      await delay(800);
    }
    setHighlight(null);
  })();
}
