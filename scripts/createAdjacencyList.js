
/********* search Adjacent node ********/
export function createAdjacencyList(nodeList) {
  const graph = {};
  const maxRows = parseInt(nodeList[nodeList.length - 1].getAttribute('row'));
  const maxColumn = parseInt(nodeList[nodeList.length - 1].getAttribute('column'));
  //use 'row column' as property name;
  let row = 0;
  while(row < maxRows + 1) {
    for(let column = 0; column < maxColumn + 1; column++) {
      //find the current node
      const current = document.querySelector(`.node[row="${row}"][column="${column}"]`);
      const currentCoord = `${row} ${column}`;
      const edges = [];
      if (current == null) return graph;
      //find the adjacent ones
      const adjLeft = document.querySelector(`.node[row="${row}"][column="${column - 1}"]`);
      const adjBottom = document.querySelector(`.node[row="${row + 1}"][column="${column}"]`);
      const adjRight = document.querySelector(`.node[row="${row}"][column="${column + 1}"]`);
      const adjUp = document.querySelector(`.node[row="${row - 1}"][column="${column}"]`);
      
      if (Boolean(adjUp) ) {
          edges.push(`${row - 1} ${column}`);
    }

      if (Boolean(adjRight) ) { 
          edges.push(`${row} ${column + 1}`);
      }

      if (Boolean(adjBottom) ) {
          edges.push(`${row + 1} ${column}`);
      }

      if (Boolean (adjLeft) ) {
          edges.push(`${row} ${column - 1}`);
        
      }

      graph[currentCoord] = edges;
    }
    row++;
  }

  return graph;
}