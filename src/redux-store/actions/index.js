import { VISUALIZE_PATH, CLEAR_GRID, SHOW_GRID } from 'redux-store/action-types';

const clearGrid = { type: CLEAR_GRID, payload: true };
const visualizePath = { type: VISUALIZE_PATH, payload: true };
const showGrid = {
	type: SHOW_GRID,
	payload: { ROWS: 0, COLS: 0, DEFAULT_MARKING: false }
};

export { visualizePath, clearGrid, showGrid };
