import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';
import Header from './Header';
import Navigator from './Navigator';
import VoteForm from './VoteForm';
import Footer from './Footer';

class PollView extends React.Component {
  componentDidMount = () => {
    const {id} = this.props.match.params;
		this.props.actions.fetchPoll(id);
  }
  
  render() {
    const { polls, user } = this.props;
    return (
      <div className="PollView">
        <Navigator user={user} />
        <Header 
          title={polls.currentPoll.title}
          description={polls.currentPoll.description}
          button={'Share'}
        />
        <VoteForm 
          options={polls.currentPoll.options} 
          user={user} 
          id={this.props.match.params.id}  
        />
        <Footer />
      </div>
    );
  }
}

PollView.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(
  // map state to props
  (state) => ({ ...state }),
  // map dispatch to props,
  (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) })
)(PollView);
