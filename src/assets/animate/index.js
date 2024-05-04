import { Promise } from 'q';

class Animate {
	constructor(visitedNodeTimeout=10, shortestPathTimeout=30) {
		this.visitedNodeTimeout = visitedNodeTimeout;
		this.shortestPathTimeout = shortestPathTimeout;
	}

	async startAnimating(visitedNodesInOrder, nodesInShortestPathOrder) {
		return await new Promise((resolve, reject) => {
			visitedNodesInOrder.forEach((node, i) => {
				if (i === 0) return;
				if (i === visitedNodesInOrder.length - 1) {
					setTimeout(() => {
						animatePath(nodesInShortestPathOrder);
						resolve();
					}, 10 * i);

					return;
				}
				setTimeout(() => {
					document.getElementById(`node-${node.rowIdx}-${node.nodeIdx}`).classList.add('node-visited');
				}, this.visitedNodeTimeout * i);
			});
		});
	}

	animatePath(nodesInShortestPathOrder) {
		nodesInShortestPathOrder.forEach((node, i) => {
			setTimeout(() => {
				document.getElementById(`node-${node.rowIdx}-${node.nodeIdx}`).classList.add('node-path');
			}, this.shortestPathTimeout * i);
		});
	}
}

// const djsktra = async (visitedNodesInOrder, nodesInShortestPathOrder) => {
// 	return await new Promise((resolve, reject) => {
// 		visitedNodesInOrder.forEach((node, i) => {
// 			if (i === 0) return;
// 			if (i === visitedNodesInOrder.length - 1) {
// 				setTimeout(() => {
// 					animatePath(nodesInShortestPathOrder);
// 					resolve();
// 				}, 10 * i);

// 				return;
// 			}
// 			setTimeout(() => {
// 				document.getElementById(`node-${node.rowIdx}-${node.nodeIdx}`).classList.add('node-visited');
// 			}, 10 * i);
// 		});
// 	});
// };

const animatePath = (nodesInShortestPathOrder) => {
	nodesInShortestPathOrder.forEach((node, i) => {
		setTimeout(() => {
			document.getElementById(`node-${node.rowIdx}-${node.nodeIdx}`).classList.add('node-path');
		}, 50 * i);
	});
};

export { Animate };
