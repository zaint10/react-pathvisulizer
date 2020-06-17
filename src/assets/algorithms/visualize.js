import * as CONSTS from 'assets/consts.js';
import {getNodesInShortestPathOrder } from 'assets/algorithms/utills'
import {dijkstra} from 'assets/algorithms/dijkstra.js'
import {astar} from 'assets/algorithms/astar.js'
import {bfs_dfs} from 'assets/algorithms/bfs_dfs'
import {backtrackingUtil, animatebacktracking, backtracking} from 'assets/algorithms/backtracking.js'
import {Animate} from 'assets/animate';

export async function visualize({ grid, algorithm, startNode, finishNode }) {
	const { selected } = algorithm;
		startNode = grid[startNode.row][startNode.node];
		finishNode = grid[finishNode.row][finishNode.node];
	let visitedNodesInOrder = [],
        nodesInShortestPathOrder = [];
       
    
	switch (selected) {
		case CONSTS.dijkstra: {
            
            visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            break;
		}
		case CONSTS.astar: {
            visitedNodesInOrder = astar(grid, startNode, finishNode);
            break;
        }
        case CONSTS.bfs: {
            visitedNodesInOrder = bfs_dfs('bfs', grid, startNode, finishNode);
            break;
        }
        case CONSTS.dfs: {
            visitedNodesInOrder = bfs_dfs('dfs', grid, startNode, finishNode);
            break;
        }
        case CONSTS.backtracking_nqueen: {
            const back = new backtracking()
            back.backtrackingUtil(grid, 0, visitedNodesInOrder)
            console.log(visitedNodesInOrder);
            animatebacktracking(visitedNodesInOrder)

            return;
        }
        case CONSTS.backtracking_branch_bound_nqueen: {
            const back = new backtracking(true)
            
            back.backtrackingUtil(grid, 0, visitedNodesInOrder)
            console.log(visitedNodesInOrder);
            animatebacktracking(visitedNodesInOrder)
            return;

        }
    }
    
    nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    const animate = new Animate()
	await animate.startAnimating(visitedNodesInOrder, nodesInShortestPathOrder);

	return visitedNodesInOrder;
}
