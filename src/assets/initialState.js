import * as CONSTS from 'assets/consts.js';
const initialState = {
	grid: [],
	startNode: {
		row: CONSTS.NODE_START.row,
		node: CONSTS.NODE_START.col,
		marked: true
	},
	finishNode: {
		row: CONSTS.NODE_FINISH.row,
		node: CONSTS.NODE_FINISH.col,
		marked: true
	},
	initVisualizer: false,
	isVisualized: false,
	algorithm: {
		selected: null
	},
	btnVisualize: 'Visualize',
	resetGrid: false,
	selectedDropdownItemKey: -1
};

export { initialState };
