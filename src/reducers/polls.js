import { handleActions } from 'redux-actions';
import * as types from '../constants/actionTypes';
import { sortBy } from '../lib/utils';

const DEFAULT_ACTION = {
	data: [],
	currentPoll: {},
	myPolls: [],
	page: 0,
	maxPage: 0,
	sortBy: 'date',
	displayedPoll: []
};

const actionsHandlers = {
	[types.GET_ALL_POLLS]: (state, { payload }) =>({
		...state, 
		data: payload,
		maxPage: Math.ceil(payload.length/5)
	}),
	[types.GET_POLLS_PAGE]: (state, { payload }) =>({
		...state, 
		displayedPoll: sortBy(state.data, state.sortBy).slice(state.page * 5, state.page * 5 + 5 )
	}),
	[types.GET_POLL]: (state, { payload }) =>({
		...state, 
		currentPoll: payload
	}),
	[types.GET_MY_POLL]: (state, { payload }) =>({
		...state, 
		myPolls: sortBy(payload, state.sortBy)
	}),
	[types.GET_NEXT_PAGE]: (state, { payload }) =>({
		...state, 
		page: state.page + 1,
	}),
	[types.GET_PREVIOUS_PAGE]: (state, { payload }) =>({
		...state, 
		page: state.page - 1
	}),
	[types.SORT_BY]: (state, { payload }) =>({
		...state, 
		sortBy: payload.type,
		myPolls: sortBy(state.myPolls, payload.type)
	})
};

export default handleActions (
	actionsHandlers,
	DEFAULT_ACTION
);
