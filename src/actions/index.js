import axios from 'axios';

import { createAction } from 'redux-actions';
import * as types from '../constants/actionTypes';

export const fetchPolls = () => {
  return (dispatch) => {
  	axios.get('/polls')
			.then(res => {
			  console.log(res);
				dispatch({ 
				  type: types.GET_ALL_POLLS,
		      payload: res.data
				});
			});
	};
};