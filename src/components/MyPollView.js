import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';
import Header from './Header';
import Navigator from './Navigator';
import PollList from './PollList';
import Footer from './Footer';

class MyPollView extends React.Component {
  
  componentDidMount = () => {
    this.props.actions.fetchMyPoll();
    this.props.actions.fetchUser();
  }
  
  render() {
    console.log(this.props.polls.myPolls);
    return (
      <div className="App">
        <Navigator user={this.props.user} />
        <Header 
          title={'My Polls'}
          description={'A voting system for you and your friends!'}
          button={'New Poll'}    
        />
        <PollList displayedPolls={this.props.polls.myPolls}/>
        <Footer />
      </div>
    );
  }
}

MyPollView.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(
  // map state to props
  (state) => ({ ...state }),
  // map dispatch to props,
  (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) })
)(MyPollView);


