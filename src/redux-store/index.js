import { createStore } from 'redux';
import { Reducer } from 'redux-store/reducers';
import { initialState } from 'assets/initialState'

export const store = createStore(Reducer, initialState);


