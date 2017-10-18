import { handleActions } from 'redux-actions';
import { fetchPolls } from '../lib/polls';
import * as types from '../constants/actionTypes';

const DEFAULT_ACTION = {
	polls: []
};

const actionsHandlers = {
	[types.GET_ALL_POLLS]: (state, { payload }) =>({
		...state,
		polls: payload
	})
};

export default handleActions (
	actionsHandlers,
	DEFAULT_ACTION
);
