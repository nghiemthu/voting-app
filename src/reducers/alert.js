import { handleActions } from 'redux-actions';
import * as types from '../constants/actionTypes';

const DEFAULT_ACTION = {
  isDisplayed: false,
  data: {}
};

const actionsHandlers = {
  [types.HANDLE_ERROR]: (state, { payload }) =>({
		...state, 
		data: payload,
		isDisplayed: true
	}),
	[types.CLOSE_ALERT]: (state, { payload }) =>({
		...state, 
		isDisplayed: false
	})
};

export default handleActions (
	actionsHandlers,
	DEFAULT_ACTION 
);