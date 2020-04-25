import { createStore } from 'redux';
import { Reducer } from 'redux-store/reducers';
let initialState = {
	grid: [],
	startNode: {
		row: 10,
		node: 3,
		isStart: true
	},
	finishNode: {
		row: 10,
		node: 13,
		isFinish: true
	}
};

const store = createStore(Reducer, initialState);

export default store;
