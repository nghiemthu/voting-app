import axios from 'axios';

import { createAction } from 'redux-actions';
import * as types from '../constants/actionTypes';

export const handleError = createAction(types.HANDLE_ERROR);
export const closeAlert = createAction(types.CLOSE_ALERT);

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


export const fetchMyPoll = () => {
  return (dispatch) => {
  	axios.get(`mypolls`)
			.then(res => {
				dispatch({ 
				  type: types.GET_MY_POLL,
		      payload: res.data
				});
			})
			.catch((error) => {
		    console.log(error);
		  });
	};
};

export const voteOption = (pollId, optionId, value) => {
  return (dispatch) => {
  	axios.post(`../../api/polls/${pollId}/`, {
  		id: optionId,
			description: value
	  })
	  .then((response) => {
	    
		  if (response.data.err) {
		  	dispatch({
		  	type: types.HANDLE_ERROR,
		    	payload:{type: 'error', message: response.data.err}
		    });
		    setTimeout(() => dispatch({ type: types.CLOSE_ALERT}), 2000);  
				return;
		  }
		  
		  dispatch({
		  	type: types.HANDLE_ERROR,
		    	payload:{type: 'sucess', message:`You have voted for ${value}`}
		    });
		  setTimeout(() => dispatch({ type: types.CLOSE_ALERT}), 2000);  

    
	    axios.get(`/polls/${pollId}`)
			.then(res => {
				dispatch({ 
				  type: types.GET_POLL,
		      payload: res.data
				});
			});
	  })
	  .catch((error) => {
		   console.log(error);  
	  });
	};
};

export const postNewPoll = (title, options) => {
  return (dispatch) => {
  	console.log(title);
  	axios.post(`../../polls`, {
			title,
			options
	  })
	  .then((response) => {

	    if (response.data.err) {
	    	dispatch({
	    	type: types.HANDLE_ERROR,
		    	payload:{type: 'error', message: response.data.err}
		    });
	      setTimeout(() => dispatch({ type: types.CLOSE_ALERT}), 2000);  
	  		return;
	    }
	   
	    dispatch({
	    	type: types.HANDLE_ERROR,
	    	payload:{type: 'success', message: 'You haved created a new poll successfully'}
	    });
      setTimeout(() => dispatch({ type: types.CLOSE_ALERT}), 2000);  
      
      axios.get(`/polls/${response.data._id}`)
			.then(res => {
				dispatch({ 
				  type: types.GET_POLL,
		      payload: res.data
				});
			});
	  })
	  .catch((error) => {
	  	console.log(error);
	  });
	};
};