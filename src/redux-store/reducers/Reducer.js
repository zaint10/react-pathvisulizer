// eslint-disable-next-line
import { VISUALIZE_PATH, CLEAR_GRID } from 'redux-store/action-types';

const Reducer = (state, action) => {
	switch (action.type) {
		case VISUALIZE_PATH:
			return { visualize: action.payload };
		default:
			return state;
	}
};
export default Reducer;
