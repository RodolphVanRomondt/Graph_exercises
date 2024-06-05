class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    vertex.adjacent.forEach(node => {
      if (node.adjacent.has(vertex)) node.adjacent.delete(vertex);
    });
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const toReturn = [];
    const vertexStack = [start];
    const seen = new Set(vertexStack);

    while (vertexStack.length > 0) {
      let currVertex = vertexStack.pop();
      toReturn.push(currVertex.value);

      for (let vertex of currVertex.adjacent) {
        if (!seen.has(vertex)) { 
          vertexStack.push(vertex);
          seen.add(vertex);
        }
      }
    }
    console.log(toReturn);

    return toReturn;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const toReturn = [];
    const vertexQueue = [start];
    const seen = new Set(vertexQueue);

    while (vertexQueue.length > 0) {
      let currVertex = vertexQueue.shift();
      toReturn.push(currVertex.value);

      for (let vertex of currVertex.adjacent) {
        if (!seen.has(vertex)) {
          vertexQueue.push(vertex);
          seen.add(vertex);
        }
      }
    }

    return toReturn;
  }
}

let graph = new Graph()
let a = new Node("A")
let b = new Node("B")
let c = new Node("C")
graph.addVertices([a, b])
graph.addVertex(c)
console.log(graph.nodes.has(a)) // true
graph.nodes.has(b) // true
console.log(graph.nodes.has(c)) // true


module.exports = {Graph, Node}