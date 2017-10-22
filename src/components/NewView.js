import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions/index';
import Header from './Header';
import Navigator from './Navigator';
import NewForm from './NewForm';
import Footer from './Footer';

class NewView extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="PollView">
        <Navigator user={user} />
        <Header 
          title={'New Poll'}
          description={'Create a new poll!'}
        />
        <NewForm />
        <Footer />
      </div>
    );
  }
}

NewView.propTypes = {
  actions: PropTypes.object.isRequired
};

export default connect(
  // map state to props
  (state) => ({ ...state }),
  // map dispatch to props,
  (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) })
)(NewView);
