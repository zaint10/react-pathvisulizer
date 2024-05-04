export function astar(grid, startNode, finishNode) {
	const visitedNodesInOrder = [];

	grid[startNode.rowIdx][startNode.nodeIdx].distance = 0;
	grid[startNode.rowIdx][startNode.nodeIdx].totalDistance = 0;
	grid[startNode.rowIdx][startNode.nodeIdx].direction = 'up';

	const unvisitedNodes = getAllNode(grid);

	while (unvisitedNodes.length) {
		let currentNode = closestNode(unvisitedNodes);
		while (currentNode.isWall && unvisitedNodes.length) {
			currentNode = closestNode(unvisitedNodes);
		}
		if (currentNode.distance === Infinity) return false;

		visitedNodesInOrder.push(currentNode);
		currentNode.isVisited = true;
		if (currentNode === finishNode) {
			return visitedNodesInOrder;
		}
		updateNeighbors(currentNode, unvisitedNodes, grid, startNode, finishNode);
	}
}

function getAllNode(grid) {
	let nodes = [];
	grid.map((row, idx) => {
		return nodes = nodes.concat(row);
	});

	return nodes;
}

function closestNode(unvisitedNodes) {
	let currentClosest, index;

	unvisitedNodes.forEach((node, idx) => {
		if (!currentClosest || currentClosest.totalDistance > node.totalDistance) {
			currentClosest = node;
			index = idx;
		} else if (currentClosest.totalDistance === node.totalDistance) {
			if (currentClosest.heuristicDistance > node.heuristicDistance) {
				currentClosest = node;
				index = idx;
			}
		}
	});

	unvisitedNodes.splice(index, 1);
	return currentClosest;
}

function updateNeighbors(currentNode, nodes, grid, startNode, finishNode, heuristic) {
	let neighbors = getNeighbors(currentNode, grid);

	for (let neighbor of neighbors) {
		try {
			let i = nodes.findIndex((node) => node.oneDidx === parseInt(neighbor.oneDidx));
            updateNode(currentNode, nodes[i], finishNode);
            
		} catch (err) {
			console.log(currentNode, neighbor);
		}
	}
}

function getNeighbors(node, grid) {
	const potentialNeighbors = [];
	const { rowIdx, nodeIdx } = node;
	if (rowIdx > 0) {
		// Up
		if (!grid[rowIdx - 1][nodeIdx].isWall) potentialNeighbors.push(grid[rowIdx - 1][nodeIdx]);
	}
	if (nodeIdx < grid[0].length - 1) {
		// Right
		if (!grid[rowIdx][nodeIdx + 1].isWall) potentialNeighbors.push(grid[rowIdx][nodeIdx + 1]);
	}
	if (rowIdx < grid.length - 1) {
		// Down
		if (!grid[rowIdx + 1][nodeIdx].isWall) potentialNeighbors.push(grid[rowIdx + 1][nodeIdx]);
	}
	if (nodeIdx > 0) {
		// Left
		if (!grid[rowIdx][nodeIdx - 1].isWall) potentialNeighbors.push(grid[rowIdx][nodeIdx - 1]);
	}

	return potentialNeighbors.filter((neighbor) => !neighbor.isVisited);
}

function updateNode(currentNode, targetNode, actualTargetNode) {
	let distance = getDistance(currentNode, targetNode);
	if (!targetNode.heuristicDistance) targetNode.heuristicDistance = manhattanDistance(targetNode, actualTargetNode);
	try {
		let distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
		if (distanceToCompare < targetNode.distance) {
			targetNode.distance = distanceToCompare;
			targetNode.totalDistance = targetNode.distance + targetNode.heuristicDistance;
			targetNode.previousNode = currentNode;
			// targetNode.path = distance[1];
			targetNode.direction = distance[2];
		}
	} catch (error) {
		console.log(currentNode, targetNode);
	}
}

