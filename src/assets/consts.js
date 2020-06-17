let ROWS = 20;
let COLS = 19;

let mid = Math.floor(ROWS / 2)
const NODE_START = { row: mid, col: mid };
const NODE_FINISH = { row: mid, col: COLS-1 };

function setRC(R, C) {
	ROWS = R;
	COLS = C;
}

function getRC() {
	return [ ROWS, COLS ];
}

export const dijkstra = 'Dijkstra',
	astar = 'A*',
	bfs = 'BFS',
    dfs = 'DFS',
    backtracking_nqueen = 'Backtracking - N Queens',
    backtracking_branch_bound_nqueen = 'Backtracking - Branch And Bound Method';
export const path_finding_algorithm_mapper = { 1: dijkstra, 2: astar, 3: bfs, 4: dfs };
export const backtracking_algorithm_mapper = { 5: backtracking_nqueen, 6: backtracking_branch_bound_nqueen };
export { ROWS, COLS, NODE_START, NODE_FINISH, setRC, getRC };
