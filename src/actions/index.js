import axios from 'axios';

import { createAction } from 'redux-actions';
import * as types from '../constants/actionTypes';

export const handleError			= createAction(types.HANDLE_ERROR);
export const closeAlert 			= createAction(types.CLOSE_ALERT);
export const getNextPage			= createAction(types.GET_NEXT_PAGE);
export const getPreviousPage	= createAction(types.GET_PREVIOUS_PAGE);
export const sortBy						= createAction(types.SORT_BY);
export const fetchPollsPage		= createAction(types.GET_POLLS_PAGE);

export const fetchPolls = () => {
  return (dispatch) => {
  	axios.get('/api/polls')
			.then(res => {
				dispatch({ 
				  type: types.GET_ALL_POLLS,
		    		payload: res.data
				});
				dispatch({ 
				  type: types.GET_POLLS_PAGE,
				});
			});
	};
};

export const deletePoll = (id, callback) => {
  return (dispatch) => {
  	axios.delete(`/polls/${id}`)
			.then(res => {
			
			//id Err
			if (res.data.err) {
		  	dispatch({
		  	type: types.HANDLE_ERROR,
		    	payload:{type: 'error', message: res.data.err}
		    });
		    setTimeout(() => dispatch({ type: types.CLOSE_ALERT}), 2000);  
				return;
		  }
		  
		  //If successs
		  callback();
		  dispatch({
		  	type: types.HANDLE_ERROR,
		    	payload:{type: 'success', message: res.data.success, refresh: true}
		    });
		  setTimeout(() => dispatch({ type: types.CLOSE_ALERT}), 2000);  

			//Update polls
			axios.get('/api/polls')
			.then(res => {
				dispatch({ 
				  type: types.GET_ALL_POLLS,
		    		payload: res.data
				});
				dispatch({ 
				  type: types.GET_POLLS_PAGE,
				});
			});

			});
	};
};

// export const fetchPollsPage = (number) => {
//   return (dispatch) => {
//   	axios.get(`/api/polls/page/${number}`)
// 			.then(res => {
// 				dispatch({ 
// 				  type: types.GET_POLLS_PAGE,
// 		    		payload: res.data
// 				});
// 			});
// 	};
// };

export const fetchUser = () => {
  return (dispatch) => {
  	axios.get('/api/user')
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
  	axios.get(`/api/polls/${id}`)
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
  	axios.get(`/api/mypolls`)
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
		    	payload:{type: 'success', message:`You have voted for ${value} successfully!`}
		    });
		  setTimeout(() => dispatch({ type: types.CLOSE_ALERT}), 2000);  

    
	    axios.get(`/api/polls/${pollId}`)
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
	    	payload:{type: 'success', message: 'You haved created a new poll successfully!'}
	    });
      setTimeout(() => dispatch({ type: types.CLOSE_ALERT}), 2000);  
      
      axios.get(`/api/polls/${response.data._id}`)
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