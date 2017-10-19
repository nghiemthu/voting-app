import axios from 'axios';

import { createAction } from 'redux-actions';
import * as types from '../constants/actionTypes';

export const fetchPolls = () => {
  return (dispatch) => {
  	axios.get('/polls')
			.then(res => {
				dispatch({ 
				  type: types.GET_ALL_POLLS,
		    		payload: res.data
				});
			});
	};
};

export const fetchUser = () => {
  return (dispatch) => {
  	axios.get('/user')
			.then(res => {
				dispatch({ 
				  type: types.GET_USER,
		      payload: res.data
				});
			})
			.catch((error) => {
		    console.log(error);
		  });
	};
};

export const fetchPoll = (id) => {
  return (dispatch) => {
  	axios.get(`/polls/${id}`)
			.then(res => {
				dispatch({ 
				  type: types.GET_POLL,
		      payload: res.data
				});
			})
			.catch((error) => {
		    console.log(error);
		  });
	};
};

export const voteOption = (id, value) => {
  return (dispatch) => {
  	console.log(value);
  	axios.post(`../../api/polls/${id}/`, {
			description: value
	  })
	  .then((response) => {
	    console.log(response.data);
	  })
	  .catch((error) => {
	    console.log(error);
	  });
	};
};