function getDistance(nodeOne, nodeTwo) {
	try {
		let x1 = nodeOne.rowIdx,
			y1 = nodeOne.nodeIdx,
			x2 = nodeTwo.rowIdx,
			y2 = nodeTwo.nodeIdx;

		if (x2 < x1 && y1 === y2) {
			if (nodeOne.direction === 'up') {
				return [ 1, [ 'f' ], 'up' ];
			} else if (nodeOne.direction === 'right') {
				return [ 2, [ 'l', 'f' ], 'up' ];
			} else if (nodeOne.direction === 'left') {
				return [ 2, [ 'r', 'f' ], 'up' ];
			} else if (nodeOne.direction === 'down') {
				return [ 3, [ 'r', 'r', 'f' ], 'up' ];
			} else if (nodeOne.direction === 'up-right') {
				return [ 1.5, null, 'up' ];
			} else if (nodeOne.direction === 'down-right') {
				return [ 2.5, null, 'up' ];
			} else if (nodeOne.direction === 'up-left') {
				return [ 1.5, null, 'up' ];
			} else if (nodeOne.direction === 'down-left') {
				return [ 2.5, null, 'up' ];
			}
		} else if (x2 > x1 && y1 === y2) {
			if (nodeOne.direction === 'up') {
				return [ 3, [ 'r', 'r', 'f' ], 'down' ];
			} else if (nodeOne.direction === 'right') {
				return [ 2, [ 'r', 'f' ], 'down' ];
			} else if (nodeOne.direction === 'left') {
				return [ 2, [ 'l', 'f' ], 'down' ];
			} else if (nodeOne.direction === 'down') {
				return [ 1, [ 'f' ], 'down' ];
			} else if (nodeOne.direction === 'up-right') {
				return [ 2.5, null, 'down' ];
			} else if (nodeOne.direction === 'down-right') {
				return [ 1.5, null, 'down' ];
			} else if (nodeOne.direction === 'up-left') {
				return [ 2.5, null, 'down' ];
			} else if (nodeOne.direction === 'down-left') {
				return [ 1.5, null, 'down' ];
			}
		}
		if (y2 < y1 && x1 === x2) {
			if (nodeOne.direction === 'up') {
				return [ 2, [ 'l', 'f' ], 'left' ];
			} else if (nodeOne.direction === 'right') {
				return [ 3, [ 'l', 'l', 'f' ], 'left' ];
			} else if (nodeOne.direction === 'left') {
				return [ 1, [ 'f' ], 'left' ];
			} else if (nodeOne.direction === 'down') {
				return [ 2, [ 'r', 'f' ], 'left' ];
			} else if (nodeOne.direction === 'up-right') {
				return [ 2.5, null, 'left' ];
			} else if (nodeOne.direction === 'down-right') {
				return [ 2.5, null, 'left' ];
			} else if (nodeOne.direction === 'up-left') {
				return [ 1.5, null, 'left' ];
			} else if (nodeOne.direction === 'down-left') {
				return [ 1.5, null, 'left' ];
			}
		} else if (y2 > y1 && x1 === x2) {
			if (nodeOne.direction === 'up') {
				return [ 2, [ 'r', 'f' ], 'right' ];
			} else if (nodeOne.direction === 'right') {
				return [ 1, [ 'f' ], 'right' ];
			} else if (nodeOne.direction === 'left') {
				return [ 3, [ 'r', 'r', 'f' ], 'right' ];
			} else if (nodeOne.direction === 'down') {
				return [ 2, [ 'l', 'f' ], 'right' ];
			} else if (nodeOne.direction === 'up-right') {
				return [ 1.5, null, 'right' ];
			} else if (nodeOne.direction === 'down-right') {
				return [ 1.5, null, 'right' ];
			} else if (nodeOne.direction === 'up-left') {
				return [ 2.5, null, 'right' ];
			} else if (nodeOne.direction === 'down-left') {
				return [ 2.5, null, 'right' ];
			}
		}
	} catch (error) {
		console.log(nodeOne, nodeTwo);
	}
}

function manhattanDistance(nodeOne, nodeTwo) {
	let x1 = nodeOne.rowIdx,
		y1 = nodeOne.nodeIdx,
		x2 = nodeTwo.rowIdx,
		y2 = nodeTwo.nodeIdx;

	let xChange = Math.abs(x1 - x2);
	let yChange = Math.abs(y1 - y2);

	return xChange + yChange;
}
