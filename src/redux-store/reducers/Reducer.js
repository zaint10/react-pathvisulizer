import * as ACTION from 'redux-store/action-types/';
import { initialState } from 'assets/initialState.js';

// import _ from "lodash";
import { visualize } from 'assets/algorithms/visualize.js';
import * as animate from 'assets/animate';
import * as CONSTS from 'assets/consts.js';
import grid from 'components/container/grid';

const Reducer = (state, action) => {
	if (state === undefined) {
		return initialState;
	}
	const currState = state;
	let newState = {};
	switch (action.type) {
		case ACTION.SHOW_GRID: {
			const { ROWS, COLS, DEFAULT_MARKING } = action.payload;
			setGridRC(ROWS, COLS);
			newState = { grid: initGrid(DEFAULT_MARKING) };
			break;
		}
		case ACTION.RESET_GRID: {
			newState = { grid: resetGrid(currState), initVisualizer: false, isVisualized: false, };
			break;
		}
		case ACTION.MARK_GRID: {
			const { rowIdx, nodeIdx } = action.payload;
			newState = markGrid(rowIdx, nodeIdx, currState);

			break;
		}
		case ACTION.MARK_GRID2: {
			const { rowIdx, nodeIdx, node_type } = action.payload;
			newState = markGrid2(rowIdx, nodeIdx, node_type, currState);
			break;
		}
		case ACTION.SET_ALGORITHM: {
			let currentAlgorithmName = currState.algorithm.selected,
			selectedAlgorithmName = action.payload.algo
			
			newState = {
				algorithm: { selected: selectedAlgorithmName },
				btnVisualize: action.payload.btntitle,
				
				initVisualizer: false,
				isVisualized: false,
			};
			if(currentAlgorithmName !== null && currentAlgorithmName !== selectedAlgorithmName){
				newState['resetGrid'] = true;

			}
			if(action.payload.dropdownItemKey){
				newState['selectedDropdownItemKey'] = action.payload.dropdownItemKey
			}

			break;
        }
        case ACTION.VISUALIZE: {
			const { visualize } = action.payload;
            newState = { initVisualizer: visualize, isVisualized: false };
            
			if (currState['resetGrid']) {
                newState['grid'] = resetGrid(currState);
			}
			break;
		}
		case ACTION.VISUALIZE_PATH: {
			let { grid, algorithm, startNode, finishNode } = currState
            visualize(grid, algorithm, startNode, finishNode)
			newState = { initVisualizer: false, isVisualized: false, grid: grid, startNode: startNode, finishNode: finishNode };
			break;
		}
		case ACTION.START_WALL_CONSTRUCTION: {
			const { rowIdx, nodeIdx, grid } = action.payload;

			newState = { grid: toggleWallInGrid(rowIdx, nodeIdx, grid) };
			break;
		}
		default: {
			break;
		}
	}
	return Object.assign({}, currState, newState);
};

function createNode(row, col, COLS) {
	return {
		oneDidx: `${COLS * row + col}`,
		rowIdx: row,
		nodeIdx: col,
		isStart: false,
		isFinish: false,
		distance: Infinity,
		isVisited: false,
		isWall: false,
		previousNode: null,
		totalDistance: Infinity,
		heuristicDistance: null,
		direction: null,
		weight: 0,
		isQueen: false
	};
}

function initGrid(DEFAULT_MARKING, startNode = {}, finishNode = {}) {
	const nodes = [];
	const [ ROWS, COLS ] = getGridRC();
	for (let row = 0; row < ROWS; row++) {
		const currentRow = [];
		
		for (let col = 0; col < COLS; col++) {
			
			currentRow.push(createNode(row, col, COLS));
		}
		nodes.push(currentRow);
	}

	if (DEFAULT_MARKING) {
		if(nodes.length > CONSTS.NODE_START.row)
			nodes[CONSTS.NODE_START.row][CONSTS.NODE_START.col] = {
				...nodes[CONSTS.NODE_START.row][CONSTS.NODE_START.col],
				isStart: true
			};
		if(nodes.length > CONSTS.NODE_FINISH.row)
			nodes[CONSTS.NODE_FINISH.row][CONSTS.NODE_FINISH.col] = {
				...nodes[CONSTS.NODE_FINISH.row][CONSTS.NODE_FINISH.col],
				isFinish: true
			};
	} else {
		nodes[startNode.row][startNode.node] = {
            ...nodes[startNode.row][startNode.node],
            isStart: true,
            isFinish: false
		};
		nodes[finishNode.row][finishNode.node] = {
            ...nodes[finishNode.row][finishNode.node],
            isStart: false,
			isFinish: true
		};
	}

	// console.log(`Grid Initialized ${DEFAULT ? 'but with default nodes' : 'and Grid is Cleared from default nodes'}`);
	return nodes;
}

const markGrid = (rowIdx, nodeIdx, { startNode, finishNode, grid }) => {
	let newState = {};
	if (startNode.marked && finishNode.marked) {
		grid = resetGrid(startNode, finishNode);
		grid[rowIdx][nodeIdx] = { ...grid[rowIdx][nodeIdx], isStart: true };
		newState = {
			grid: grid,
			startNode: { row: rowIdx, node: nodeIdx, marked: true },
			finishNode: { ...finishNode, marked: false }
		};

		return newState;
	}

	if (!finishNode.marked) {
		const newGrid = grid.slice();
		newGrid[rowIdx][nodeIdx] = { ...newGrid[rowIdx][nodeIdx], isFinish: true };
		newState = {
			grid: newGrid,
			finishNode: {
				marked: true,
				row: rowIdx,
				node: nodeIdx
			}
		};
	}

	return newState;
};

const markGrid2 = (rowIdx, nodeIdx, node_type, { grid }) => {
	let newState = {};
	const newGrid = grid.slice().map((row) =>
		row.map((node) => {
			if (node.isStart && node_type === 'node-start') {
				return { ...node, isStart: false };
			}
			if (node.isFinish && node_type === 'node-finish') {
				return { ...node, isFinish: false };
			}
			return node;
		})
	);
	if (node_type === 'node-start') {
		newGrid[rowIdx][nodeIdx] = { ...newGrid[rowIdx][nodeIdx], isStart: true };
		newState = {
			grid: newGrid,
			startNode: {
				marked: true,
				row: rowIdx,
				node: nodeIdx
			}
		};
	} else if (node_type === 'node-finish') {
		newGrid[rowIdx][nodeIdx] = { ...newGrid[rowIdx][nodeIdx], isFinish: true };
		newState = {
			grid: newGrid,
			finishNode: {
				marked: true,
				row: rowIdx,
				node: nodeIdx
			}
		};
	}

	return newState;
};

const isGridMarked = ({ startNode, finishNode }) => {
	return startNode.marked && finishNode.marked;
};

const resetGrid = ({ startNode, finishNode }) => {
	return initGrid(false, startNode, finishNode);
};

const setGridRC = (ROWS, COLS) => {
	CONSTS.setRC(ROWS, COLS);
};

const getGridRC = () => {
	return CONSTS.getRC();
};


const toggleWallInGrid = (rowIdx, nodeIdx, grid) => {
	const newGrid = grid.slice();
	const node = newGrid[rowIdx][nodeIdx];
	const newNode = {
		...node,
		isWall: !node.isWall
	};
	newGrid[rowIdx][nodeIdx] = newNode;
	return newGrid;
};

export default Reducer;
