import { VISUALIZE_PATH, CLEAR_GRID, SHOW_GRID } from 'redux-store/action-types';

const clearGrid = { type: CLEAR_GRID, payload: true };
const visualizePath = { type: VISUALIZE_PATH, payload: true };
const showGrid = { type: SHOW_GRID, payload: grid };

export { visualizePath, clearGrid, showGrid };
