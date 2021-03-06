import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import PollView from './components/PollView';
import NewView from './components/NewView';
import MyPollView from './components/MyPollView';
import ToastAlert from './components/ToastAlert';

import reducers from './reducers/index';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    	<BrowserRouter>
   		<div>
   		  <ToastAlert />
   			<Switch>
   		  	<Route path="/polls/:id" component={PollView} />
   		  	<Route path="/mypolls" component={MyPollView} />
   		  	<Route path="/new" component={NewView} />
   		  	<Route path="/pollview" component={PollView} />
   				<Route path="/" component={App} />
   			</Switch>
   		</div>
   	</BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);