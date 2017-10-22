import React, { PropTypes }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import * as Actions   from '../actions/index';
import Header         from './Header';
import Navigator      from './Navigator';
import PollList       from './PollList';
import Footer         from './Footer';
import PageButtons    from './PageButtons';

class App extends React.Component {
  
  componentDidMount = () => {
    this.props.actions.fetchPolls();
    this.props.actions.fetchUser();
    this.props.actions.fetchPollsPage();
  }
  
  render() {
    return (
      <div className="App">
        <Navigator user={this.props.user} />
        <Header 
          description={'A voting system for you and your friends!'}
          button={'New Poll'}    
        />
        <PollList displayedPolls={this.props.polls.displayedPoll} />
        <PageButtons />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(
  // map state to props
  (state) => ({ ...state }),
  // map dispatch to props,
  (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) })
)(App);


