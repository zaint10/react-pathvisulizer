export function dijkstra(grid, startNode, finishNode) {
	// if(!startNode || !finishNode || !startNode == finishNode)
	//     return;

	const visitedNodesInOrder = [];
	startNode.distance = 0;
	const unvisitedNodes = getAllNode(grid);

	while (!!unvisitedNodes.length) {
		sortNodesByDistance(unvisitedNodes);
		const closestNode = unvisitedNodes.shift();
		if (closestNode.isWall) continue;

		if (closestNode.distance === Infinity) return visitedNodesInOrder;

		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);
		if (closestNode === finishNode) return visitedNodesInOrder;
		updateUnvisitedNeighbors(closestNode, grid);
	}
}

function getAllNode(grid) {
	const nodes = [];
	grid.map((row) => {
		return row.map((node) => {
			return nodes.push(node);
		});
	});

	return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
	heapSort(unvisitedNodes);
}

function updateUnvisitedNeighbors(node, grid) {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
	for (const neighbor of unvisitedNeighbors) {
		neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
    
	}
}

function getUnvisitedNeighbors(node, grid) {
	const neighbors = [];
	const { rowIdx, nodeIdx } = node;
	if (rowIdx > 0) neighbors.push(grid[rowIdx - 1][nodeIdx]); // Up
	if (rowIdx < grid.length - 1) neighbors.push(grid[rowIdx + 1][nodeIdx]); // Down
	if (nodeIdx > 0) neighbors.push(grid[rowIdx][nodeIdx - 1]); // Left
	if (nodeIdx < grid[0].length - 1) neighbors.push(grid[rowIdx][nodeIdx + 1]); // Right

	return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function heapSort(nodes) {
	let length = nodes.length;
	let i = Math.floor(length / 2 - 1);
	let k = length - 1;

	while (i >= 0) {
		maxheapify(nodes, length, i);
		i--;
	}

	while (k >= 0) {
		[ nodes[0], nodes[k] ] = [ nodes[k], nodes[0] ];
		maxheapify(nodes, k, 0);
		k--;
	}

	return nodes;
}

function maxheapify(arr, length, i) {
	let largest = i;
	let left = i * 2 + 1;
	let right = left + 1;

	if (left < length && arr[left].distance > arr[largest].distance) {
		largest = left;
	}

	if (right < length && arr[right].distance > arr[largest].distance) {
		largest = right;
	}

	if (largest !== i) {
		[ arr[i], arr[largest] ] = [ arr[largest], arr[i] ];
		maxheapify(arr, length, largest);
	}

	return arr;
}

export function getNodesInShortestPathOrder(finishNode) {
	const nodesInShortestPathOrder = [];
	let currentNode = finishNode;
	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode);
		currentNode = currentNode.previousNode;
	}
	return nodesInShortestPathOrder;
}
