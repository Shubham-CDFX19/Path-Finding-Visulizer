let dragged;
let mouseDown;
let mouseOver;
let checkbox;
const togleSwitch = document.querySelector('.switch-checkbox');
togleSwitch.addEventListener('change', () => {
  checkbox = togleSwitch.checked;
})


   /********* create a Grid ********/
export function createGrid(section, startNode, finishNode) {
  for (let row = 0; row < 30; row++) {
    for (let column = 0; column < 55; column++) {
      const newDiv = document.createElement('div');
      newDiv.setAttribute('row', row);
      newDiv.setAttribute('column', column);
      newDiv.classList.add('node');
      newDiv.classList.contains('start') ?
      newDiv.setAttribute('weight', 0) : newDiv.setAttribute('weight', 1);

      newDiv.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('start') || e.target.classList.contains('finish')) {
          dragged = e.target;
        }
      });

      newDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
      }, false);

      newDiv.addEventListener('drop', (e) => {
        if (dragged.classList.contains('start')) {
          dragged.classList.remove('start');
          dragged.setAttribute('draggable', false);
          e.target.classList.add('start');
          startNode = e.target;
        }

        if (dragged.classList.contains('finish')) {
          dragged.classList.remove('finish');
          dragged.setAttribute('draggable', false);
          e.target.classList.add('finish');
          finishNode = e.target;
        }
        mouseDown = false;
      });

      newDiv.addEventListener('mouseover', (e) => {
        if (mouseDown) {
          if (e.target.classList.contains('start') || e.target.classList.contains('finish')) {
            return;
          }
          if (!checkbox) {
            if (e.target.classList.contains('weighted')) {
              return;
            }
            e.target.classList.add('blocked');
          } else {
            e.target.classList.add('weighted');
            e.target.setAttribute('weight', 5);
          }
        }
      })

      newDiv.addEventListener('mousedown', () => {
        mouseDown = true;
      })

      newDiv.addEventListener('mouseup', () => {
        mouseDown = false;
      })

      newDiv.addEventListener('dragend', (e) => {
        addDradSToMainNodes();
      })
      section.appendChild(newDiv);
    }
  }

  const divs = document.querySelectorAll('.node');
  divs.forEach((node) => {
    node.addEventListener('click', (e) => {
      if (e.target.classList.contains('start') || e.target.classList.contains('finish')) {
        return;
      }
      if (!checkbox) {
        if (e.target.classList.contains('weighted')) {
          return;
        }
        e.target.classList.add('blocked');
      } else {
        e.target.classList.add('weighted');
        e.target.setAttribute('weight', 5);
      }
    }, false);
  });
}
    
   /********* clear Grid ********/
export function clearGrid(section) {
  for (let node of section.childNodes) {
    if (node.classList.contains('visited')
      || node.classList.contains('blocked')) {
      node.classList.remove('visited');
      node.classList.remove('blocked');
      node.classList.remove('path');
      node.classList.remove('weighted');
    }
  }
}

export function addHeuristic(nodeList, finishNode) {
  const finishNodeRow = parseInt(finishNode.getAttribute('row'));
  const finishNodeColumn = parseInt(finishNode.getAttribute('column'));
  nodeList.forEach((node) => {
    const thisNodeRow = parseInt(node.getAttribute('row'));
    const thisNodeColumn = parseInt(node.getAttribute('column'));
    let heuristic;
    if (finishNodeRow > thisNodeRow) {
      if (finishNodeColumn > thisNodeColumn) {
        heuristic = finishNodeRow - thisNodeRow + finishNodeColumn - thisNodeColumn;
      } else {
        heuristic = finishNodeRow - thisNodeRow + thisNodeColumn - finishNodeColumn;
      }
    } else {
      if (finishNodeColumn > thisNodeColumn) {
        heuristic = thisNodeRow - finishNodeRow + finishNodeColumn - thisNodeColumn;
      } else {
        heuristic = thisNodeRow - finishNodeRow + thisNodeColumn - finishNodeColumn;
      }
    }

    node.setAttribute('heuristic', heuristic);
  });
  return`${finishNodeRow} ${finishNodeColumn}`;
}

    /********* get cooords of node ********/
export function getCoords(node) {
  const row = parseInt(node.getAttribute('row'));
  const column = parseInt(node.getAttribute('column'));
  return `${row} ${column}`;
}


export function addDradSToMainNodes(startNode, finishNode) {
  startNode = document.querySelector('.node.start');
  finishNode = document.querySelector('.node.finish');

  startNode.setAttribute('draggable', true);
  finishNode.setAttribute('draggable', true);
}

   /********* clear all walls ********/
export function clearWalls(section) {
  for (let node of section.childNodes) {
    if (node.classList.contains('blocked')) {
      node.classList.remove('blocked');
    }
  }
}

   /********* clear path ********/
export function clearPath(section) {
  for (let node of section.childNodes) {
    if (node.classList.contains('path') ||
        node.classList.contains('visited') ||
        node.classList.contains('weighted')) {
      node.classList.remove('visited');
      node.classList.remove('path');
      node.classList.remove('weighted');
    }
  }
}

export function colorInPink(section) {
  const nodes = section.childNodes;
  nodes.forEach((node) => {
    if (node.classList.contains('visited')) {
      node.classList.add('no-path');
    }
  })
}
