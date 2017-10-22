import { handleActions } from 'redux-actions';
import * as types from '../constants/actionTypes';

const DEFAULT_ACTION = {
	data: [],
	currentPoll: {},
	myPolls: []
};

const actionsHandlers = {
	[types.GET_ALL_POLLS]: (state, { payload }) =>({
		...state, 
		data: payload
	}),
	[types.GET_POLL]: (state, { payload }) =>({
		...state, 
		currentPoll: payload
	}),
	[types.GET_MY_POLL]: (state, { payload }) =>({
		...state, 
		myPolls: payload
	})
};

export default handleActions (
	actionsHandlers,
	DEFAULT_ACTION
);
