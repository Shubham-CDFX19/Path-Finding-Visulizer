import { breadthFirstSearch } from "./algorithms/breadthFirstSearch.js";
import { createAdjacencyList } from "./createAdjacencyList.js";
import { depthFirstSearch } from "./algorithms/depthFirstSearch.js";
import { Dijkstras } from "./algorithms/Dijkstras.js";
import {
  addDradSToMainNodes,
  getCoords,
  addHeuristic,
  clearGrid,
  clearWalls,
  clearPath,
  createGrid,
  colorInPink,
} from './gridFunctions.js'


const section = document.querySelector('.visualizer');
const select = document.querySelector('select');
const startBtn = document.querySelector('button.start');

let startNode = document.querySelector('.node.start');
let finishNode = document.querySelector('.node.finish');

let algo = '';

function addStarAndEndNodes() {
  const start = document.querySelector(`.node[row="10"][column="15"]`).classList.add('start');
  const finish = document.querySelector(`.node[row="10"][column="30"]`).classList.add('finish');
}

createGrid(section, startNode, finishNode);
addStarAndEndNodes();
addDradSToMainNodes(startNode, finishNode);

let graph = createAdjacencyList(document.querySelectorAll('.node'));
startNode = document.querySelector('.node.start');
finishNode = document.querySelector('.node.finish');

(function main() {
  const clearBtn = document.querySelector('button.clear');
  const clearWallsBtn = document.querySelector('button.clear-walls');
  const clearPathBtn = document.querySelector('button.clear-path');
  const nodeList = document.querySelectorAll('.node');
  const  setposlist = document.querySelector('button.pos');

  select.addEventListener('change', (e) => {
    addHeuristic(nodeList, finishNode);
    algo = e.target.value;
  });

  clearWallsBtn.addEventListener('click', () => {
    clearWalls(section);
  })

  clearPathBtn.addEventListener('click', () => {
    clearPath(section);
  })
  setposlist.addEventListener('click', () => {
    let startCoords = getCoords(startNode);
     alert(" Position of Start node is "+startCoords);
 
     let EndCoords = addHeuristic(nodeList, finishNode);
     alert(" Position of End node is "+EndCoords)
   })

  startBtn.addEventListener('click', async () => {
    startNode = document.querySelector('.node.start');
    finishNode = document.querySelector('.node.finish');
    let startCoords = getCoords(startNode);
    let result = false;
    switch (algo) {
      case 'depth-first':
         result = await depthFirstSearch(graph, startCoords);
        break;
      case 'breadth-first':
        result = await  breadthFirstSearch(graph, startCoords);
         break;
      case 'dijkstra':
        result = await Dijkstras(graph, startCoords, startCoords);
        break;
      
    }
    if (!result) colorInPink(section);
  })

  clearBtn.addEventListener('click', () => {
    clearGrid(section);
  })
})()