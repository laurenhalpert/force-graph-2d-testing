export default function Graph() {
  let nodes = new Map();

  this.addVertex = (node) => {
    if (!nodes.has(node)) nodes.set(node, new Set());
  };

  this.addEdge = (node, edge) => {
    if (nodes.has(node) && nodes.has(edge)) {
      nodes.get(node).add(edge);
      nodes.get(edge).add(node);
    }
  };

  this.showConnections = () => {
    nodes.forEach((node, index) => console.log(`${node}: ${index}`));
  };
}
