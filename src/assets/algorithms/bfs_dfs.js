export function bfs_dfs(name, grid, startNode, finishNode) {
    
	const visitedNodesInOrder = [];
	startNode.distance = 0;

	const data_structure = [ startNode ];
	while (data_structure.length) {
		const closestNode = name === 'bfs' ? data_structure.shift() : data_structure.pop();

		if (closestNode.isWall) continue;
		if (closestNode.distance === Infinity) return visitedNodesInOrder;

		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);


        data_structure.push(...updateUnvisitedNeighbors(closestNode, grid, name));
        if (closestNode === finishNode) return visitedNodesInOrder;
	}
}

function updateUnvisitedNeighbors(node, grid, name = '') {
	const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, name);
	for (const neighbor of unvisitedNeighbors) {
		neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
        grid[neighbor.rowIdx][neighbor.nodeIdx].isVisited = true;
	}
	return unvisitedNeighbors;
}

function getUnvisitedNeighbors(node, grid, name = '') {
	const neighbors = [];
	const { rowIdx, nodeIdx } = node;
	if (rowIdx > 0) {
		// Up
		name === 'bfs' ? neighbors.push(grid[rowIdx - 1][nodeIdx]) : neighbors.unshift(grid[rowIdx - 1][nodeIdx]);
    }
    if (nodeIdx < grid[0].length - 1) {
		// Right
		name === 'bfs' ? neighbors.push(grid[rowIdx][nodeIdx + 1]) : neighbors.unshift(grid[rowIdx][nodeIdx + 1]);
	}
	if (rowIdx < grid.length - 1) {
		// Down
		name === 'bfs' ? neighbors.push(grid[rowIdx + 1][nodeIdx]) : neighbors.unshift(grid[rowIdx + 1][nodeIdx]);
	}
	if (nodeIdx > 0) {
		// Left
		name === 'bfs' ? neighbors.push(grid[rowIdx][nodeIdx - 1]) : neighbors.unshift(grid[rowIdx][nodeIdx - 1]);
	}
	

	return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// function getAllNode(grid) {
// 	const nodes = [];
// 	grid.map((row) => {
// 		row.map((node) => {
// 			nodes.push(node);
// 		});
// 	});

// 	return nodes;
// }