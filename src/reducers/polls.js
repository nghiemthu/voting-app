import { handleActions } from 'redux-actions';
import * as types from '../constants/actionTypes';

const DEFAULT_ACTION = {

};

const actionsHandlers = {
	[types.GET_ALL_POLLS]: (state, { payload }) =>({
		...state,
		...payload
	})
};

export default handleActions (
	actionsHandlers,
	DEFAULT_ACTION
);
